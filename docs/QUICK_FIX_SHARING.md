# 🔧 راهنمای سریع حل مشکل اشتراک‌گذاری

## مشکل فعلی
خطای `column "shared_by" does not exist` - جدول `patient_shares` وجود دارد اما ستون‌های مورد نیاز را ندارد.

## راه حل سریع

### مرحله 1: بررسی ساختار فعلی
فایل `check-current-table.sql` را در Supabase اجرا کنید تا ببینید چه ستون‌هایی وجود دارد.

### مرحله 2: اصلاح جدول
فایل `fix-patient-shares-table.sql` را اجرا کنید. این فایل:
- ستون‌های گمشده را اضافه می‌کند
- ساختار نهایی را نمایش می‌دهد
- یک رکورد تست درج می‌کند

### مرحله 3: تست
پس از اجرای موفق، باید پیام‌های زیر را ببینید:
- `Column shared_by added`
- `Column shared_with added`
- `Column permissions added`
- و غیره...

## اگر هنوز مشکل دارید:

### گزینه 1: حذف و ایجاد مجدد
```sql
-- حذف جدول موجود
DROP TABLE IF EXISTS patient_shares;

-- اجرای فایل step-by-step-sharing-setup.sql
```

### گزینه 2: بررسی Foreign Key
```sql
-- بررسی وجود جدول patients
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'patients'
);
```

### گزینه 3: غیرفعال کردن موقت RLS
```sql
ALTER TABLE patient_shares DISABLE ROW LEVEL SECURITY;
-- تست درج
-- سپس فعال کردن مجدد
ALTER TABLE patient_shares ENABLE ROW LEVEL SECURITY;
```

## ساختار نهایی مورد انتظار
پس از اجرای موفق، جدول باید این ستون‌ها را داشته باشد:

| ستون | نوع |
|------|-----|
| id | UUID |
| patient_id | UUID |
| shared_by | UUID |
| shared_with | UUID |
| share_token | TEXT |
| permissions | TEXT[] |
| expires_at | TIMESTAMP |
| is_active | BOOLEAN |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

## دستورالعمل نهایی
1. `check-current-table.sql` را اجرا کنید
2. `fix-patient-shares-table.sql` را اجرا کنید
3. اگر موفق بود، به برنامه برگردید و تست کنید
4. اگر خطا داشتید، از گزینه‌های بالا استفاده کنید

🎯 **هدف**: حل مشکل ستون `shared_by` و آماده‌سازی جدول برای سیستم اشتراک‌گذاری 