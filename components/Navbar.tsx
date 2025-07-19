'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/providers/ThemeProvider'
import { FaSun, FaMoon, FaHome, FaUserInjured, FaUsers, FaPills, FaCalendarAlt, FaHeartbeat, FaFileAlt, FaBell, FaUser, FaQuestionCircle, FaTachometerAlt, FaClock } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold">
          دارویار
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* صفحه اصلی */}
            <li className="nav-item">
              <Link href="/" className="nav-link d-flex align-items-center">
                <FaHome className="ms-2" />
                خانه
              </Link>
            </li>
            
            {/* راهنما - همیشه قابل دسترس */}
            <li className="nav-item">
              <Link href="/guide" className="nav-link d-flex align-items-center">
                <FaQuestionCircle className="ms-2" />
                راهنما
              </Link>
            </li>
            
            {user && (
              <>
                {/* داشبورد - مرکز کنترل */}
                <li className="nav-item">
                  <Link href="/dashboard" className="nav-link d-flex align-items-center">
                    <FaTachometerAlt className="ms-2" />
                    داشبورد
                  </Link>
                </li>
                
                {/* مدیریت بیماران */}
                <li className="nav-item">
                  <Link href="/patients" className="nav-link d-flex align-items-center">
                    <FaUserInjured className="ms-2" />
                    بیماران
                  </Link>
                </li>
                
                {/* مدیریت خانواده‌ها */}
                <li className="nav-item">
                  <Link href="/families" className="nav-link d-flex align-items-center">
                    <FaUsers className="ms-2" />
                    خانواده‌ها
                  </Link>
                </li>
                
                {/* مدیریت داروها */}
                <li className="nav-item">
                  <Link href="/medicines" className="nav-link d-flex align-items-center">
                    <FaPills className="ms-2" />
                    داروها
                  </Link>
                </li>
                
                {/* برنامه‌های مصرف دارو */}
                <li className="nav-item">
                  <Link href="/schedules" className="nav-link d-flex align-items-center">
                    <FaClock className="ms-2" />
                    برنامه‌ها
                  </Link>
                </li>
                
                {/* قرار ملاقات‌ها */}
                <li className="nav-item">
                  <Link href="/appointments" className="nav-link d-flex align-items-center">
                    <FaCalendarAlt className="ms-2" />
                    قرار ملاقات
                  </Link>
                </li>
                
                {/* علائم حیاتی */}
                <li className="nav-item">
                  <Link href="/vitals" className="nav-link d-flex align-items-center">
                    <FaHeartbeat className="ms-2" />
                    علائم حیاتی
                  </Link>
                </li>
                
                {/* اسناد پزشکی */}
                <li className="nav-item">
                  <Link href="/documents" className="nav-link d-flex align-items-center">
                    <FaFileAlt className="ms-2" />
                    اسناد
                  </Link>
                </li>
                
                {/* اعلان‌ها */}
                <li className="nav-item">
                  <Link href="/notifications" className="nav-link d-flex align-items-center">
                    <FaBell className="ms-2" />
                    اعلان‌ها
                  </Link>
                </li>
                
                {/* پروفایل کاربر */}
                <li className="nav-item">
                  <Link href="/profile" className="nav-link d-flex align-items-center">
                    <FaUser className="ms-2" />
                    پروفایل
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={toggleTheme}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </li>
            {user ? (
              <li className="nav-item">
                <button onClick={() => logout()} className="btn btn-link nav-link">
                  خروج
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/auth/login" className="nav-link">
                  ورود
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}