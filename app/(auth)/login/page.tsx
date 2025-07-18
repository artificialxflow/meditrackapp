'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaPills, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { TEST_CREDENTIALS } from '@/lib/auth/test-user'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const { login, signInWithGoogle, signInWithGithub, loading, error, clearError } = useAuth()
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

  const handleGithubLogin = async () => {
    const result = await signInWithGithub()
    if (result.success) {
      router.push('/dashboard')
    }
  }

  const handleTestLogin = () => {
    setFormData({
      email: TEST_CREDENTIALS.email,
      password: TEST_CREDENTIALS.password,
      rememberMe: false
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-4">
            <FaPills className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">خوش آمدید</h1>
          <p className="text-gray-600">به دارویار وارد شوید</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="example@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                فراموشی رمز عبور؟
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  در حال ورود...
                </div>
              ) : (
                'ورود'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">یا</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500 ml-3" />
              <span className="text-gray-700">ورود با گوگل</span>
            </button>
            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGithub className="text-gray-800 ml-3" />
              <span className="text-gray-700">ورود با گیت‌هاب</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>

          {/* Test Login Button (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleTestLogin}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                پر کردن اطلاعات تست
              </button>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
} 