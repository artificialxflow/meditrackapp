# راهنمای حل مشکل RLS (Row-Level Security)

## مشکل
خطای `403 Forbidden` و `new row violates row-level security policy for table "patients"` در Supabase

## راه حل

### مرحله 1: اجرای فایل SQL در Supabase
1. به پنل Supabase بروید
2. به بخش **SQL Editor** بروید
3. فایل `fix_rls_policies.sql` را کپی کنید
4. آن را در SQL Editor اجرا کنید

### مرحله 2: بررسی Authentication
مطمئن شوید که:
- کاربر در Supabase ثبت‌نام کرده است
- توکن authentication معتبر است
- `auth.uid()` مقدار صحیح برمی‌گرداند

### مرحله 3: تست
بعد از اجرای SQL:
1. برنامه را refresh کنید
2. دوباره سعی کنید بیمار اضافه کنید
3. کنسول را بررسی کنید تا مطمئن شوید خطاها برطرف شده‌اند

## توضیح تغییرات
- **قبل**: یک policy کلی که از function `check_patient_access` استفاده می‌کرد
- **بعد**: چهار policy جداگانه برای SELECT, INSERT, UPDATE, DELETE
- **مزیت**: کنترل دقیق‌تر و عملکرد بهتر

## اگر مشکل ادامه داشت
1. Authentication را بررسی کنید
2. مطمئن شوید که `created_by` درست تنظیم می‌شود
3. Logs Supabase را بررسی کنید 