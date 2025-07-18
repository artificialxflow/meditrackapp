-- MediTrack Database Schema
-- اپلیکیشن مدیریت دارو - دارویار

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- ORGANIZATION TABLES
-- ========================================

-- جدول سازمان‌ها
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('personal', 'family', 'clinic', 'hospital', 'pharmacy')),
  description TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول اعضای سازمان
CREATE TABLE organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'doctor', 'nurse', 'pharmacist', 'member')),
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  joined_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- جدول بخش‌ها (برای بیمارستان‌ها و کلینیک‌ها)
CREATE TABLE departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- PATIENT TABLES
-- ========================================

-- جدول بیماران
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES auth.users(id),
  department_id UUID REFERENCES departments(id),
  name VARCHAR(255) NOT NULL,
  birth_date DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  blood_type VARCHAR(5),
  allergies TEXT[],
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(20),
  medical_history TEXT,
  current_conditions TEXT[],
  notes TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول اشتراک‌گذاری بیماران
CREATE TABLE patient_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  shared_with_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  permission_level VARCHAR(20) DEFAULT 'viewer' CHECK (permission_level IN ('owner', 'caregiver', 'viewer')),
  can_edit_medicines BOOLEAN DEFAULT false,
  can_edit_schedules BOOLEAN DEFAULT false,
  can_view_reports BOOLEAN DEFAULT true,
  can_manage_appointments BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(patient_id, shared_with_user_id)
);

-- ========================================
-- MEDICINE TABLES
-- ========================================

-- جدول داروها
CREATE TABLE medicines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  unit VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  notes TEXT,
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 1,
  expiry_date DATE,
  pill_splitting BOOLEAN DEFAULT false,
  split_type VARCHAR(20) DEFAULT 'none' CHECK (split_type IN ('none', 'half', 'quarter')),
  prescription_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول زمان‌بندی داروها
CREATE TABLE medicine_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  days_of_week INTEGER[], -- [1,2,3,4,5,6,7] for days of week
  times_per_day INTEGER DEFAULT 1,
  times TIME[], -- ['08:00', '12:00', '20:00']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول مصرف داروها
CREATE TABLE medicine_intake (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  taken_by_user_id UUID REFERENCES auth.users(id),
  scheduled_time TIMESTAMP NOT NULL,
  taken_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'missed', 'delayed')),
  dosage_taken DECIMAL(5,2), -- برای نصف یا یک چهارم
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- APPOINTMENT TABLES
-- ========================================

-- جدول قرارهای پزشک
CREATE TABLE doctor_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES auth.users(id),
  doctor_name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location TEXT,
  notes TEXT,
  reminder_days INTEGER DEFAULT 1, -- چند روز قبل یادآوری
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- CATEGORY TABLES
-- ========================================

-- جدول دسته‌بندی‌ها
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#4A90E2',
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- FAMILY TABLES
-- ========================================

-- جدول خانواده‌ها
CREATE TABLE families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول اعضای خانواده
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- ========================================
-- ACTIVITY AND CHAT TABLES
-- ========================================

-- جدول لاگ فعالیت‌ها
CREATE TABLE activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  patient_id UUID REFERENCES patients(id),
  action VARCHAR(100) NOT NULL, -- 'medicine_added', 'medicine_taken', 'appointment_created', etc.
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول چت خانوادگی
CREATE TABLE family_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- HELP AND SUPPORT TABLES
-- ========================================

-- جدول مقالات راهنما
CREATE TABLE help_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100), -- 'getting_started', 'medicines', 'sharing', 'security', etc.
  tags TEXT[],
  video_url TEXT,
  images TEXT[],
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول پیشرفت راهنمای کاربر
CREATE TABLE user_help_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES help_articles(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- جدول تیکت‌های پشتیبانی
CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100), -- 'technical', 'medical', 'billing', etc.
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول پیام‌های پشتیبانی
CREATE TABLE support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  is_from_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول دستورالعمل‌های پزشکی
CREATE TABLE medical_guidelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100), -- 'medication_safety', 'drug_interactions', 'side_effects', etc.
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'danger')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- INVENTORY TABLES
-- ========================================

-- جدول موجودی (برای داروخانه‌ها و بیمارستان‌ها)
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  medicine_name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255),
  dosage_form VARCHAR(100),
  strength VARCHAR(100),
  quantity INTEGER NOT NULL,
  min_quantity INTEGER DEFAULT 0,
  expiry_date DATE,
  supplier VARCHAR(255),
  cost DECIMAL(10,2),
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Indexes for better query performance
CREATE INDEX idx_organizations_type ON organizations(type);
CREATE INDEX idx_organization_members_user ON organization_members(user_id);
CREATE INDEX idx_organization_members_org ON organization_members(organization_id);
CREATE INDEX idx_patients_organization ON patients(organization_id);
CREATE INDEX idx_patients_owner ON patients(owner_id);
CREATE INDEX idx_medicines_patient ON medicines(patient_id);
CREATE INDEX idx_medicines_organization ON medicines(organization_id);
CREATE INDEX idx_medicine_intake_patient ON medicine_intake(patient_id);
CREATE INDEX idx_medicine_intake_scheduled_time ON medicine_intake(scheduled_time);
CREATE INDEX idx_appointments_patient ON doctor_appointments(patient_id);
CREATE INDEX idx_appointments_date ON doctor_appointments(appointment_date);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_organization ON activity_logs(organization_id);
CREATE INDEX idx_family_chat_family ON family_chat(family_id);
CREATE INDEX idx_support_tickets_user ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_organization ON support_tickets(organization_id);

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_intake ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_help_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organization_members_updated_at BEFORE UPDATE ON organization_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_shares_updated_at BEFORE UPDATE ON patient_shares FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON medicines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctor_appointments_updated_at BEFORE UPDATE ON doctor_appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_help_articles_updated_at BEFORE UPDATE ON help_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_guidelines_updated_at BEFORE UPDATE ON medical_guidelines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA (OPTIONAL)
-- ========================================

-- Insert sample categories
INSERT INTO categories (name, color, icon) VALUES 
('آنتی‌بیوتیک', '#FF6B6B', 'pill'),
('ویتامین', '#4ECDC4', 'vitamin'),
('مسکن', '#45B7D1', 'pain'),
('قلبی', '#96CEB4', 'heart'),
('دیابت', '#FFEAA7', 'diabetes'),
('فشار خون', '#DDA0DD', 'blood-pressure');

-- Insert sample help articles
INSERT INTO help_articles (title, content, category, tags) VALUES 
('راهنمای شروع کار', 'این راهنما به شما کمک می‌کند تا با اپلیکیشن آشنا شوید...', 'getting_started', ARRAY['شروع', 'آموزش']),
('نحوه افزودن دارو', 'برای افزودن داروی جدید، مراحل زیر را دنبال کنید...', 'medicines', ARRAY['دارو', 'افزودن']),
('تنظیم یادآوری', 'برای تنظیم یادآوری مصرف دارو...', 'reminders', ARRAY['یادآوری', 'تنظیمات']);

COMMIT; 