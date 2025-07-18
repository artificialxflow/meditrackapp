'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/providers/ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'

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
            {user && (
              <>
                <li className="nav-item">
                  <Link href="/dashboard" className="nav-link">
                    داشبورد
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/patients" className="nav-link">
                    بیماران
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/families" className="nav-link">
                    خانواده‌ها
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/medicines" className="nav-link">
                    داروها
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/appointments" className="nav-link">
                    قرار ملاقات
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/vitals" className="nav-link">
                    علائم حیاتی
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/documents" className="nav-link">
                    اسناد
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/notifications" className="nav-link">
                    اعلان‌ها
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/profile" className="nav-link">
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