'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPills, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const { login, signInWithGoogle, loading, error, clearError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email.trim()) {
      alert('لطفاً ایمیل خود را وارد کنید')
      return
    }
    
    if (!formData.password.trim()) {
      alert('لطفاً رمز عبور خود را وارد کنید')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      alert('لطفاً ایمیل معتبر وارد کنید')
      return
    }
    
    console.log('Submitting login form with:', {
      email: formData.email.trim(),
      passwordLength: formData.password.length
    })
    
    const result = await login({
      email: formData.email.trim(),
      password: formData.password
    })

    if (result.success) {
      console.log('Login successful, redirecting to dashboard')
      router.push('/dashboard')
    } else {
      console.log('Login failed:', result.error)
    }
  }

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle()
    if (result.success) {
      router.push('/dashboard')
    }
  }





  return (
    <div className="min-vh-100 bg-gradient-to-br d-flex align-items-center justify-content-center p-4">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {/* Logo and Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center justify-content-center w-16 h-16 bg-gradient-to-r rounded-3 mb-4">
            <FaPills className="text-white fs-2" />
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">خوش آمدید</h1>
          <p className="text-muted">به دارویار وارد شوید</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3 shadow-lg p-4">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="example@email.com"
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                رمز عبور
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-control pe-5"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link position-absolute top-50 start-0 translate-middle-y text-muted"
                  style={{ zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label text-muted" htmlFor="rememberMe">
                  مرا به خاطر بسپار
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-decoration-none text-primary"
              >
                فراموشی رمز عبور؟
              </Link>
            </div>

            {/* Submit Buttons */}
            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary py-2"
              >
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                    در حال ورود...
                  </div>
                ) : (
                  'ورود'
                )}
              </button>
              <Link
                href="/auth/register"
                className="btn btn-outline-primary py-2 text-decoration-none"
              >
                ثبت‌نام
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1 border-top"></div>
            <span className="px-3 text-muted small">یا</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="d-grid gap-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            >
              <FaGoogle className="text-danger me-2" />
              <span>ورود با گوگل</span>
            </button>
          </div>




        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-decoration-none text-muted"
          >
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
} 