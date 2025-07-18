-- Step 1: Create profiles table
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

-- Step 2: Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 6: Create medicine_categories table
CREATE TABLE IF NOT EXISTS medicine_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#007bff',
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Enable RLS on medicine_categories
ALTER TABLE medicine_categories ENABLE ROW LEVEL SECURITY;

-- Step 8: Create RLS policy for medicine_categories
CREATE POLICY "Anyone can view medicine categories" ON medicine_categories
    FOR SELECT USING (true);

-- Step 9: Insert sample medicine categories
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

COMMIT; 