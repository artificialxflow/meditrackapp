# راهنمای حل مشکل داروها

## مشکل
خطای `"Could not find the 'image_file' column of 'medicines' in the schema cache"`

## راه حل

### مرحله 1: اجرای SQL در Supabase
1. به Supabase Dashboard بروید
2. به بخش SQL Editor بروید
3. فایل `simple-fix-medicines.sql` را کپی کنید
4. آن را اجرا کنید

### مرحله 2: بررسی نتیجه
پس از اجرای SQL، باید پیام‌های زیر را ببینید:
- "ستون image_file حذف شد" یا "ستون image_file وجود ندارد"
- ساختار جدول medicines نمایش داده می‌شود

### مرحله 3: تست
1. صفحه داروها را refresh کنید
2. سعی کنید داروی جدید اضافه کنید
3. عکس آپلود کنید

## تغییرات اعمال شده در کد

### 1. اصلاح medicineService.ts
- حذف فیلد `image_file` از داده‌های ارسالی به Supabase
- بهبود error handling برای آپلود عکس

### 2. اصلاح CSS
- افزایش عرض سایدبار به 380px
- بهبود responsive design

## فایل‌های اصلاح شده
- `lib/services/medicineService.ts`
- `app/globals.css`
- `simple-fix-medicines.sql`

## نکات مهم
- اگر هنوز خطا دارید، Supabase cache را پاک کنید
- مطمئن شوید که bucket `images` در Supabase Storage وجود دارد
- اگر bucket وجود ندارد، آن را ایجاد کنید 