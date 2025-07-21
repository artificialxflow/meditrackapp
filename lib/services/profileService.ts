import { supabase } from '../supabase/client'

export interface Profile {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  date_of_birth?: string
  gender?: string
  blood_type?: string
  timezone?: string
  notification_settings?: any
  created_at?: string
  updated_at?: string
}

export class ProfileService {
  // Get current user's profile
  static async getCurrentProfile(): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getCurrentProfile:', error)
      return null
    }
  }

  // Create or update current user's profile
  static async upsertProfile(profileData: Partial<Profile>): Promise<Profile> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email || '',
          full_name: profileData.full_name || user.user_metadata?.full_name || 'کاربر جدید',
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error upserting profile:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in upsertProfile:', error)
      throw error
    }
  }

  // Ensure current user has a profile (create if doesn't exist)
  static async ensureProfile(): Promise<Profile> {
    try {
      let profile = await this.getCurrentProfile()
      
      if (!profile) {
        profile = await this.upsertProfile({})
      }
      
      return profile
    } catch (error) {
      console.error('Error in ensureProfile:', error)
      throw error
    }
  }

  // Upload avatar for a user and return the public URL
  static async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    return urlData?.publicUrl || '';
  }
}
