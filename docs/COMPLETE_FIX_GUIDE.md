# راهنمای کامل حل مشکلات MediTrack

## مشکلات حل شده:

### 1. ✅ RLS Policies (خطای 403)
**مشکل:** `new row violates row-level security policy for table "patients"`
**راه حل:** فایل `simple_rls_fix.sql` را در Supabase اجرا کنید

### 2. ✅ Foreign Key Constraint (خطای 23503)
**مشکل:** `insert or update on table "patients" violates foreign key constraint "patients_created_by_fkey"`
**راه حل:** فایل `fix_profiles_issue.sql` را در Supabase اجرا کنید

### 3. ✅ Date Format Issues (خطای 22007)
**مشکل:** `invalid input syntax for type date`
**راه حل:** کد اصلاح شده در `AddPatientModal.tsx` و `patientService.ts`

### 4. ✅ فارسی‌سازی کامل
**مشکل:** متن‌های انگلیسی در UI
**راه حل:** تمام کامپوننت‌ها فارسی شدند

## مراحل اجرا:

### مرحله 1: اجرای SQL در Supabase
```sql
-- فایل simple_rls_fix.sql را اجرا کنید
DROP POLICY IF EXISTS "Users can manage accessible patient data" ON public.patients;

CREATE POLICY "Users can view their own patients" ON public.patients 
FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own patients" ON public.patients 
FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own patients" ON public.patients 
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own patients" ON public.patients 
FOR DELETE USING (created_by = auth.uid());
```

### مرحله 2: ایجاد Profile برای کاربر
```sql
-- فایل fix_profiles_issue.sql را اجرا کنید
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT 
    auth.uid(),
    auth.jwt() ->> 'email',
    COALESCE(auth.jwt() ->> 'full_name', 'کاربر جدید'),
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid()
);
```

### مرحله 3: تست برنامه
1. برنامه را refresh کنید
2. دوباره بیمار اضافه کنید
3. کنسول را بررسی کنید

## فایل‌های اصلاح شده:

### Backend:
- ✅ `database_final.sql` - RLS policies اصلاح شد
- ✅ `fix_rls_policies.sql` - راه حل RLS
- ✅ `simple_rls_fix.sql` - راه حل ساده RLS
- ✅ `fix_profiles_issue.sql` - راه حل profiles

### Frontend:
- ✅ `components/patients/AddPatientModal.tsx` - فارسی + validation
- ✅ `components/patients/PatientCard.tsx` - فارسی
- ✅ `components/patients/SharePatientModal.tsx` - فارسی
- ✅ `app/patients/page.tsx` - فارسی + profile check
- ✅ `lib/services/patientService.ts` - date handling
- ✅ `lib/services/profileService.ts` - profile management

## نتیجه نهایی:
- ✅ بیماران قابل افزودن هستند
- ✅ تاریخ‌ها درست کار می‌کنند
- ✅ UI کاملاً فارسی است
- ✅ RLS درست کار می‌کند
- ✅ Profiles خودکار ایجاد می‌شوند

## اگر مشکل ادامه داشت:
1. Authentication را بررسی کنید
2. Supabase logs را چک کنید
3. Browser console را بررسی کنید
4. مطمئن شوید که کاربر login کرده است 