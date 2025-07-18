import { supabase } from '../supabase/client';

export interface ChatMessage {
  id?: string;
  family_id: string;
  sender_profile_id: string;
  message: string;
  created_at?: string;
  profiles?: { // Joined profile data for sender
    full_name: string;
    avatar_url: string;
  } | null;
}

export class ChatService {
  static async getFamilyMessages(familyId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('family_chat')
        .select('*, profiles(full_name, avatar_url)')
        .eq('family_id', familyId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ChatMessage[];
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  }

  static async sendMessage(familyId: string, senderProfileId: string, message: string): Promise<ChatMessage> {
    try {
      const { data, error } = await supabase
        .from('family_chat')
        .insert([
          {
            family_id: familyId,
            sender_profile_id: senderProfileId,
            message: message,
          }
        ])
        .select('*, profiles(full_name, avatar_url)')
        .single();

      if (error) throw error;
      return data as ChatMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  static subscribeToFamilyChat(familyId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel(`family_chat:${familyId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'family_chat', filter: `family_id=eq.${familyId}` }, payload => {
        callback(payload.new);
      })
      .subscribe();

    return subscription;
  }
}
