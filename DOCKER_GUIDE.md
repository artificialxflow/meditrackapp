# 🐳 راهنمای Docker برای MediTrack

## 📋 فهرست مطالب
- [معرفی](#معرفی)
- [پیش‌نیازها](#پیشنیازها)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [دستورات Docker](#دستورات-docker)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## 🎯 معرفی

این راهنما نحوه Dockerize کردن و اجرای پروژه MediTrack را توضیح می‌دهد. پروژه شامل چندین سرویس است:

- **MediTrack App**: اپلیکیشن اصلی Next.js
- **Nginx**: Reverse Proxy و Load Balancer
- **Redis**: کش و session storage
- **Prometheus & Grafana**: مانیتورینگ (اختیاری)

---

## 🔧 پیش‌نیازها

### نرم‌افزارهای مورد نیاز:
```bash
# Docker
docker --version  # >= 20.10

# Docker Compose
docker-compose --version  # >= 2.0

# Git
git --version
```

### منابع سیستم:
- **RAM**: حداقل 2GB (توصیه: 4GB)
- **CPU**: حداقل 2 هسته
- **Disk**: حداقل 10GB فضای آزاد

---

## 🚀 نصب و راه‌اندازی

### 1. کلون کردن پروژه
```bash
git clone https://github.com/your-username/meditrackapp.git
cd meditrackapp
```

### 2. تنظیم Environment Variables
```bash
# کپی کردن فایل‌های محیطی
cp docs/env.example .env.local
cp docs/env.example .env.production

# ویرایش فایل‌ها
nano .env.local
nano .env.production
```

### 3. اجرای Development
```bash
# اجرای سرویس development
docker-compose --profile dev up -d

# مشاهده لاگ‌ها
docker-compose --profile dev logs -f meditrack-dev
```

### 4. اجرای Production
```bash
# Build و اجرای سرویس‌های production
docker-compose -f docker-compose.prod.yml up -d

# مشاهده لاگ‌ها
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🐳 دستورات Docker

### Development Commands
```bash
# اجرای development
docker-compose --profile dev up -d

# توقف development
docker-compose --profile dev down

# Rebuild development
docker-compose --profile dev up -d --build

# مشاهده لاگ‌ها
docker-compose --profile dev logs -f meditrack-dev
```

### Production Commands
```bash
# اجرای production
docker-compose -f docker-compose.prod.yml up -d

# توقف production
docker-compose -f docker-compose.prod.yml down

# Rebuild production
docker-compose -f docker-compose.prod.yml up -d --build

# مشاهده لاگ‌ها
docker-compose -f docker-compose.prod.yml logs -f
```

### Utility Commands
```bash
# مشاهده وضعیت container ها
docker ps

# مشاهده لاگ‌های container خاص
docker logs meditrack-app

# ورود به container
docker exec -it meditrack-app sh

# مشاهده استفاده از منابع
docker stats

# پاک کردن cache
docker system prune -a
```

---

## 🔐 Environment Variables

### فایل .env.local (Development)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### فایل .env.production (Production)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Redis Configuration
REDIS_PASSWORD=your_redis_password

# Monitoring
GRAFANA_PASSWORD=your_grafana_password
```

---

## 🌐 Deployment

### 1. Local Deployment
```bash
# Development
docker-compose --profile dev up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Server Deployment
```bash
# آپلود فایل‌ها به سرور
scp -r . user@your-server:/opt/meditrack

# اتصال به سرور
ssh user@your-server

# اجرای پروژه
cd /opt/meditrack
docker-compose -f docker-compose.prod.yml up -d
```

### 3. SSL Certificate
```bash
# ایجاد SSL certificate (Let's Encrypt)
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem
```

---

## 📊 Monitoring

### 1. Health Check
```bash
# بررسی وضعیت اپلیکیشن
curl http://localhost:3000/api/health

# بررسی وضعیت container ها
docker-compose ps
```

### 2. Logs
```bash
# مشاهده لاگ‌های اپلیکیشن
docker-compose logs -f meditrack-app

# مشاهده لاگ‌های Nginx
docker-compose logs -f nginx

# مشاهده لاگ‌های Redis
docker-compose logs -f redis
```

### 3. Grafana Dashboard
```bash
# دسترسی به Grafana
http://localhost:3001

# Username: admin
# Password: admin (یا مقدار GRAFANA_PASSWORD)
```

---

## 🔧 Troubleshooting

### مشکلات رایج:

#### 1. Port Already in Use
```bash
# بررسی پورت‌های استفاده شده
netstat -tulpn | grep :3000

# توقف سرویس‌های قبلی
docker-compose down
```

#### 2. Build Failed
```bash
# پاک کردن cache
docker system prune -a

# Rebuild
docker-compose --profile dev up -d --build
```

#### 3. Environment Variables Not Loaded
```bash
# بررسی فایل‌های env
ls -la .env*

# Restart containers
docker-compose restart
```

#### 4. Database Connection Issues
```bash
# بررسی اتصال Supabase
curl -I $NEXT_PUBLIC_SUPABASE_URL

# بررسی environment variables
docker exec meditrack-app env | grep SUPABASE
```

#### 5. Memory Issues
```bash
# بررسی استفاده از منابع
docker stats

# افزایش memory limit
docker-compose -f docker-compose.prod.yml up -d --scale meditrack-app=2
```

---

## 📁 ساختار فایل‌ها

```
meditrackapp/
├── Dockerfile                 # Production Dockerfile
├── Dockerfile.dev            # Development Dockerfile
├── docker-compose.yml        # Development compose
├── docker-compose.prod.yml   # Production compose
├── .dockerignore             # Docker ignore file
├── nginx/
│   └── nginx.conf           # Nginx configuration
├── monitoring/
│   ├── prometheus.yml       # Prometheus config
│   └── grafana/            # Grafana dashboards
├── .env.local              # Development env
├── .env.production         # Production env
└── DOCKER_GUIDE.md         # This file
```

---

## 🚀 Performance Tips

### 1. Multi-stage Build
- استفاده از multi-stage build برای کاهش حجم image
- بهینه‌سازی لایه‌های Docker

### 2. Caching
- استفاده از Redis برای کش
- بهینه‌سازی static files

### 3. Load Balancing
- استفاده از Nginx برای load balancing
- Health checks برای container ها

### 4. Monitoring
- Prometheus برای metrics
- Grafana برای visualization

---

## 📞 پشتیبانی

برای مشکلات و سوالات:
1. بررسی لاگ‌ها: `docker-compose logs -f`
2. بررسی وضعیت: `docker-compose ps`
3. بررسی منابع: `docker stats`
4. Health check: `curl http://localhost:3000/api/health`

---

## 🎉 نتیجه‌گیری

پروژه MediTrack با Docker آماده اجرا است. برای شروع:

```bash
# Development
docker-compose --profile dev up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

**🎯 پروژه شما آماده Docker deployment است!** 🐳 