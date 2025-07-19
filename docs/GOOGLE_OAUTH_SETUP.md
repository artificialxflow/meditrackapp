# راهنمای تنظیم Google OAuth برای دارویار

## مراحل فعال کردن لاگین با گوگل

### مرحله 1: ایجاد پروژه در Google Cloud Console

1. به [Google Cloud Console](https://console.cloud.google.com/) بروید
2. یک پروژه جدید ایجاد کنید یا پروژه موجود را انتخاب کنید
3. در منوی سمت چپ، به **APIs & Services** > **Credentials** بروید
4. روی **Create Credentials** کلیک کنید و **OAuth 2.0 Client IDs** را انتخاب کنید

### مرحله 2: تنظیم OAuth Consent Screen

1. ابتدا **OAuth consent screen** را تنظیم کنید:
   - **User Type**: External (برای کاربران عمومی)
   - **App name**: دارویار
   - **User support email**: ایمیل پشتیبانی شما
   - **Developer contact information**: ایمیل شما
   - **Authorized domains**: دامنه‌های مجاز (مثل localhost برای توسعه)

### مرحله 3: ایجاد OAuth 2.0 Client ID

1. **Application type**: Web application
2. **Name**: دارویار Web Client
3. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
4. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```

### مرحله 4: تنظیم در Supabase Dashboard

1. به [Supabase Dashboard](https://supabase.com/dashboard) بروید
2. پروژه خود را انتخاب کنید
3. به **Authentication** > **Providers** بروید
4. **Google** را پیدا کنید و روی **Enable** کلیک کنید
5. اطلاعات زیر را وارد کنید:
   - **Client ID**: از Google Cloud Console کپی کنید
   - **Client Secret**: از Google Cloud Console کپی کنید
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

### مرحله 5: تنظیم Redirect URLs در Google Cloud Console

1. به Google Cloud Console برگردید
2. **Authorized redirect URIs** را به‌روزرسانی کنید:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   https://your-project.supabase.co/auth/v1/callback
   ```

### مرحله 6: تست عملکرد

1. اپلیکیشن را اجرا کنید: `npm run dev`
2. به صفحه لاگین بروید
3. روی دکمه **ورود با گوگل** کلیک کنید
4. فرآیند احراز هویت را تست کنید

## نکات مهم

### امنیت
- **Client Secret** را هرگز در کد فرانت‌اند قرار ندهید
- فقط در Supabase Dashboard استفاده کنید
- از HTTPS در محیط production استفاده کنید

### تنظیمات محیط توسعه
- برای localhost، `http://localhost:3000` را در Authorized origins قرار دهید
- برای production، دامنه واقعی خود را اضافه کنید

### عیب‌یابی
اگر با خطا مواجه شدید:
1. **Redirect URI mismatch**: مطمئن شوید که redirect URI در Google و Supabase یکسان است
2. **Invalid client**: Client ID و Secret را دوباره بررسی کنید
3. **Domain not authorized**: دامنه را در Google Cloud Console اضافه کنید

## حذف GitHub OAuth

✅ **تکمیل شده**: کدهای مربوط به GitHub OAuth از پروژه حذف شدند:
- متد `signInWithGithub` از `AuthService` حذف شد
- متد `signInWithGithub` از `useAuth` hook حذف شد
- دکمه‌های GitHub از صفحات لاگین و ثبت‌نام حذف شدند
- آیکون‌های GitHub از imports حذف شدند

## نتیجه

حالا اپلیکیشن دارویار فقط از Google OAuth برای احراز هویت استفاده می‌کند و GitHub OAuth کاملاً حذف شده است. 