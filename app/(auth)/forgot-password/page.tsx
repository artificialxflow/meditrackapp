'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaPills, FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { forgotPassword, loading, error, clearError } = useAuth()

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await forgotPassword(email)

    if (result.success) {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-4">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ایمیل ارسال شد</h1>
            <p className="text-gray-600">لینک بازنشانی رمز عبور به ایمیل شما ارسال شد</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">بررسی ایمیل خود</h2>
            <p className="text-gray-600 mb-6">
              لینک بازنشانی رمز عبور به آدرس <strong>{email}</strong> ارسال شد. 
              لطفاً ایمیل خود را بررسی کنید.
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-block"
              >
                بازگشت به صفحه ورود
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                ارسال مجدد
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm inline-flex items-center"
            >
              <FaArrowLeft className="ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-4">
            <FaPills className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">فراموشی رمز عبور</h1>
          <p className="text-gray-600">ایمیل خود را وارد کنید تا لینک بازنشانی ارسال شود</p>
        </div>

        {/* Forgot Password Form */}
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
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="example@email.com"
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
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
                  در حال ارسال...
                </div>
              ) : (
                'ارسال لینک بازنشانی'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              رمز عبور خود را به یاد دارید؟{' '}
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                وارد شوید
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm inline-flex items-center"
          >
            <FaArrowLeft className="ml-2" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
} 