# دارویار (MediTrack) - اپلیکیشن مدیریت دارو

## 📋 معرفی پروژه

دارویار یک اپلیکیشن مدیریت دارو است که به کاربران کمک می‌کند تا مصرف داروهای خود را به صورت منظم و دقیق مدیریت کنند. این اپلیکیشن با رابط کاربری فارسی و راست‌چین طراحی شده است.

## ✨ ویژگی‌های کلیدی

- 📱 **مدیریت داروها**: ثبت، ویرایش و حذف داروها
- ⏰ **یادآوری مصرف**: زمان‌بندی دقیق مصرف داروها
- 🏥 **یادآوری ویزیت پزشک**: مدیریت قرارهای پزشکی
- 💊 **نصف کردن قرص**: قابلیت نصف یا یک چهارم کردن قرص‌ها
- 📊 **گزارش‌گیری**: آمار و نمودارهای مصرف
- 🔔 **نوتیفیکیشن**: یادآوری‌های پیشرفته
- 📱 **PWA**: قابلیت نصب روی موبایل

## 🛠️ تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Bootstrap 5 (RTL) + Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Icons**: Font Awesome
- **Font**: Vazir (فونت فارسی)

## 🚀 راه‌اندازی پروژه

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn
- حساب Supabase

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
- جداول Supabase را طبق مستندات ایجاد کنید
- RLS (Row Level Security) را فعال کنید

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
│   ├── dashboard/         # داشبورد اصلی
│   ├── medicines/         # مدیریت داروها
│   ├── appointments/      # ویزیت‌های پزشک
│   ├── layout.tsx         # Layout اصلی
│   └── page.tsx           # صفحه اصلی
├── components/            # کامپوننت‌های React
│   ├── ui/               # کامپوننت‌های پایه
│   ├── forms/            # فرم‌ها
│   └── layout/           # کامپوننت‌های layout
├── lib/                  # کتابخانه‌ها و utilities
│   ├── supabase/         # تنظیمات Supabase
│   └── utils/            # توابع کمکی
├── types/                # TypeScript types
├── public/               # فایل‌های استاتیک
└── styles/               # فایل‌های CSS
```

## 🗄️ ساختار دیتابیس

### جداول اصلی

- **medicines**: اطلاعات داروها
- **medicine_schedules**: زمان‌بندی مصرف
- **medicine_intake**: پیگیری مصرف
- **doctor_appointments**: ویزیت‌های پزشک
- **categories**: دسته‌بندی داروها

## 🎨 طراحی و UI/UX

- **RTL Support**: پشتیبانی کامل از راست‌چین
- **Persian Font**: استفاده از فونت Vazir
- **Responsive**: سازگار با تمام دستگاه‌ها
- **Accessibility**: دسترسی‌پذیری مناسب
- **Dark Mode**: پشتیبانی از حالت تاریک (در آینده)

## 🔒 امنیت

- Row Level Security (RLS) در Supabase
- اعتبارسنجی داده‌ها با Zod
- محافظت از API routes
- مدیریت صحیح session ها

## 📱 PWA Features

- Service Worker برای آفلاین
- Manifest برای نصب
- Push Notifications
- Background Sync

## 🧪 تست

```bash
# تست واحد
npm run test

# تست E2E
npm run test:e2e

# تست linting
npm run lint
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

---

## ✅ چک‌لیست مراحل پروژه

### مرحله 1: راه‌اندازی پروژه و زیرساخت
- [x] ایجاد پروژه Next.js 14 با TypeScript
- [x] نصب و پیکربندی Tailwind CSS و Bootstrap 5
- [x] راه‌اندازی Supabase و دریافت کلیدها
- [x] پیکربندی متغیرهای محیطی (.env.local)
- [x] نصب پکیج‌های مورد نیاز (React Hook Form, Zod, Supabase Client)
- [x] راه‌اندازی ESLint و Prettier
- [x] ایجاد ساختار پوشه‌ها و فایل‌های پایه
- [x] اضافه کردن فونت Vazir و پشتیبانی RTL
- [x] نصب و پیکربندی react-icons

### مرحله 2: احراز هویت و مدیریت کاربر
- [x] پیاده‌سازی احراز هویت با Supabase Auth
- [x] ایجاد صفحات ورود و ثبت‌نام
- [x] ایجاد صفحه فراموشی رمز عبور
- [x] پیاده‌سازی AuthService و useAuth Hook
- [x] ایجاد AuthProvider برای مدیریت state
- [x] پیاده‌سازی صفحه Dashboard
- [x] رفع خطای Maximum Update Depth در useAuth
- [x] رفع خطای AuthSessionMissingError در AuthService
- [x] بهبود استایل‌دهی با Bootstrap 5
- [x] تبدیل کامل از Tailwind CSS به Bootstrap 5
- [x] ایجاد کامپوننت Navbar قابل استفاده مجدد
- [x] ایجاد کامپوننت Footer قابل استفاده مجدد
- [x] بهبود UI/UX و استایل‌دهی کلی
- [ ] مدیریت session و محافظت از route ها
- [ ] ایجاد middleware برای احراز هویت
- [ ] پیاده‌سازی پروفایل کاربر

### مرحله 3: طراحی UI/UX و کامپوننت‌ها
- [x] طراحی Layout اصلی با RTL
- [x] ایجاد کامپوننت‌های پایه (Button, Input, Card, Modal)
- [x] پیاده‌سازی Sidebar و Navigation
- [x] طراحی Header و Footer
- [x] ایجاد کامپوننت‌های مخصوص دارو (MedicineCard, MedicineForm)
- [x] پیاده‌سازی کامپوننت‌های یادآوری و تقویم

### مرحله 4: مدیریت داروها
- [x] ایجاد صفحه اصلی مدیریت داروها
- [x] پیاده‌سازی کامپوننت MedicineCard برای نمایش داروها
- [x] ایجاد کامپوننت AddMedicineModal برای افزودن دارو
- [x] پیاده‌سازی فیلتر و جستجو در داروها
- [x] ایجاد کامپوننت‌های UI پایه (Input, Select)
- [x] پیاده‌سازی validation فرم‌ها
- [x] اتصال به Supabase برای ذخیره و بازیابی داده‌ها
- [x] ایجاد MedicineService برای مدیریت داروها
- [x] پیاده‌سازی CRUD عملیات کامل
- [x] پیاده‌سازی جستجو، فیلتر و مرتب‌سازی پیشرفته
- [ ] اضافه کردن قابلیت آپلود تصویر دارو
- [ ] پیاده‌سازی قابلیت نصف کردن و یک چهارم کردن قرص‌ها
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
