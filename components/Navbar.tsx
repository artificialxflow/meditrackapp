'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/providers/ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          MediTrack
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
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/patients" className="nav-link">
                    Patients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/families" className="nav-link">
                    Families
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/medicines" className="nav-link">
                    Medicines
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/appointments" className="nav-link">
                    Appointments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/vitals" className="nav-link">
                    Vitals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/documents" className="nav-link">
                    Documents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/notifications" className="nav-link">
                    Notifications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/profile" className="nav-link">
                    Profile
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
                <button onClick={signOut} className="btn btn-link nav-link">
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/auth/login" className="nav-link">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}