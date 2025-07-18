import { supabase } from '../supabase/client';

export interface Notification {
  id?: string;
  profile_id: string;
  notification_type: 'medication_reminder' | 'appointment_reminder' | 'family_invitation' | 'share_request' | 'system_notification' | 'emergency_alert';
  title: string;
  message: string;
  related_patient_id?: string | null;
  related_family_id?: string | null;
  invitation_id?: string | null;
  is_read: boolean;
  read_at?: string | null;
  created_at?: string;
}

export class NotificationService {
  static async getNotifications(profileId: string): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('sharing_notifications')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('sharing_notifications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  static async createNotification(notificationData: Omit<Notification, 'id' | 'created_at' | 'is_read' | 'read_at'>): Promise<Notification> {
    try {
      const { data, error } = await supabase
        .from('sharing_notifications')
        .insert([{ ...notificationData, is_read: false }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
}
