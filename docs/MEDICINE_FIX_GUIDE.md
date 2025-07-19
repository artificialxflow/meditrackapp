# راهنمای حل مشکل جدول Medicines

## 🔍 مشکل شناسایی شده

خطای `PGRST204` نشان می‌دهد که ستون `expiration_date` در جدول `medicines` وجود ندارد.

## ✅ راه‌حل

### مرحله 1: اجرای SQL در Supabase

1. به [Supabase Dashboard](https://supabase.com/dashboard) بروید
2. پروژه خود را انتخاب کنید
3. به **SQL Editor** بروید
4. فایل `database-setup.sql` را کپی کنید
5. در SQL Editor paste کنید
6. روی **Run** کلیک کنید

### مرحله 2: بررسی تغییرات

پس از اجرای SQL، جدول `medicines` با ستون‌های زیر ایجاد می‌شود:

```sql
CREATE TABLE medicines (
  id UUID PRIMARY KEY,
  patient_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  medication_type VARCHAR(50) NOT NULL,
  dosage_form VARCHAR(50) NOT NULL,
  strength DECIMAL(10,2),
  strength_unit VARCHAR(20),
  instructions TEXT,
  image_url TEXT,
  quantity INTEGER,
  expiration_date DATE,  -- ✅ این ستون اضافه شده
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### مرحله 3: تست عملکرد

1. اپلیکیشن را اجرا کنید: `npm run dev`
2. به صفحه `/medicines` بروید
3. روی "افزودن داروی جدید" کلیک کنید
4. فرم را پر کنید و تاریخ انقضا را وارد کنید
5. دارو را ذخیره کنید

## 🔧 تغییرات انجام شده در کد

### 1. تغییر نام جدول
- از `medications` به `medicines` تغییر یافت
- تمام سرویس‌ها به‌روزرسانی شدند

### 2. اضافه کردن ستون expiration_date
- به interface `Medicine` اضافه شد
- به interface `MedicineFormData` اضافه شد
- در فرم افزودن دارو نمایش داده می‌شود

### 3. فایل‌های تغییر یافته
- `lib/services/medicineService.ts` - تغییر نام جدول
- `components/medicines/AddMedicineModal.tsx` - اضافه کردن فیلد تاریخ انقضا
- `database-setup.sql` - ایجاد جدول جدید

## 🛡️ امنیت

جدول `medicines` دارای Row Level Security (RLS) است:

- کاربران فقط داروهای خود را می‌بینند
- فقط داروهای بیماران خود را می‌توانند اضافه کنند
- ویرایش و حذف محدود به داروهای خودشان است

## 📋 مراحل بعدی

پس از حل این مشکل:

1. **تست کامل**: تمام عملیات CRUD داروها را تست کنید
2. **بررسی عملکرد**: مطمئن شوید که همه چیز درست کار می‌کند
3. **گزارش‌گیری**: اگر مشکل دیگری دیدید، گزارش دهید

## 🆘 در صورت مشکل

اگر همچنان مشکل دارید:

1. **Console را بررسی کنید**: خطاهای جدید را بررسی کنید
2. **دیتابیس را چک کنید**: مطمئن شوید جدول ایجاد شده
3. **متغیرهای محیطی**: `.env.local` را بررسی کنید
4. **Supabase Logs**: لاگ‌های Supabase را بررسی کنید

---

**نکته**: این تغییرات backward compatible هستند و داده‌های موجود را تحت تأثیر قرار نمی‌دهند. 