# اپلیکیشن مدیریت دارو – دارویار (MediTrack)

## معرفی و هدف
اپلیکیشن "دارویار" یا "MediTrack" برای مدیریت مصرف داروها، یادآوری، پیگیری و کاهش خطاهای انسانی در مصرف دارو طراحی می‌شود. این اپ مناسب افرادی است که نیاز به مصرف داروهای متعدد و متنوع دارند و می‌خواهند مصرف خود را به‌صورت دقیق و منظم مدیریت کنند.

## تکنولوژی‌ها و ابزارها
- **Next.js 14** (فرانت‌اند با TypeScript)
- **Supabase** (دیتابیس، احراز هویت، و Real-time)
- **Tailwind CSS** (استایل‌دهی)
- **React Hook Form** (مدیریت فرم‌ها)
- **Zod** (اعتبارسنجی داده‌ها)
- **Git** (ورژن کنترل)

---

## ویژگی‌های کلیدی اپلیکیشن

### مدیریت داروها
- ثبت و ویرایش داروها (نام، دوز، تعداد، تصویر، دسته‌بندی، یادداشت)
- **قابلیت نصف کردن و یک چهارم کردن قرص‌ها** (pill_splitting)
- مدیریت موجودی دارو (هشدار کمبود، تاریخ انقضا، یادآوری خرید)
- دسته‌بندی داروها (آنتی‌بیوتیک، ویتامین، مسکن، و غیره)

### زمان‌بندی و یادآوری
- زمان‌بندی دقیق مصرف (دفعات، ساعت دقیق، روزهای خاص)
- نوتیفیکیشن‌های پیشرفته (Push Notifications)
- یادآوری صوتی و بصری
- **یادآوری ویزیت‌های پزشک** (doctor_appointments)

### پیگیری و گزارش‌گیری
- پیگیری مصرف (مصرف شد/فراموش شد/به تعویق افتاد)
- تاریخچه کامل مصرف داروها
- گزارش‌گیری (روزانه/هفتگی/ماهانه)
- خروجی PDF/Excel
- نمودارهای تحلیلی

### ویژگی‌های اضافی
- پشتیبانی از چند پروفایل
- رابط کاربری ساده، تمیز، فارسی و راست‌چین
- حالت آفلاین
- پشتیبان‌گیری و بازیابی داده‌ها

---

## ساختار دیتابیس Supabase

### جدول medicines
```sql
CREATE TABLE medicines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
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
  user_id UUID REFERENCES auth.users(id),
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
  user_id UUID REFERENCES auth.users(id),
  doctor_name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location TEXT,
  notes TEXT,
  reminder_days INTEGER DEFAULT 1, -- چند روز قبل یادآوری
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### جدول categories
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#4A90E2',
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## چک‌لیست مراحل پروژه

### مرحله 1: راه‌اندازی پروژه و زیرساخت
- [ ] ایجاد پروژه Next.js 14 با TypeScript
- [ ] نصب و پیکربندی Tailwind CSS
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

### مرحله 3: طراحی UI/UX و کامپوننت‌ها
- [ ] طراحی Layout اصلی با RTL
- [ ] ایجاد کامپوننت‌های پایه (Button, Input, Card, Modal)
- [ ] پیاده‌سازی Sidebar و Navigation
- [ ] طراحی Header و Footer
- [ ] ایجاد کامپوننت‌های مخصوص دارو (MedicineCard, MedicineForm)
- [ ] پیاده‌سازی کامپوننت‌های یادآوری و تقویم

### مرحله 4: مدیریت داروها
- [ ] ایجاد API routes برای CRUD داروها
- [ ] پیاده‌سازی فرم افزودن/ویرایش دارو
- [ ] اضافه کردن قابلیت آپلود تصویر دارو
- [ ] پیاده‌سازی قابلیت نصف کردن و یک چهارم کردن قرص‌ها
- [ ] ایجاد صفحه لیست داروها با فیلتر و جستجو
- [ ] پیاده‌سازی مدیریت موجودی و هشدارها

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

### مرحله 8: ویژگی‌های پیشرفته
- [ ] پیاده‌سازی حالت آفلاین
- [ ] ایجاد سیستم پشتیبان‌گیری
- [ ] پیاده‌سازی جستجوی پیشرفته
- [ ] اضافه کردن فیلترهای پیشرفته
- [ ] پیاده‌سازی drag & drop برای مرتب‌سازی

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

---

## ساختار پوشه‌های پروژه Next.js

```
meditrackapp/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── medicines/
│   ├── reminders/
│   ├── appointments/
│   ├── history/
│   ├── reports/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   ├── charts/
│   └── layout/
├── lib/
│   ├── supabase/
│   ├── utils/
│   └── validations/
├── hooks/
├── types/
├── styles/
└── public/
```

---

## نکات مهم پیاده‌سازی

### امنیت
- استفاده از Row Level Security (RLS) در Supabase
- اعتبارسنجی داده‌ها با Zod
- محافظت از API routes
- مدیریت صحیح session ها

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

---

> این فایل به‌روزرسانی خواهد شد و هر مرحله با جزییات بیشتر تکمیل می‌شود. 