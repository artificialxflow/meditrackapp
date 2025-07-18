'use client'

import { useAuth } from '@/hooks/useAuth'
import { FaPills, FaCalendarAlt, FaBell, FaChartBar, FaCog } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">در حال بارگذاری...</span>
            </div>
            <p className="mt-4 text-muted">در حال بررسی احراز هویت...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="h2 text-primary mb-2">داشبورد</h1>
          <p className="text-muted mb-0">خوش آمدید، {user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-6">
          <div className="col-md-3">
            <Card
              icon={FaPills}
              iconColor="primary"
              title="داروهای فعال"
              subtitle="12 دارو"
              className="text-center"
            />
          </div>
          <div className="col-md-3">
            <Card
              icon={FaCalendarAlt}
              iconColor="success"
              title="یادآوری امروز"
              subtitle="5 یادآوری"
              className="text-center"
            />
          </div>
          <div className="col-md-3">
            <Card
              icon={FaBell}
              iconColor="warning"
              title="هشدارها"
              subtitle="2 هشدار"
              className="text-center"
            />
          </div>
          <div className="col-md-3">
            <Card
              icon={FaChartBar}
              iconColor="info"
              title="مصرف هفته"
              subtitle="85%"
              className="text-center"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row g-4">
          <div className="col-md-6">
            <Card
              icon={FaPills}
              iconColor="primary"
              title="مدیریت داروها"
              subtitle="افزودن، ویرایش و حذف داروها"
            >
              <div className="d-grid gap-2">
                <Button
                  href="/medicines"
                  variant="primary"
                  className="w-100"
                >
                  مشاهده داروها
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="col-md-6">
            <Card
              icon={FaCalendarAlt}
              iconColor="success"
              title="یادآوری‌ها"
              subtitle="مدیریت زمان‌بندی مصرف"
            >
              <div className="d-grid gap-2">
                <Button
                  href="/reminders"
                  variant="success"
                  className="w-100"
                >
                  مشاهده یادآوری‌ها
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-6">
          <Card
            icon={FaCog}
            iconColor="secondary"
            title="تنظیمات"
            subtitle="مدیریت حساب کاربری"
          >
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={logout}
              >
                خروج
              </Button>
              <Button
                href="/profile"
                variant="outline-primary"
              >
                پروفایل
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
} 