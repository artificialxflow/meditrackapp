# راهنمای سریع حل مشکل Profile

## مشکل:
خطای `null value in column "id"` در Supabase SQL Editor

## راه حل سریع:

### مرحله 1: اجرای فایل `auto_profile_trigger.sql`
این فایل را در Supabase SQL Editor اجرا کنید. این فایل:
- Trigger function را اصلاح می‌کند
- برای کاربران موجود profile ایجاد می‌کند
- برای کاربران جدید خودکار profile ایجاد می‌کند

### مرحله 2: اگر مرحله 1 کار نکرد
فایل `manual_profile_fix.sql` را اجرا کنید:
1. ابتدا `SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;` را اجرا کنید
2. User ID کاربر خود را پیدا کنید
3. در فایل `manual_profile_fix.sql`، `YOUR_USER_ID_HERE` را با User ID واقعی جایگزین کنید
4. فایل را اجرا کنید

### مرحله 3: تست
1. برنامه را refresh کنید
2. دوباره بیمار اضافه کنید
3. کنسول را بررسی کنید

## راه حل جایگزین (از طریق کد):
اگر SQL کار نکرد، کد frontend اصلاح شده است و باید خودکار کار کند.

## بررسی:
```sql
-- بررسی تعداد profiles و users
SELECT COUNT(*) as total_profiles FROM public.profiles;
SELECT COUNT(*) as total_users FROM auth.users;

-- بررسی profile کاربر فعلی
SELECT * FROM public.profiles ORDER BY created_at DESC LIMIT 1;
```

## اگر مشکل ادامه داشت:
1. Authentication را بررسی کنید
2. مطمئن شوید که کاربر login کرده است
3. Supabase logs را چک کنید 