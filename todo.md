# اپلیکیشن مدیریت دارو – دارویار (MediTrack)

## معرفی و هدف
اپلیکیشن "دارویار" یا "MediTrack" برای مدیریت مصرف داروها، یادآوری، پیگیری و کاهش خطاهای انسانی در مصرف دارو طراحی می‌شود. این اپ مناسب افراد، خانواده‌ها، کلینیک‌ها و بیمارستان‌ها است که نیاز به مدیریت داروهای متعدد و متنوع دارند.

## تکنولوژی‌ها و ابزارها
- **Next.js 14** (فرانت‌اند با TypeScript)
- **Supabase** (دیتابیس، احراز هویت، و Real-time)
- **Bootstrap 5** (استایل‌دهی و RTL)
- **React Hook Form** (مدیریت فرم‌ها)
- **Zod** (اعتبارسنجی داده‌ها)
- **Git** (ورژن کنترل)

---

## انواع سازمان‌ها و کاربردها

### 1. استفاده شخصی/خانوادگی
- **کاربران**: افراد، خانواده‌ها، مراقبین
- **ویژگی‌ها**: مدیریت چند بیمار، اشتراک‌گذاری خانوادگی، چت داخلی
- **سطح دسترسی**: ساده و کاربرپسند

### 2. کلینیک‌ها و مطب‌ها
- **کاربران**: پزشکان، پرستاران، کادر درمانی
- **ویژگی‌ها**: مدیریت بیماران متعدد، گزارش‌های پزشکی، ارتباط با بیماران
- **سطح دسترسی**: پیشرفته با قابلیت‌های پزشکی

### 3. بیمارستان‌ها و مراکز درمانی
- **کاربران**: کادر درمانی، داروخانه بیمارستان، مدیریت
- **ویژگی‌ها**: مدیریت بخش‌ها، موجودی دارو، گزارش‌های سازمانی
- **سطح دسترسی**: حرفه‌ای با قابلیت‌های مدیریتی

### 4. داروخانه‌ها
- **کاربران**: داروسازان، کارکنان داروخانه
- **ویژگی‌ها**: مدیریت موجودی، سفارش آنلاین، مشاوره دارویی
- **سطح دسترسی**: تخصصی با قابلیت‌های دارویی

---

## ویژگی‌های کلیدی اپلیکیشن

### مدیریت داروها
- ثبت و ویرایش داروها (نام، دوز، تعداد، تصویر، دسته‌بندی، یادداشت)
- **قابلیت نصف کردن و یک چهارم کردن قرص‌ها** (pill_splitting)
- مدیریت موجودی دارو (هشدار کمبود، تاریخ انقضا، یادآوری خرید)
- دسته‌بندی داروها (آنتی‌بیوتیک، ویتامین، مسکن، و غیره)
- **مدیریت داروهای نسخه‌ای و بدون نسخه**

### زمان‌بندی و یادآوری
- زمان‌بندی دقیق مصرف (دفعات، ساعت دقیق، روزهای خاص)
- نوتیفیکیشن‌های پیشرفته (Push Notifications)
- یادآوری صوتی و بصری
- **یادآوری ویزیت‌های پزشک** (doctor_appointments)
- **یادآوری تجدید نسخه**

### پیگیری و گزارش‌گیری
- پیگیری مصرف (مصرف شد/فراموش شد/به تعویق افتاد)
- تاریخچه کامل مصرف داروها
- گزارش‌گیری (روزانه/هفتگی/ماهانه)
- خروجی PDF/Excel
- نمودارهای تحلیلی
- **گزارش‌های پزشکی برای ارائه به پزشک**

### مدیریت چند بیمار و اشتراک‌گذاری
- **مدیریت چندین بیمار**: امکان تعریف تعداد نامحدود بیمار
- **اشتراک‌گذاری پروفایل**: دسترسی دادن به اعضای خانواده یا مراقبین
- **سطوح دسترسی**: تعریف نقش‌های مختلف (مالک، مراقب، مشاهده‌کننده)
- **مدیریت خانواده**: گروه‌بندی بیماران در خانواده‌ها
- **اعلان‌های مشترک**: اطلاع‌رسانی به تمام اعضای دسترسی‌دار
- **QR Code اشتراک‌گذاری**: اشتراک‌گذاری آسان با QR Code
- **لینک دعوت**: ارسال لینک دعوت برای اضافه کردن اعضا

### ویژگی‌های سازمانی
- **مدیریت بخش‌ها**: گروه‌بندی بیماران بر اساس بخش (بیمارستان)
- **نقش‌های سازمانی**: پزشک، پرستار، داروساز، مدیر
- **گزارش‌های سازمانی**: آمار کلی سازمان
- **مدیریت موجودی مرکزی**: کنترل موجودی دارو در سطح سازمان
- **سیستم تیکت**: ارتباط بین کادر درمانی
- **تقویم سازمانی**: مدیریت قرارها و ویزیت‌ها

### راهنما و آموزش
- **راهنمای تعاملی**: آموزش مرحله به مرحله استفاده از اپلیکیشن
- **ویدیوهای آموزشی**: آموزش تصویری تمام قابلیت‌ها
- **FAQ جامع**: سوالات متداول و پاسخ‌ها
- **راهنمای تصویری**: اسکرین‌شات با توضیحات کامل
- **Tips روزانه**: نکات مفید برای استفاده بهتر
- **راهنمای امنیت**: آموزش حفظ حریم خصوصی و امنیت
- **پشتیبانی درون‌برنامه‌ای**: چت با پشتیبانی
- **راهنمای اشتراک‌گذاری**: آموزش نحوه اشتراک‌گذاری پروفایل
- **دستورالعمل‌های پزشکی**: راهنمای مصرف صحیح داروها
- **هشدارهای مهم**: نکات مهم پزشکی و دارویی

### ویژگی‌های اضافی
- پشتیبانی از چند پروفایل
- رابط کاربری ساده، تمیز، فارسی و راست‌چین
- حالت آفلاین
- پشتیبان‌گیری و بازیابی داده‌ها
- **گزارش‌های خانوادگی**: آمار کلی مصرف دارو در خانواده
- **تقویم مشترک**: مشاهده تمام ویزیت‌ها و یادآوری‌ها
- **چت داخلی**: ارتباط بین اعضای خانواده
- **تاریخچه تغییرات**: ثبت تغییرات انجام شده توسط هر کاربر
- **هوش مصنوعی**: پیشنهاد زمان‌بندی بهینه داروها
- **تشخیص تداخل دارویی**: هشدار تداخل بین داروها
- **یادآوری هوشمند**: یادآوری بر اساس الگوی مصرف
- **گزارش به پزشک**: تولید گزارش برای ارائه به پزشک
- **پشتیبانی از داروهای گیاهی**: ثبت و مدیریت داروهای گیاهی
- **مدیریت واکسن**: ثبت تاریخ واکسیناسیون
- **ارتباط با داروخانه**: سفارش آنلاین دارو
- **پشتیبانی از زبان‌های مختلف**: انگلیسی، عربی، ترکی
- **دسترسی‌پذیری**: پشتیبانی از screen reader
- **حالت شب**: تم تاریک برای استفاده شبانه
- **Backup ابری**: پشتیبان‌گیری خودکار در ابر

---

## ساختار دیتابیس Supabase

### جدول organizations
```sql
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'personal', 'family', 'clinic', 'hospital', 'pharmacy'
  description TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول organization_members
```sql
CREATE TABLE organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'doctor', 'nurse', 'pharmacist', 'member'
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  joined_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول departments
```sql
CREATE TABLE departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول medicines
```sql
CREATE TABLE medicines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
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
  split_type VARCHAR(20) DEFAULT 'none', -- 'none', 'half', 'quarter'
  prescription_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول medicine_schedules
```sql
CREATE TABLE medicine_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  days_of_week INTEGER[], -- [1,2,3,4,5,6,7] for days of week
  times_per_day INTEGER DEFAULT 1,
  times TIME[], -- ['08:00', '12:00', '20:00']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول medicine_intake
```sql
CREATE TABLE medicine_intake (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  taken_by_user_id UUID REFERENCES auth.users(id),
  scheduled_time TIMESTAMP NOT NULL,
  taken_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'taken', 'missed', 'delayed'
  dosage_taken DECIMAL(5,2), -- برای نصف یا یک چهارم
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول doctor_appointments
```sql
CREATE TABLE doctor_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  created_by_user_id UUID REFERENCES auth.users(id),
  doctor_name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location TEXT,
  notes TEXT,
  reminder_days INTEGER DEFAULT 1, -- چند روز قبل یادآوری
  status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول categories
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#4A90E2',
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول patients
```sql
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  owner_id UUID REFERENCES auth.users(id),
  department_id UUID REFERENCES departments(id),
  name VARCHAR(255) NOT NULL,
  birth_date DATE,
  gender VARCHAR(10), -- 'male', 'female', 'other'
  blood_type VARCHAR(5), -- 'A+', 'B-', etc.
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
```

### جدول patient_shares
```sql
CREATE TABLE patient_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  shared_with_user_id UUID REFERENCES auth.users(id),
  permission_level VARCHAR(20) DEFAULT 'viewer', -- 'owner', 'caregiver', 'viewer'
  can_edit_medicines BOOLEAN DEFAULT false,
  can_edit_schedules BOOLEAN DEFAULT false,
  can_view_reports BOOLEAN DEFAULT true,
  can_manage_appointments BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول families
```sql
CREATE TABLE families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول family_members
```sql
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR(50) DEFAULT 'member', -- 'owner', 'admin', 'member'
  joined_at TIMESTAMP DEFAULT NOW()
);
```

### جدول activity_logs
```sql
CREATE TABLE activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  patient_id UUID REFERENCES patients(id),
  action VARCHAR(100) NOT NULL, -- 'medicine_added', 'medicine_taken', 'appointment_created', etc.
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول family_chat
```sql
CREATE TABLE family_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'file'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول help_articles
```sql
CREATE TABLE help_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
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
```

### جدول user_help_progress
```sql
CREATE TABLE user_help_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  article_id UUID REFERENCES help_articles(id),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  rating INTEGER, -- 1-5 stars
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول support_tickets
```sql
CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100), -- 'technical', 'medical', 'billing', etc.
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول support_messages
```sql
CREATE TABLE support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'file'
  is_from_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### جدول medical_guidelines
```sql
CREATE TABLE medical_guidelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100), -- 'medication_safety', 'drug_interactions', 'side_effects', etc.
  severity VARCHAR(20) DEFAULT 'info', -- 'info', 'warning', 'danger'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول inventory
```sql
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
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
```

---

## چک‌لیست مراحل پروژه

### مرحله 1: راه‌اندازی پروژه و زیرساخت
- [ ] ایجاد پروژه Next.js 14 با TypeScript
- [ ] نصب و پیکربندی Bootstrap 5 با RTL
- [ ] راه‌اندازی Supabase و دریافت کلیدها
- [ ] پیکربندی متغیرهای محیطی (.env.local)
- [ ] نصب پکیج‌های مورد نیاز (React Hook Form, Zod, Supabase Client)
- [ ] راه‌اندازی ESLint و Prettier
- [ ] ایجاد ساختار پوشه‌ها و فایل‌های پایه

### مرحله 2: احراز هویت و مدیریت کاربر
- [ ] پیاده‌سازی احراز هویت با Supabase Auth
- [ ] ایجاد صفحات ورود و ثبت‌نام
- [ ] مدیریت session و محافظت از route ها
- [ ] ایجاد middleware برای احراز هویت
- [ ] پیاده‌سازی پروفایل کاربر
- [ ] **انتخاب نوع سازمان**: شخصی، خانواده، کلینیک، بیمارستان، داروخانه
- [ ] **مدیریت چندین بیمار**: ایجاد سیستم مدیریت بیماران
- [ ] **اشتراک‌گذاری پروفایل**: سیستم دسترسی و اشتراک‌گذاری
- [ ] **مدیریت خانواده**: گروه‌بندی بیماران و اعضا
- [ ] **سطوح دسترسی**: تعریف نقش‌ها و مجوزها

### مرحله 3: طراحی UI/UX و کامپوننت‌ها
- [ ] طراحی Layout اصلی با RTL
- [ ] ایجاد کامپوننت‌های پایه (Button, Input, Card, Modal)
- [ ] پیاده‌سازی Sidebar و Navigation
- [ ] طراحی Header و Footer
- [ ] ایجاد کامپوننت‌های مخصوص دارو (MedicineCard, MedicineForm)
- [ ] پیاده‌سازی کامپوننت‌های یادآوری و تقویم
- [ ] **راهنمای تعاملی**: کامپوننت‌های Onboarding
- [ ] **کامپوننت‌های راهنما**: Tooltip، Help Modal، Tutorial
- [ ] **سیستم پشتیبانی**: چت پشتیبانی و تیکت

### مرحله 4: مدیریت داروها
- [ ] ایجاد API routes برای CRUD داروها
- [ ] پیاده‌سازی فرم افزودن/ویرایش دارو
- [ ] اضافه کردن قابلیت آپلود تصویر دارو
- [ ] پیاده‌سازی قابلیت نصف کردن و یک چهارم کردن قرص‌ها
- [ ] ایجاد صفحه لیست داروها با فیلتر و جستجو
- [ ] پیاده‌سازی مدیریت موجودی و هشدارها
- [ ] **ارتباط داروها با بیماران**: هر دارو به بیمار خاصی تعلق دارد
- [ ] **مدیریت دسترسی داروها**: کنترل دسترسی بر اساس مجوزها
- [ ] **مدیریت موجودی سازمانی**: کنترل موجودی در سطح سازمان

### مرحله 5: زمان‌بندی و یادآوری‌ها
- [ ] پیاده‌سازی سیستم زمان‌بندی داروها
- [ ] ایجاد کامپوننت تقویم و انتخاب زمان
- [ ] پیاده‌سازی یادآوری‌های درون‌برنامه‌ای
- [ ] اضافه کردن Push Notifications
- [ ] پیاده‌سازی یادآوری ویزیت‌های پزشک
- [ ] ایجاد سیستم نوتیفیکیشن‌های پیشرفته

### مرحله 6: پیگیری مصرف
- [ ] پیاده‌سازی چک‌لیست مصرف روزانه
- [ ] ایجاد سیستم ثبت مصرف (تیک زدن)
- [ ] پیاده‌سازی قابلیت به تعویق انداختن
- [ ] ایجاد تاریخچه کامل مصرف
- [ ] پیاده‌سازی آمار و نمودارها

### مرحله 7: گزارش‌گیری و تحلیل
- [ ] ایجاد صفحه داشبورد با آمار کلی
- [ ] پیاده‌سازی نمودارهای تحلیلی (Chart.js)
- [ ] ایجاد گزارش‌های روزانه/هفتگی/ماهانه
- [ ] پیاده‌سازی export به PDF/Excel
- [ ] ایجاد صفحه آمار و تحلیل‌ها
- [ ] **گزارش‌های سازمانی**: آمار کلی سازمان

### مرحله 8: ویژگی‌های پیشرفته
- [ ] پیاده‌سازی حالت آفلاین
- [ ] ایجاد سیستم پشتیبان‌گیری
- [ ] پیاده‌سازی جستجوی پیشرفته
- [ ] اضافه کردن فیلترهای پیشرفته
- [ ] پیاده‌سازی drag & drop برای مرتب‌سازی
- [ ] **چت خانوادگی**: سیستم پیام‌رسانی داخلی
- [ ] **اعلان‌های مشترک**: اطلاع‌رسانی به تمام اعضا
- [ ] **تاریخچه فعالیت‌ها**: ثبت و نمایش تغییرات
- [ ] **گزارش‌های خانوادگی**: آمار کلی خانواده
- [ ] **تقویم مشترک**: مشاهده تمام رویدادها
- [ ] **هوش مصنوعی**: پیشنهاد زمان‌بندی بهینه
- [ ] **تشخیص تداخل دارویی**: هشدارهای پزشکی
- [ ] **یادآوری هوشمند**: بر اساس الگوی مصرف
- [ ] **گزارش به پزشک**: تولید گزارش پزشکی
- [ ] **مدیریت واکسن**: ثبت تاریخ واکسیناسیون
- [ ] **ارتباط با داروخانه**: سفارش آنلاین دارو

### مرحله 9: تست و بهینه‌سازی
- [ ] تست واحد (Unit Tests)
- [ ] تست یکپارچگی (Integration Tests)
- [ ] تست رابط کاربری (E2E Tests)
- [ ] بهینه‌سازی عملکرد
- [ ] تست امنیت
- [ ] تست ریسپانسیو بودن

### مرحله 10: مستندسازی و انتشار
- [ ] نوشتن README کامل
- [ ] مستندسازی API
- [ ] ایجاد راهنمای کاربر
- [ ] آماده‌سازی برای انتشار
- [ ] راه‌اندازی CI/CD
- [ ] انتشار نسخه اولیه

### مرحله 11: راهنما و آموزش
- [ ] **راهنمای تعاملی**: ایجاد Onboarding کامل
- [ ] **ویدیوهای آموزشی**: تولید ویدیوهای آموزشی
- [ ] **FAQ جامع**: سوالات متداول و پاسخ‌ها
- [ ] **راهنمای تصویری**: اسکرین‌شات با توضیحات
- [ ] **Tips روزانه**: سیستم نکات مفید
- [ ] **راهنمای امنیت**: آموزش حفظ حریم خصوصی
- [ ] **پشتیبانی درون‌برنامه‌ای**: سیستم تیکت و چت
- [ ] **دستورالعمل‌های پزشکی**: راهنمای مصرف صحیح
- [ ] **هشدارهای مهم**: نکات مهم پزشکی
- [ ] **راهنمای اشتراک‌گذاری**: آموزش اشتراک‌گذاری

---

## ساختار پوشه‌های پروژه Next.js

```
meditrackapp/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── organization/
│   │   ├── setup/
│   │   ├── settings/
│   │   └── members/
│   ├── patients/
│   │   ├── [id]/
│   │   │   ├── medicines/
│   │   │   ├── appointments/
│   │   │   ├── reports/
│   │   │   └── share/
│   │   └── page.tsx
│   ├── medicines/
│   ├── reminders/
│   ├── appointments/
│   ├── history/
│   ├── reports/
│   ├── family/
│   │   ├── chat/
│   │   ├── members/
│   │   └── calendar/
│   ├── help/
│   │   ├── getting-started/
│   │   ├── tutorials/
│   │   ├── faq/
│   │   ├── support/
│   │   └── guidelines/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   ├── charts/
│   ├── layout/
│   ├── organization/
│   ├── patients/
│   ├── family/
│   ├── sharing/
│   ├── help/
│   └── onboarding/
├── lib/
│   ├── supabase/
│   ├── utils/
│   ├── validations/
│   ├── permissions/
│   └── organization/
├── hooks/
│   ├── useOrganization.ts
│   ├── usePatient.ts
│   ├── useFamily.ts
│   ├── usePermissions.ts
│   ├── useHelp.ts
│   └── useOnboarding.ts
├── types/
│   ├── organization.ts
│   ├── patient.ts
│   ├── family.ts
│   ├── permissions.ts
│   ├── help.ts
│   └── support.ts
├── styles/
└── public/
```

---

## محتوای راهنما و آموزش

### راهنمای شروع (Getting Started)
1. **خوش‌آمدگویی**: معرفی اپلیکیشن و قابلیت‌های اصلی
2. **انتخاب نوع سازمان**: شخصی، خانواده، کلینیک، بیمارستان، داروخانه
3. **ثبت‌نام و ورود**: آموزش نحوه ایجاد حساب کاربری
4. **ایجاد پروفایل بیمار**: نحوه اضافه کردن اطلاعات بیمار
5. **افزودن دارو**: آموزش ثبت داروهای جدید
6. **تنظیم یادآوری**: نحوه زمان‌بندی مصرف دارو
7. **اشتراک‌گذاری**: آموزش دسترسی دادن به اعضای خانواده

### آموزش‌های پیشرفته
1. **مدیریت سازمان**: نحوه مدیریت کلینیک یا بیمارستان
2. **مدیریت خانواده**: نحوه گروه‌بندی بیماران
3. **گزارش‌گیری**: استفاده از نمودارها و آمار
4. **تنظیمات پیشرفته**: شخصی‌سازی اپلیکیشن
5. **مدیریت موجودی**: کنترل موجودی داروها
6. **یادآوری ویزیت**: تنظیم قرارهای پزشکی
7. **پشتیبان‌گیری**: حفظ امنیت داده‌ها

### دستورالعمل‌های پزشکی
1. **مصرف صحیح دارو**: نکات مهم مصرف
2. **تداخل دارویی**: آشنایی با تداخل‌ها
3. **عوارض جانبی**: شناخت عوارض داروها
4. **نگهداری دارو**: شرایط نگهداری صحیح
5. **هشدارهای مهم**: نکات ایمنی
6. **اورژانس**: اقدامات لازم در شرایط اضطراری

### FAQ (سوالات متداول)
1. **مشکلات فنی**: حل مشکلات رایج
2. **امنیت و حریم خصوصی**: سوالات امنیتی
3. **اشتراک‌گذاری**: مشکلات اشتراک‌گذاری
4. **یادآوری‌ها**: تنظیمات نوتیفیکیشن
5. **گزارش‌ها**: نحوه استفاده از گزارش‌ها
6. **پشتیبانی**: نحوه تماس با پشتیبانی

---

## نکات مهم پیاده‌سازی

### امنیت
- استفاده از Row Level Security (RLS) در Supabase
- اعتبارسنجی داده‌ها با Zod
- محافظت از API routes
- مدیریت صحیح session ها
- **مدیریت دسترسی سازمانی**: کنترل دسترسی بر اساس نوع سازمان

### عملکرد
- استفاده از Server Components در Next.js
- بهینه‌سازی تصاویر
- Caching مناسب
- Lazy loading کامپوننت‌ها

### تجربه کاربری
- طراحی RTL کامل
- انیمیشن‌های نرم
- Loading states
- Error handling مناسب
- دسترسی‌پذیری (Accessibility)
- **رابط کاربری متناسب با نوع سازمان**: شخصی‌سازی بر اساس نیازها

---

> این فایل به‌روزرسانی خواهد شد و هر مرحله با جزییات بیشتر تکمیل می‌شود. 