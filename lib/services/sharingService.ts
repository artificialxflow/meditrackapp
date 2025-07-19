import { supabase } from '../supabase/client'

export interface PatientShare {
  id?: string
  patient_id: string
  shared_by: string
  shared_with?: string
  share_token: string
  permissions: string[]
  expires_at?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateShareData {
  patient_id: string
  shared_with_email?: string
  permissions?: string[]
  expires_at?: string
}

export class SharingService {
  // ایجاد اشتراک جدید
  static async createShare(userId: string, shareData: CreateShareData): Promise<PatientShare> {
    try {
      // ایجاد token منحصر به فرد
      const shareToken = this.generateToken()
      
      // اگر email داده شده، کاربر را پیدا کن
      let sharedWithUserId = null
      if (shareData.shared_with_email) {
        const { data: userData } = await supabase.auth.admin.listUsers()
        const targetUser = userData.users.find(user => user.email === shareData.shared_with_email)
        sharedWithUserId = targetUser?.id || null
      }

      const { data, error } = await supabase
        .from('patient_shares')
        .insert([
          {
            patient_id: shareData.patient_id,
            shared_by: userId,
            shared_with: sharedWithUserId,
            share_token: shareToken,
            permissions: shareData.permissions || ['view'],
            expires_at: shareData.expires_at || null,
            is_active: true
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating share:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in createShare:', error)
      throw error
    }
  }

  // دریافت اشتراک‌های یک بیمار
  static async getPatientShares(patientId: string): Promise<PatientShare[]> {
    try {
      const { data, error } = await supabase
        .from('patient_shares')
        .select('*')
        .eq('patient_id', patientId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching patient shares:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getPatientShares:', error)
      throw error
    }
  }

  // دریافت اشتراک‌های کاربر
  static async getUserShares(userId: string): Promise<PatientShare[]> {
    try {
      const { data, error } = await supabase
        .from('patient_shares')
        .select(`
          *,
          patients (
            id,
            full_name,
            gender
          )
        `)
        .or(`shared_by.eq.${userId},shared_with.eq.${userId}`)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user shares:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getUserShares:', error)
      throw error
    }
  }

  // بررسی دسترسی با token
  static async validateShareToken(token: string): Promise<{ patient_id: string; permissions: string[] } | null> {
    try {
      const { data, error } = await supabase
        .from('patient_shares')
        .select('patient_id, permissions')
        .eq('share_token', token)
        .eq('is_active', true)
        .is('expires_at', null)
        .or('expires_at.gt.' + new Date().toISOString())
        .single()

      if (error) {
        console.error('Error validating share token:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in validateShareToken:', error)
      return null
    }
  }

  // حذف اشتراک
  static async deleteShare(shareId: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('patient_shares')
        .update({ is_active: false })
        .eq('id', shareId)
        .eq('shared_by', userId)

      if (error) {
        console.error('Error deleting share:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in deleteShare:', error)
      throw error
    }
  }

  // تولید token منحصر به فرد
  private static generateToken(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  // تولید لینک اشتراک
  static generateShareLink(token: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/shared/${token}`
  }

  // کپی کردن لینک به clipboard
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        return true
      } else {
        // Fallback برای مرورگرهای قدیمی
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      return false
    }
  }
} 