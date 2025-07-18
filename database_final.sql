-- =================================================================
-- MediTrack Database - Final Reset & Rebuild Script (Complete)
-- WARNING: Running this script will permanently delete all data.
-- =================================================================

-- Section 1: Teardown
-- -----------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TABLE IF EXISTS public.medical_conditions, public.allergies, public.emergency_contacts, public.insurance_providers, public.notes, public.documents, public.vitals, public.appointments, public.medication_intake, public.medication_schedules, public.medications, public.categories, public.family_chat, public.sharing_notifications, public.sharing_invitations, public.patient_shares, public.patients, public.family_members, public.families, public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column, public.generate_family_code, public.generate_invitation_code, public.handle_new_user, public.check_patient_access(UUID, UUID) CASCADE;
DROP TYPE IF EXISTS public.medication_type, public.dosage_form, public.frequency_type, public.family_role, public.permission_level, public.notification_type, public.appointment_status, public.vital_type, public.document_type CASCADE;

-- Section 2: Setup
-- -----------------------------------------------------------------

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom Data Types (ENUMs)
CREATE TYPE public.medication_type AS ENUM ('tablet', 'capsule', 'liquid', 'injection', 'inhaler', 'cream', 'drops', 'suppository');
CREATE TYPE public.dosage_form AS ENUM ('mg', 'mcg', 'ml', 'units', 'puffs', 'drops', 'tablets', 'capsules');
CREATE TYPE public.frequency_type AS ENUM ('daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'weekly', 'monthly', 'as_needed', 'custom');
CREATE TYPE public.family_role AS ENUM ('owner', 'admin', 'caregiver', 'viewer');
CREATE TYPE public.permission_level AS ENUM ('full_access', 'edit_access', 'view_only', 'limited_access');
CREATE TYPE public.notification_type AS ENUM ('medication_reminder', 'appointment_reminder', 'family_invitation', 'share_request', 'system_notification', 'emergency_alert');
CREATE TYPE public.appointment_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE public.vital_type AS ENUM ('blood_pressure', 'heart_rate', 'temperature', 'weight', 'height', 'blood_sugar', 'oxygen_saturation', 'pain_level');
CREATE TYPE public.document_type AS ENUM ('prescription', 'lab_result', 'imaging', 'medical_report', 'insurance_card', 'id_card', 'other');

-- Table Creation
CREATE TABLE public.profiles (id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, phone TEXT, avatar_url TEXT, date_of_birth DATE, gender TEXT, blood_type TEXT, timezone TEXT DEFAULT 'Asia/Tehran', notification_settings JSONB, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.families (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name TEXT NOT NULL, description TEXT, family_code TEXT UNIQUE, qr_code_url TEXT, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.patients (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, family_id UUID REFERENCES public.families(id) ON DELETE CASCADE, full_name TEXT NOT NULL, date_of_birth DATE, gender TEXT, avatar_url TEXT, blood_type TEXT, height_cm NUMERIC(5,2), weight_kg NUMERIC(5,2), notes TEXT, is_active BOOLEAN DEFAULT true, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.family_members (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, family_id UUID REFERENCES public.families(id) ON DELETE CASCADE, profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, role family_role DEFAULT 'viewer', permissions permission_level DEFAULT 'view_only', joined_at TIMESTAMPTZ DEFAULT NOW(), invited_by UUID REFERENCES public.profiles(id), UNIQUE(family_id, profile_id));
CREATE TABLE public.patient_shares (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE, shared_with_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, shared_by_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, permission_level permission_level DEFAULT 'view_only', shared_at TIMESTAMPTZ DEFAULT NOW(), expires_at TIMESTAMPTZ, is_active BOOLEAN DEFAULT true, UNIQUE(patient_id, shared_with_profile_id));
CREATE TABLE public.sharing_invitations (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE, invited_email TEXT NOT NULL, invitation_code TEXT UNIQUE, permission_level permission_level DEFAULT 'view_only', expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'), invited_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')), created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.family_chat (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, family_id UUID REFERENCES public.families(id) ON DELETE CASCADE, sender_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, message TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.categories (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name TEXT NOT NULL, description TEXT, color TEXT, icon TEXT, category_type TEXT NOT NULL, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.medications (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, name TEXT NOT NULL, medication_type medication_type NOT NULL, dosage_form dosage_form NOT NULL, strength NUMERIC(10,2), strength_unit TEXT, instructions TEXT, image_url TEXT, quantity INTEGER, expiration_date DATE, is_active BOOLEAN DEFAULT true, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.medication_schedules (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, medication_id UUID REFERENCES public.medications(id) ON DELETE CASCADE NOT NULL, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, dosage NUMERIC(10,2) NOT NULL, frequency_type frequency_type NOT NULL, start_date DATE NOT NULL, end_date DATE, time_slots TIME[], is_active BOOLEAN DEFAULT true, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.medication_intake (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, schedule_id UUID REFERENCES public.medication_schedules(id) ON DELETE CASCADE NOT NULL, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, scheduled_time TIMESTAMPTZ NOT NULL, taken_time TIMESTAMPTZ, status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'taken', 'missed', 'skipped')), notes TEXT, taken_by UUID REFERENCES public.profiles(id));
CREATE TABLE public.appointments (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, title TEXT NOT NULL, doctor_name TEXT, appointment_datetime TIMESTAMPTZ NOT NULL, status appointment_status DEFAULT 'scheduled', notes TEXT, reminder_minutes INTEGER, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.vitals (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, vital_type vital_type NOT NULL, value NUMERIC(10,2) NOT NULL, unit TEXT, measured_at TIMESTAMPTZ DEFAULT NOW(), created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE);
CREATE TABLE public.documents (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, title TEXT NOT NULL, document_type document_type NOT NULL, file_url TEXT NOT NULL, category_id UUID REFERENCES public.categories(id), document_date DATE, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.notes (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE, title TEXT NOT NULL, content TEXT NOT NULL, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE public.emergency_contacts (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, name TEXT NOT NULL, relationship TEXT, phone TEXT NOT NULL, is_primary BOOLEAN DEFAULT false, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE);
CREATE TABLE public.allergies (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, allergen_name TEXT NOT NULL, severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')), notes TEXT, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE);
CREATE TABLE public.medical_conditions (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL, condition_name TEXT NOT NULL, diagnosis_date DATE, notes TEXT, created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE);
CREATE TABLE public.insurance_providers (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name TEXT NOT NULL, code TEXT UNIQUE, phone TEXT, website TEXT, address TEXT, is_active BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT NOW());

-- Functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN INSERT INTO public.profiles (id, email, full_name, avatar_url) VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url'); RETURN NEW; END; $$;
CREATE OR REPLACE FUNCTION public.check_patient_access(p_patient_id UUID, p_user_id UUID) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN RETURN EXISTS (SELECT 1 FROM public.patients WHERE id = p_patient_id AND created_by = p_user_id UNION SELECT 1 FROM public.patients p JOIN public.family_members fm ON p.family_id = fm.family_id WHERE p.id = p_patient_id AND fm.profile_id = p_user_id UNION SELECT 1 FROM public.patient_shares WHERE patient_id = p_patient_id AND shared_with_profile_id = p_user_id AND is_active = true); END; $$;

-- Triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_families_updated_at BEFORE UPDATE ON public.families FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON public.medications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medication_schedules_updated_at BEFORE UPDATE ON public.medication_schedules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can manage their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can manage their own families" ON public.families FOR ALL USING (created_by = auth.uid());
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can manage accessible patient data" ON public.patients FOR ALL USING (public.check_patient_access(id, auth.uid()));
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY; CREATE POLICY "Family members can view family members" ON public.family_members FOR SELECT USING (EXISTS (SELECT 1 FROM public.family_members fm WHERE fm.family_id = family_members.family_id AND fm.profile_id = auth.uid())); CREATE POLICY "Family admins can manage members" ON public.family_members FOR ALL USING (EXISTS (SELECT 1 FROM public.family_members fm WHERE fm.family_id = family_members.family_id AND fm.profile_id = auth.uid() AND fm.role IN ('owner', 'admin')));
ALTER TABLE public.patient_shares ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view patient shares" ON public.patient_shares FOR SELECT USING (shared_with_profile_id = auth.uid() OR shared_by_profile_id = auth.uid() OR public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage patient shares" ON public.patient_shares FOR ALL USING (shared_by_profile_id = auth.uid() OR EXISTS (SELECT 1 FROM public.patients p WHERE p.id = patient_shares.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.sharing_invitations ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view invitations" ON public.sharing_invitations FOR SELECT USING (invited_by = auth.uid() OR invited_email = (SELECT email FROM public.profiles WHERE id = auth.uid())); CREATE POLICY "Users can manage invitations" ON public.sharing_invitations FOR ALL USING (invited_by = auth.uid() OR EXISTS (SELECT 1 FROM public.patients p WHERE p.id = sharing_invitations.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.family_chat ENABLE ROW LEVEL SECURITY; CREATE POLICY "Family members can view chat" ON public.family_chat FOR SELECT USING (EXISTS (SELECT 1 FROM public.family_members WHERE family_id = family_chat.family_id AND profile_id = auth.uid())); CREATE POLICY "Family members can send messages" ON public.family_chat FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.family_members WHERE family_id = family_chat.family_id AND profile_id = auth.uid())); CREATE POLICY "Users can edit own messages" ON public.family_chat FOR UPDATE USING (sender_profile_id = auth.uid());
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view categories" ON public.categories FOR SELECT USING (true); CREATE POLICY "Users can manage own categories" ON public.categories FOR ALL USING (created_by = auth.uid());
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible medications" ON public.medications FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage medications" ON public.medications FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = medications.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.medication_schedules ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible schedules" ON public.medication_schedules FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage schedules" ON public.medication_schedules FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = medication_schedules.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.medication_intake ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible intake" ON public.medication_intake FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage intake" ON public.medication_intake FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = medication_intake.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible appointments" ON public.appointments FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage appointments" ON public.appointments FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = appointments.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible vitals" ON public.vitals FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage vitals" ON public.vitals FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = vitals.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible documents" ON public.documents FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage documents" ON public.documents FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = documents.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible notes" ON public.notes FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage notes" ON public.notes FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = notes.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible emergency contacts" ON public.emergency_contacts FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage emergency contacts" ON public.emergency_contacts FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = emergency_contacts.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.allergies ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible allergies" ON public.allergies FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage allergies" ON public.allergies FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = allergies.patient_id AND p.created_by = auth.uid()));
ALTER TABLE public.medical_conditions ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view accessible medical conditions" ON public.medical_conditions FOR SELECT USING (public.check_patient_access(patient_id, auth.uid())); CREATE POLICY "Users can manage medical conditions" ON public.medical_conditions FOR ALL USING (EXISTS (SELECT 1 FROM public.patients p WHERE p.id = medical_conditions.patient_id AND p.created_by = auth.uid()));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_families_code ON public.families(family_code);
CREATE INDEX IF NOT EXISTS idx_family_members_family_id ON public.family_members(family_id);
CREATE INDEX IF NOT EXISTS idx_patients_family_id ON public.patients(family_id);
CREATE INDEX IF NOT EXISTS idx_patient_shares_patient_id ON public.patient_shares(patient_id);
CREATE INDEX IF NOT EXISTS idx_sharing_invitations_code ON public.sharing_invitations(invitation_code);
CREATE INDEX IF NOT EXISTS idx_sharing_notifications_profile_id ON public.sharing_notifications(profile_id);
CREATE INDEX IF NOT EXISTS idx_family_chat_family_id ON public.family_chat(family_id);
CREATE INDEX IF NOT EXISTS idx_categories_type ON public.categories(category_type);
CREATE INDEX IF NOT EXISTS idx_medications_patient_id ON public.medications(patient_id);
CREATE INDEX IF NOT EXISTS idx_medication_schedules_medication_id ON public.medication_schedules(medication_id);
CREATE INDEX IF NOT EXISTS idx_medication_intake_medication_id ON public.medication_intake(medication_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_vitals_patient_id ON public.vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_documents_patient_id ON public.documents(patient_id);
CREATE INDEX IF NOT EXISTS idx_notes_patient_id ON public.notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_patient_id ON public.emergency_contacts(patient_id);
CREATE INDEX IF NOT EXISTS idx_allergies_patient_id ON public.allergies(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_conditions_patient_id ON public.medical_conditions(patient_id);

-- Sample Data
INSERT INTO public.insurance_providers (name, code) VALUES ('Tamin', 'TAMIN'), ('Salamat', 'SALAMAT') ON CONFLICT(code) DO NOTHING;
INSERT INTO public.categories (name, category_type) VALUES ('Painkiller', 'medication'), ('Cardiology', 'appointment') ON CONFLICT DO NOTHING;

-- =================================================================
-- End of Schema
-- =================================================================
