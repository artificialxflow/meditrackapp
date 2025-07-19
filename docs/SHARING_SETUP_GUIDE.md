# راهنمای راه‌اندازی سیستم اشتراک‌گذاری

## مشکل فعلی
خطای `column "shared_by" does not exist` نشان می‌دهد که جدول `patient_shares` هنوز ایجاد نشده است.

## راه حل مرحله به مرحله

### مرحله 1: اجرای SQL پایه
1. به Supabase Dashboard بروید
2. به بخش SQL Editor بروید
3. فایل `test-sharing-table.sql` را کپی و اجرا کنید
4. نتایج را بررسی کنید

### مرحله 2: بررسی نتایج
پس از اجرای SQL، باید نتایج زیر را ببینید:
- `table_exists: true`
- لیست ستون‌های جدول `patient_shares`
- پیام موفقیت برای درج رکورد تست

### مرحله 3: اجرای SQL کامل
اگر مرحله 2 موفق بود:
1. فایل `step-by-step-sharing-setup.sql` را اجرا کنید
2. این فایل شامل تمام RLS Policies و Functions است

### مرحله 4: تست عملکرد
پس از اجرای SQL کامل:
1. به برنامه برگردید
2. روی دکمه "اشتراک" در کارت بیمار کلیک کنید
3. سعی کنید اشتراک جدید ایجاد کنید

## عیب‌یابی

### اگر خطای Foreign Key رخ داد:
```sql
-- بررسی وجود جدول patients
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'patients'
) as patients_table_exists;

-- بررسی وجود جدول auth.users
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'auth' 
  AND table_name = 'users'
) as auth_users_exists;
```

### اگر خطای RLS رخ داد:
```sql
-- غیرفعال کردن موقت RLS برای تست
ALTER TABLE patient_shares DISABLE ROW LEVEL SECURITY;

-- تست درج
INSERT INTO patient_shares (patient_id, shared_by, share_token) 
VALUES ('test-patient-id', 'test-user-id', 'test-token');

-- فعال کردن مجدد RLS
ALTER TABLE patient_shares ENABLE ROW LEVEL SECURITY;
```

### اگر خطای Function رخ داد:
```sql
-- بررسی وجود extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- بررسی وجود gen_random_bytes
SELECT gen_random_bytes(32);
```

## ساختار نهایی جدول
پس از اجرای موفق SQL، جدول `patient_shares` باید این ستون‌ها را داشته باشد:

| ستون | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه منحصر به فرد |
| patient_id | UUID | شناسه بیمار |
| shared_by | UUID | شناسه کاربر اشتراک‌کننده |
| shared_with | UUID | شناسه کاربر دریافت‌کننده (اختیاری) |
| share_token | TEXT | توکن منحصر به فرد اشتراک |
| permissions | TEXT[] | آرایه دسترسی‌ها |
| expires_at | TIMESTAMP | تاریخ انقضا (اختیاری) |
| is_active | BOOLEAN | وضعیت فعال بودن |
| created_at | TIMESTAMP | تاریخ ایجاد |
| updated_at | TIMESTAMP | تاریخ بروزرسانی |

## نکات مهم
- ابتدا `test-sharing-table.sql` را اجرا کنید
- اگر موفق بود، `step-by-step-sharing-setup.sql` را اجرا کنید
- در صورت خطا، پیام خطا را بررسی کنید
- مطمئن شوید که جدول `patients` وجود دارد
- مطمئن شوید که RLS درست تنظیم شده است 