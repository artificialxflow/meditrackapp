import { supabase } from '../supabase/client'
import { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean
  user?: User | null
  session?: Session | null
  error?: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface LoginData {
  email: string
  password: string
}

export class AuthService {
  // ثبت‌نام کاربر جدید
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            full_name: `${data.firstName} ${data.lastName}`
          }
        }
      })

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      return {
        success: true,
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      return {
        success: false,
        error: 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.'
      }
    }
  }

  // ورود کاربر
  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Attempting login with email:', data.email)
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim().toLowerCase(),
        password: data.password
      })

      if (error) {
        console.error('Login error:', error)
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      console.log('Login successful for user:', authData.user?.email)
      return {
        success: true,
        user: authData.user,
        session: authData.session
      }
    } catch (error) {
      console.error('Login exception:', error)
      return {
        success: false,
        error: 'خطا در ورود. لطفاً دوباره تلاش کنید.'
      }
    }
  }

  // خروج کاربر
  static async logout(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: 'خطا در خروج. لطفاً دوباره تلاش کنید.'
      }
    }
  }

  // فراموشی رمز عبور
  static async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
      })

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: 'خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.'
      }
    }
  }

  // بازنشانی رمز عبور
  static async resetPassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      return {
        success: true,
        user: data.user
      }
    } catch (error) {
      return {
        success: false,
        error: 'خطا در بازنشانی رمز عبور. لطفاً دوباره تلاش کنید.'
      }
    }
  }

  // دریافت کاربر فعلی
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        // اگر session وجود ندارد، خطا ندهیم
        if (error.message.includes('Auth session missing') || error.message.includes('Invalid JWT')) {
          return null
        }
        console.error('Error getting current user:', error)
        return null
      }

      return user
    } catch (error) {
      // خطاهای شبکه یا CORS را نادیده بگیریم
      if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('CORS'))) {
        return null
      }
      console.error('Error getting current user:', error)
      return null
    }
  }

  // دریافت session فعلی
  static async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        // اگر session وجود ندارد، خطا ندهیم
        if (error.message.includes('Auth session missing') || error.message.includes('Invalid JWT')) {
          return null
        }
        console.error('Error getting current session:', error)
        return null
      }

      return session
    } catch (error) {
      // خطاهای شبکه یا CORS را نادیده بگیریم
      if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('CORS'))) {
        return null
      }
      console.error('Error getting current session:', error)
      return null
    }
  }

  // بررسی وضعیت احراز هویت
  static async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user !== null
  }

  // ورود با گوگل
  static async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        }
      })

      if (error) {
        return {
          success: false,
          error: this.getErrorMessage(error)
        }
      }

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: 'خطا در ورود با گوگل. لطفاً دوباره تلاش کنید.'
      }
    }
  }



  // تبدیل خطاهای Supabase به پیام‌های فارسی
  private static getErrorMessage(error: AuthError): string {
    console.log('Auth error details:', {
      message: error.message,
      status: error.status,
      name: error.name
    })

    switch (error.message) {
      case 'Invalid login credentials':
        return 'ایمیل یا رمز عبور اشتباه است'
      case 'Email not confirmed':
        return 'ایمیل شما تایید نشده است. لطفاً ایمیل خود را بررسی کنید'
      case 'User already registered':
        return 'این ایمیل قبلاً ثبت‌نام شده است'
      case 'Password should be at least 6 characters':
        return 'رمز عبور باید حداقل 6 کاراکتر باشد'
      case 'Unable to validate email address: invalid format':
        return 'فرمت ایمیل نامعتبر است'
      case 'Signup is disabled':
        return 'ثبت‌نام غیرفعال است'
      case 'Too many requests':
        return 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید'
      case 'User not found':
        return 'کاربری با این ایمیل یافت نشد'
      case 'Invalid email or password':
        return 'ایمیل یا رمز عبور اشتباه است'
      case 'Email not confirmed':
        return 'ایمیل شما تایید نشده است. لطفاً ایمیل خود را بررسی کنید'
      case 'Account not found':
        return 'حساب کاربری یافت نشد'
      case 'Invalid email':
        return 'ایمیل نامعتبر است'
      case 'Invalid password':
        return 'رمز عبور نامعتبر است'
      default:
        // بررسی خطاهای 400
        if (error.status === 400) {
          if (error.message.includes('Invalid login credentials')) {
            return 'ایمیل یا رمز عبور اشتباه است'
          }
          if (error.message.includes('Email not confirmed')) {
            return 'ایمیل شما تایید نشده است. لطفاً ایمیل خود را بررسی کنید'
          }
          return 'اطلاعات ورود نامعتبر است'
        }
        return error.message || 'خطای نامشخص رخ داده است'
    }
  }
}

// Hook برای گوش دادن به تغییرات احراز هویت
export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback)
} 