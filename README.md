# دارویار (MediTrack) - اپلیکیشن مدیریت دارو و سلامتی

## 📋 معرفی پروژه

دارویار یک اپلیکیشن پیشرفته مدیریت دارو و سلامتی است که به کاربران کمک می‌کند تا مصرف داروهای خود و اعضای خانواده را به صورت منظم و دقیق مدیریت کنند. این اپلیکیشن با رابط کاربری فارسی و راست‌چین طراحی شده و قابلیت اشتراک‌گذاری کامل دارد.

## ✨ ویژگی‌های کلیدی

### 🔐 احراز هویت و امنیت
- 📧 ثبت‌نام و ورود با ایمیل/رمز عبور
- 🔗 ورود با Google و GitHub
- 🔒 مدیریت session و امنیت
- 👤 پروفایل کاربر کامل

### 👨‍👩‍👧‍👦 سیستم اشتراک‌گذاری
- 🏠 ایجاد و مدیریت خانواده
- 📱 اشتراک‌گذاری پروفایل بیمار
- 🔗 QR Code و لینک دعوت
- 👥 مدیریت نقش‌ها و مجوزها
- 💬 چت خانوادگی
- 🔔 اعلان‌های اشتراک‌گذاری

### 💊 مدیریت داروها
- 📝 ثبت و ویرایش داروها
- 🕐 زمان‌بندی دقیق مصرف
- 📊 پیگیری مصرف روزانه
- ⚖️ نصف کردن و یک چهارم کردن قرص‌ها
- 📦 مدیریت موجودی و هشدار انقضا
- 🏷️ دسته‌بندی هوشمند داروها

### ⏰ یادآوری و زمان‌بندی
- 🔔 یادآوری خودکار مصرف دارو
- 📅 تقویم داروها و ویزیت‌ها
- 📱 Push Notifications
- ⏰ قابلیت به تعویق انداختن

### 🏥 مدیریت پزشکی
- 👨‍⚕️ ثبت قرار ملاقات با پزشک
- 📊 ثبت علائم حیاتی
- 📄 آپلود اسناد پزشکی
- 📝 یادداشت‌های پزشکی
- 🚨 اطلاعات اضطراری

### 📈 گزارش‌گیری و تحلیل
- 📊 داشبورد تحلیلی
- 📈 نمودارهای پیشرفت
- 📋 گزارش‌های دوره‌ای
- 📄 Export به PDF/Excel
- 🏥 گزارش به پزشک

### 📱 ویژگی‌های پیشرفته
- 🔍 جستجوی پیشرفته
- 🎯 فیلترهای چندگانه
- 📱 PWA (قابلیت نصب)
- 🔄 حالت آفلاین
- 💾 پشتیبان‌گیری خودکار

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Bootstrap 5 (RTL)
- **Icons**: React Icons, Bootstrap Icons
- **Forms**: React Hook Form + Zod
- **State Management**: React Context + Hooks

### Backend & Database
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 🚀 راه‌اندازی پروژه

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn
- حساب Supabase
- Git

### مراحل نصب

1. **کلون کردن پروژه**
```bash
git clone <repository-url>
cd meditrackapp
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **تنظیم متغیرهای محیطی**
فایل `.env.local` را ایجاد کنید:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **راه‌اندازی دیتابیس**
- فایل `database.sql` را در Supabase SQL Editor اجرا کنید
- RLS (Row Level Security) به صورت خودکار فعال می‌شود

5. **اجرای پروژه**
```bash
npm run dev
```

پروژه روی `http://localhost:3000` در دسترس خواهد بود.

## 📁 ساختار پروژه

```
meditrackapp/
├── app/                    # Next.js App Router
│   ├── (auth)/            # صفحات احراز هویت
│   │   ├── login/         # ورود
│   │   ├── register/      # ثبت‌نام
│   │   └── forgot-password/ # فراموشی رمز
│   ├── dashboard/         # داشبورد اصلی
│   ├── patients/          # مدیریت بیماران
│   ├── families/          # مدیریت خانواده‌ها
│   ├── medicines/         # مدیریت داروها
│   ├── appointments/      # قرار ملاقات‌ها
│   ├── reports/           # گزارش‌ها و تحلیل
│   ├── settings/          # تنظیمات
│   ├── layout.tsx         # Layout اصلی
│   └── page.tsx           # صفحه اصلی
├── components/            # کامپوننت‌های React
│   ├── ui/               # کامپوننت‌های پایه
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   ├── forms/            # فرم‌ها
│   │   ├── LoginForm.tsx
│   │   ├── PatientForm.tsx
│   │   └── MedicineForm.tsx
│   ├── layout/           # کامپوننت‌های layout
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── sharing/          # کامپوننت‌های اشتراک‌گذاری
│   │   ├── FamilyCard.tsx
│   │   ├── InvitationModal.tsx
│   │   └── QRCodeGenerator.tsx
│   └── medical/          # کامپوننت‌های پزشکی
│       ├── MedicineCard.tsx
│       ├── AppointmentCard.tsx
│       └── VitalChart.tsx
├── lib/                  # کتابخانه‌ها و utilities
│   ├── supabase/         # تنظیمات Supabase
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils/            # توابع کمکی
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   └── validations/      # validation schemas
│       ├── auth.ts
│       ├── patient.ts
│       └── medicine.ts
├── types/                # TypeScript types
│   ├── auth.ts
│   ├── patient.ts
│   ├── medicine.ts
│   └── sharing.ts
├── hooks/                # Custom hooks
│   ├── useAuth.ts
│   ├── usePatients.ts
│   └── useMedicines.ts
├── services/             # API services
│   ├── authService.ts
│   ├── patientService.ts
│   └── medicineService.ts
├── public/               # فایل‌های استاتیک
│   ├── favicon.ico
│   ├── manifest.json
│   └── icons/
└── styles/               # فایل‌های CSS
    ├── globals.css
    └── components.css
```

## 🗄️ ساختار دیتابیس

### جداول اصلی (Core Tables)
- **profiles** - پروفایل کاربران (مرتبط با Supabase Auth)
- **patients** - اطلاعات بیماران
- **families** - خانواده‌ها
- **family_members** - اعضای خانواده با نقش‌ها

### جداول اشتراک‌گذاری (Sharing Tables)
- **patient_shares** - اشتراک‌گذاری بیماران
- **sharing_invitations** - دعوت‌نامه‌ها
- **sharing_notifications** - اعلان‌ها
- **family_chat** - چت خانوادگی

### جداول پزشکی (Medical Tables)
- **medications** - داروها
- **medication_schedules** - زمان‌بندی داروها
- **medication_intake** - پیگیری مصرف
- **appointments** - قرار ملاقات‌ها
- **vitals** - علائم حیاتی
- **documents** - اسناد پزشکی
- **notes** - یادداشت‌ها

### جداول پشتیبانی (Support Tables)
- **categories** - دسته‌بندی‌ها
- **insurance_providers** - بیمه‌ها
- **emergency_contacts** - تماس‌های اضطراری
- **allergies** - آلرژی‌ها
- **medical_conditions** - شرایط پزشکی

## 🎨 طراحی و UI/UX

### ویژگی‌های طراحی
- **RTL Support**: پشتیبانی کامل از راست‌چین
- **Persian Font**: استفاده از فونت Vazir
- **Responsive**: سازگار با تمام دستگاه‌ها
- **Accessibility**: دسترسی‌پذیری مناسب
- **Dark Mode**: پشتیبانی از حالت تاریک (در آینده)

### رنگ‌بندی
- **رنگ اصلی**: `#007bff` (آبی)
- **رنگ ثانویه**: `#6c757d` (خاکستری)
- **رنگ موفقیت**: `#28a745` (سبز)
- **رنگ هشدار**: `#ffc107` (زرد)
- **رنگ خطر**: `#dc3545` (قرمز)

## 🔒 امنیت

### ویژگی‌های امنیتی
- **Row Level Security (RLS)**: امنیت در سطح رکورد
- **Supabase Auth**: احراز هویت امن
- **Data Validation**: اعتبارسنجی داده‌ها با Zod
- **API Protection**: محافظت از API routes
- **Session Management**: مدیریت صحیح session ها

### RLS Policies
- کاربران فقط به داده‌های خود دسترسی دارند
- اشتراک‌گذاری با مجوزهای مشخص
- محافظت از داده‌های حساس پزشکی

## 📱 PWA Features

### ویژگی‌های PWA
- **Service Worker**: کارکرد آفلاین
- **Web App Manifest**: قابلیت نصب
- **Push Notifications**: اعلان‌های پیشرفته
- **Background Sync**: همگام‌سازی در پس‌زمینه
- **Offline Support**: کارکرد بدون اینترنت

## 🧪 تست

```bash
# تست واحد
npm run test

# تست E2E
npm run test:e2e

# تست linting
npm run lint

# تست type checking
npm run type-check
```

## 📦 انتشار

```bash
# Build پروژه
npm run build

# Preview
npm run preview

# Deploy
npm run deploy
```

## 🤝 مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. Commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📞 پشتیبانی

- Email: support@meditrack.com
- GitHub Issues: [اینجا](https://github.com/your-repo/issues)
- Documentation: [مستندات کامل](https://docs.meditrack.com)

---

## ✅ چک‌لیست مراحل پروژه

### مرحله 1: راه‌اندازی پروژه و زیرساخت ✅
- [x] ایجاد پروژه Next.js 14 با TypeScript
- [x] نصب و پیکربندی Bootstrap 5 و RTL
- [x] راه‌اندازی Supabase و دریافت کلیدها
- [x] پیکربندی متغیرهای محیطی (.env.local)
- [x] نصب پکیج‌های مورد نیاز
- [x] راه‌اندازی ESLint و Prettier
- [x] ایجاد ساختار پوشه‌ها و فایل‌های پایه
- [x] اضافه کردن فونت Vazir و پشتیبانی RTL

### مرحله 2: احراز هویت و مدیریت کاربر ✅
- [x] پیاده‌سازی احراز هویت با Supabase Auth
- [x] ایجاد صفحات ورود و ثبت‌نام
- [x] ایجاد صفحه فراموشی رمز عبور
- [x] پیاده‌سازی AuthService و useAuth Hook
- [x] ایجاد AuthProvider برای مدیریت state
- [x] پیاده‌سازی صفحه Dashboard
- [x] بهبود استایل‌دهی با Bootstrap 5
- [x] ایجاد کامپوننت‌های قابل استفاده مجدد

### مرحله 3: دیتابیس و سیستم اشتراک‌گذاری ⏳
- [ ] طراحی کامل دیتابیس
- [ ] پیاده‌سازی سیستم اشتراک‌گذاری
- [ ] مدیریت خانواده‌ها
- [ ] سیستم دعوت و QR Code
- [ ] چت خانوادگی
- [ ] اعلان‌های اشتراک‌گذاری

### مرحله 4: مدیریت بیماران ⏳
- [ ] فرم افزودن بیمار
- [ ] پروفایل بیمار
- [ ] اشتراک‌گذاری بیمار
- [ ] مدیریت دسترسی‌ها
- [ ] آپلود تصویر پروفایل
- [ ] اطلاعات پزشکی کامل

### مرحله 5: مدیریت داروها ⏳
- [ ] فرم افزودن دارو
- [ ] زمان‌بندی داروها
- [ ] پیگیری مصرف
- [ ] یادآوری‌ها
- [ ] نصف کردن قرص‌ها
- [ ] مدیریت موجودی

### مرحله 6: ویژگی‌های پیشرفته ⏳
- [ ] گزارش‌گیری و داشبورد
- [ ] PWA و آفلاین
- [ ] Push Notifications
- [ ] تست و بهینه‌سازی
- [ ] مستندسازی کامل

---

> این پروژه در حال توسعه است و ویژگی‌های جدید به طور مداوم اضافه می‌شوند.
