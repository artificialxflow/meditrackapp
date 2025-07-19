'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPills, FaEye, FaEyeSlash, FaGoogle, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const { register, signInWithGoogle, loading, error, clearError } = useAuth()
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
    
    if (formData.password !== formData.confirmPassword) {
      return
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone
    })

    if (result.success) {
      router.push('/dashboard')
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
      <div className="w-100" style={{ maxWidth: '500px' }}>
        {/* Logo and Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center justify-content-center w-16 h-16 bg-gradient-to-r rounded-3 mb-4">
            <FaPills className="text-white fs-2" />
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">ثبت‌نام</h1>
          <p className="text-muted">حساب کاربری جدید ایجاد کنید</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3 shadow-lg p-4">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {/* Password Mismatch Error */}
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="alert alert-danger">
                رمز عبور و تکرار آن مطابقت ندارند
              </div>
            )}
            
            {/* Name Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  نام
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-control pe-5"
                    placeholder="نام خود را وارد کنید"
                  />
                  <FaUser className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2" />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  نام خانوادگی
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-control pe-5"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                  <FaUser className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                ایمیل
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control pe-5"
                  placeholder="example@email.com"
                />
                <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2" />
              </div>
            </div>

            {/* Phone Field */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                شماره تلفن
              </label>
              <div className="position-relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control pe-5"
                  placeholder="09123456789"
                />
                <FaPhone className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2" />
              </div>
            </div>

            {/* Password Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
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
                    placeholder="حداقل 8 کاراکتر"
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
              <div className="col-md-6 mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  تکرار رمز عبور
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="form-control pe-5"
                    placeholder="رمز عبور را تکرار کنید"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn btn-link position-absolute top-50 start-0 translate-middle-y text-muted"
                    style={{ zIndex: 10 }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="form-check-input"
                />
                <label className="form-check-label text-muted" htmlFor="agreeToTerms">
                  با{' '}
                  <Link href="/terms" className="text-decoration-none">
                    شرایط استفاده
                  </Link>
                  {' '}و{' '}
                  <Link href="/privacy" className="text-decoration-none">
                    حریم خصوصی
                  </Link>
                  {' '}موافقت می‌کنم
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms || formData.password !== formData.confirmPassword}
                className="btn btn-primary py-2"
              >
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                    در حال ثبت‌نام...
                  </div>
                ) : (
                  'ثبت‌نام'
                )}
              </button>
              <Link
                href="/login"
                className="btn btn-outline-primary py-2 text-decoration-none"
              >
                ورود
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1 border-top"></div>
            <span className="px-3 text-muted small">یا</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          {/* Social Registration Buttons */}
          <div className="d-grid gap-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            >
              <FaGoogle className="text-danger me-2" />
              <span>ثبت‌نام با گوگل</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 