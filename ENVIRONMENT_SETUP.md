# 🚀 راهنمای تنظیم Environment Variables

## 📋 مراحل تنظیم محیط

### 1️⃣ **ایجاد فایل‌های Environment**

#### **برای توسعه محلی:**
```bash
# کپی کردن قالب
cp env.example .env.local

# یا ایجاد فایل جدید
touch .env.local
```

#### **برای production:**
```bash
# کپی کردن قالب production
cp env.production.example .env

# یا ایجاد فایل جدید
touch .env
```

### 2️⃣ **دریافت کلیدهای Supabase**

1. به [Supabase Dashboard](https://supabase.com/dashboard) بروید
2. پروژه جدید ایجاد کنید یا پروژه موجود را انتخاب کنید
3. به **Settings > API** بروید
4. کلیدهای زیر را کپی کنید:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3️⃣ **تنظیم متغیرهای ضروری**

#### **حداقل متغیرهای مورد نیاز:**
```env
# Supabase (ضروری)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Security
JWT_SECRET=your-super-secret-jwt-key-32-chars-long
SESSION_SECRET=another-super-secret-session-key
```

### 4️⃣ **تست اتصال**

پس از تنظیم متغیرها، پروژه را اجرا کنید:
```bash
npm run dev
```

## 🔐 **متغیرهای امنیتی**

### **NEXT_PUBLIC_ vs بدون پیشوند:**

#### **NEXT_PUBLIC_** (Client-side)
- در مرورگر قابل دسترسی است
- برای متغیرهای عمومی استفاده می‌شود
- مثال: `NEXT_PUBLIC_SUPABASE_URL`

#### **بدون پیشوند** (Server-side only)
- فقط در سرور قابل دسترسی است
- برای کلیدهای امنیتی استفاده می‌شود
- مثال: `SUPABASE_SERVICE_ROLE_KEY`

## 📁 **ساختار فایل‌ها**

```
meditrackapp/
├── env.example              # قالب (در Git ذخیره می‌شود)
├── env.local.example        # نمونه توسعه محلی
├── env.production.example   # نمونه production
├── .env.local              # فایل واقعی توسعه (نادیده گرفته می‌شود)
├── .env                    # فایل واقعی production (نادیده گرفته می‌شود)
└── .gitignore              # فایل‌های .env* نادیده گرفته می‌شوند
```

## 🛡️ **نکات امنیتی**

### ✅ **کارهای درست:**
- فایل‌های `.env.local` و `.env` را در Git commit نکنید
- از کلیدهای قوی و تصادفی استفاده کنید
- کلیدهای production را در جای امنی نگهداری کنید
- از متغیرهای `NEXT_PUBLIC_` فقط برای داده‌های عمومی استفاده کنید

### ❌ **کارهای اشتباه:**
- کلیدهای امنیتی را در کد قرار ندهید
- فایل‌های `.env` را در Git commit نکنید
- از کلیدهای ضعیف استفاده نکنید
- کلیدهای production را در development استفاده نکنید

## 🔧 **تولید کلیدهای امن**

### **برای JWT_SECRET:**
```bash
# در ترمینال
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **برای SESSION_SECRET:**
```bash
# در ترمینال
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📊 **متغیرهای اختیاری**

### **File Upload:**
```env
NEXT_PUBLIC_UPLOAD_URL=https://your-upload-service.com
UPLOAD_API_KEY=your_upload_api_key
```

### **Analytics:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Push Notifications:**
```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

### **External APIs:**
```env
DRUG_API_KEY=your_drug_api_key
DRUG_API_URL=https://api.example.com/drugs
```

## 🚨 **مشکلات رایج**

### **خطای "Environment variable not found":**
- فایل `.env.local` را بررسی کنید
- نام متغیر را چک کنید
- سرور را restart کنید

### **خطای Supabase connection:**
- کلیدهای Supabase را بررسی کنید
- URL پروژه را چک کنید
- RLS را فعال کنید

### **خطای JWT:**
- `JWT_SECRET` را تنظیم کنید
- کلید حداقل 32 کاراکتر باشد
- سرور را restart کنید

## 📞 **پشتیبانی**

اگر مشکلی در تنظیم محیط دارید:
1. فایل‌های example را بررسی کنید
2. مستندات Supabase را مطالعه کنید
3. در GitHub Issues مشکل را گزارش دهید 