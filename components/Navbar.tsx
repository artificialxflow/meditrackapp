'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { FaPills, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <div className="w-10 h-10 bg-gradient-to-r rounded-3 d-flex align-items-center justify-content-center me-3">
            <FaPills className="text-white fs-5" />
          </div>
          <div>
            <span className="fs-4 fw-bold text-dark">دارویار</span>
            <div className="text-muted small">MediTrack</div>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                صفحه اصلی
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link href="/medicines" className="nav-link">
                    داروها
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/appointments" className="nav-link">
                    ویزیت‌ها
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/reports" className="nav-link">
                    گزارش‌ها
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link href="#features" className="nav-link">
                ویژگی‌ها
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#pricing" className="nav-link">
                قیمت‌گذاری
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#contact" className="nav-link">
                تماس با ما
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <div className="d-flex align-items-center text-muted">
                  <FaUser className="ms-2" />
                  <span className="d-none d-md-inline">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <Link href="/dashboard" className="btn btn-primary btn-sm">
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center"
                >
                  <FaSignOutAlt className="ms-1" />
                  <span className="d-none d-md-inline">خروج</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline-primary btn-sm">
                  ورود
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 