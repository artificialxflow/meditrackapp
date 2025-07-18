-- MediTrack Additional Database Tables and Data
-- This file contains only the missing tables and data to add to existing database

-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relation TEXT,
    allergies TEXT[],
    medical_conditions TEXT[],
    current_medications TEXT[],
    insurance_provider TEXT,
    insurance_number TEXT,
    preferred_language TEXT DEFAULT 'fa',
    timezone TEXT DEFAULT 'Asia/Tehran',
    notification_preferences JSONB DEFAULT '{"email": true, "sms": true, "push": true}',
    privacy_settings JSONB DEFAULT '{"share_medical_data": false, "share_reminders": false}',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create medicines table (if not exists)
CREATE TABLE IF NOT EXISTS medicines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    generic_name TEXT,
    dosage_form TEXT NOT NULL,
    strength TEXT NOT NULL,
    manufacturer TEXT,
    prescription_required BOOLEAN DEFAULT false,
    category_id UUID REFERENCES medicine_categories(id) ON DELETE SET NULL,
    description TEXT,
    side_effects TEXT,
    interactions TEXT,
    storage_instructions TEXT,
    image_url TEXT,
    barcode TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine_categories table (if not exists)
CREATE TABLE IF NOT EXISTS medicine_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#007bff',
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine_schedules table (if not exists)
CREATE TABLE IF NOT EXISTS medicine_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    dosage_amount DECIMAL(8,2) NOT NULL,
    dosage_unit TEXT NOT NULL,
    frequency_type TEXT NOT NULL CHECK (frequency_type IN ('daily', 'weekly', 'monthly', 'custom')),
    frequency_value INTEGER NOT NULL,
    time_slots TIME[] NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    days_of_week INTEGER[],
    instructions TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine_reminders table (if not exists)
CREATE TABLE IF NOT EXISTS medicine_reminders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    schedule_id UUID REFERENCES medicine_schedules(id) ON DELETE CASCADE NOT NULL,
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    reminder_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'skipped', 'missed')),
    taken_time TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine_logs table (if not exists)
CREATE TABLE IF NOT EXISTS medicine_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
    schedule_id UUID REFERENCES medicine_schedules(id) ON DELETE CASCADE,
    reminder_id UUID REFERENCES medicine_reminders(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('taken', 'skipped', 'missed', 'side_effect', 'interaction')),
    dosage_amount DECIMAL(8,2),
    dosage_unit TEXT,
    taken_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    side_effects TEXT[],
    mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctor_appointments table (if not exists)
CREATE TABLE IF NOT EXISTS doctor_appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    doctor_name TEXT NOT NULL,
    specialty TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    location TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    notes TEXT,
    reminder_hours_before INTEGER DEFAULT 24,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_metrics table (if not exists)
CREATE TABLE IF NOT EXISTS health_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    metric_type TEXT NOT NULL CHECK (metric_type IN ('blood_pressure', 'blood_sugar', 'weight', 'temperature', 'heart_rate', 'oxygen_saturation', 'custom')),
    metric_name TEXT NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    unit TEXT NOT NULL,
    measurement_date DATE NOT NULL,
    measurement_time TIME DEFAULT CURRENT_TIME,
    notes TEXT,
    is_normal BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create help_articles table (if not exists)
CREATE TABLE IF NOT EXISTS help_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    language TEXT DEFAULT 'fa',
    is_published BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_feedback table (if not exists)
CREATE TABLE IF NOT EXISTS user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('bug_report', 'feature_request', 'general', 'support')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample medicine categories
INSERT INTO medicine_categories (name, description, color, icon) VALUES
('مسکن', 'داروهای مسکن و ضد درد', '#dc3545', 'pill'),
('قلبی', 'داروهای قلبی و عروقی', '#dc3545', 'heart'),
('دیابت', 'داروهای دیابت و قند خون', '#fd7e14', 'droplet'),
('فشار خون', 'داروهای فشار خون', '#6f42c1', 'activity'),
('آنتی بیوتیک', 'داروهای آنتی بیوتیک', '#20c997', 'shield'),
('ویتامین', 'ویتامین ها و مکمل ها', '#ffc107', 'sun'),
('گوارشی', 'داروهای گوارشی', '#28a745', 'stomach'),
('اعصاب', 'داروهای اعصاب و روان', '#17a2b8', 'brain'),
('تنفسی', 'داروهای تنفسی و آسم', '#6c757d', 'wind'),
('سایر', 'سایر داروها', '#6c757d', 'plus')
ON CONFLICT (name) DO NOTHING;

-- Insert sample help articles
INSERT INTO help_articles (title, content, category, tags) VALUES
('شروع کار با MediTrack', 'راهنمای کامل شروع کار با اپلیکیشن MediTrack برای مدیریت داروها و سلامتی شما.', 'getting_started', ARRAY['آموزش', 'شروع']),
('نحوه اضافه کردن دارو', 'مراحل اضافه کردن داروهای جدید به لیست داروهای شما در MediTrack.', 'medicines', ARRAY['دارو', 'اضافه کردن']),
('تنظیم یادآوری دارو', 'نحوه تنظیم یادآوری برای مصرف داروها در زمان‌های مشخص.', 'reminders', ARRAY['یادآوری', 'تنظیمات'])
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medicines_user_id ON medicines(user_id);
CREATE INDEX IF NOT EXISTS idx_medicines_category_id ON medicines(category_id);
CREATE INDEX IF NOT EXISTS idx_medicine_schedules_user_id ON medicine_schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_schedules_medicine_id ON medicine_schedules(medicine_id);
CREATE INDEX IF NOT EXISTS idx_medicine_reminders_user_id ON medicine_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_reminders_scheduled_time ON medicine_reminders(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_medicine_logs_user_id ON medicine_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_logs_medicine_id ON medicine_logs(medicine_id);
CREATE INDEX IF NOT EXISTS idx_doctor_appointments_user_id ON doctor_appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_appointments_date ON doctor_appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id ON health_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_date ON health_metrics(measurement_date);

-- Enable RLS on all tables
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for medicines
CREATE POLICY "Users can view own medicines" ON medicines
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medicines" ON medicines
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medicines" ON medicines
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medicines" ON medicines
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicine_categories (read-only for all users)
CREATE POLICY "Anyone can view medicine categories" ON medicine_categories
    FOR SELECT USING (true);

-- Create RLS policies for medicine_schedules
CREATE POLICY "Users can view own medicine schedules" ON medicine_schedules
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medicine schedules" ON medicine_schedules
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medicine schedules" ON medicine_schedules
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medicine schedules" ON medicine_schedules
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicine_reminders
CREATE POLICY "Users can view own medicine reminders" ON medicine_reminders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medicine reminders" ON medicine_reminders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medicine reminders" ON medicine_reminders
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medicine reminders" ON medicine_reminders
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicine_logs
CREATE POLICY "Users can view own medicine logs" ON medicine_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medicine logs" ON medicine_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medicine logs" ON medicine_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medicine logs" ON medicine_logs
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for doctor_appointments
CREATE POLICY "Users can view own doctor appointments" ON doctor_appointments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own doctor appointments" ON doctor_appointments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own doctor appointments" ON doctor_appointments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own doctor appointments" ON doctor_appointments
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_metrics
CREATE POLICY "Users can view own health metrics" ON health_metrics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health metrics" ON health_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health metrics" ON health_metrics
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health metrics" ON health_metrics
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for help_articles (read-only for all users)
CREATE POLICY "Anyone can view help articles" ON help_articles
    FOR SELECT USING (true);

-- Create RLS policies for user_feedback
CREATE POLICY "Users can view own feedback" ON user_feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" ON user_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback" ON user_feedback
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON medicines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medicine_schedules_updated_at BEFORE UPDATE ON medicine_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_appointments_updated_at BEFORE UPDATE ON doctor_appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_help_articles_updated_at BEFORE UPDATE ON help_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_feedback_updated_at BEFORE UPDATE ON user_feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT; 