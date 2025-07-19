'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/providers/ThemeProvider'
import { useSidebar } from '@/providers/SidebarProvider'
import { FaSun, FaMoon, FaHome, FaQuestionCircle, FaBars } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()
  
  const isHomePage = pathname === '/';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          {user && !isHomePage && (
            <button
              className="btn btn-link text-white me-3 d-lg-none"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
          )}
          <Link href="/" className="navbar-brand fw-bold">
            دارویار
          </Link>
        </div>
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