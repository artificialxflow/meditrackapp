import { ChatService } from '../lib/services/chatService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn(),
      })),
    })),
  },
}));

describe('ChatService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get family messages', async () => {
    const mockMessages = [{ id: '1', family_id: 'fam1', sender_profile_id: 'user1', message: 'Hello', created_at: '2023-01-01T10:00:00Z' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockMessages, error: null }),
    });

    const result = await ChatService.getFamilyMessages('fam1');
    expect(result).toEqual(mockMessages);
    expect(supabase.from).toHaveBeenCalledWith('family_chat');
  });

  it('should send a message', async () => {
    const mockMessage = { id: '1', family_id: 'fam1', sender_profile_id: 'user1', message: 'Test message', created_at: '2023-01-01T10:00:00Z' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockMessage, error: null }),
    });

    const result = await ChatService.sendMessage('fam1', 'user1', 'Test message');
    expect(result).toEqual(mockMessage);
    expect(supabase.from).toHaveBeenCalledWith('family_chat');
  });

  it('should subscribe to family chat', () => {
    const mockCallback = jest.fn();
    const mockChannel = {
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn(),
      })),
    };
    (supabase.channel as jest.Mock).mockReturnValue(mockChannel);

    const subscription = ChatService.subscribeToFamilyChat('fam1', mockCallback);
    expect(supabase.channel).toHaveBeenCalledWith('family_chat:fam1');
    expect(mockChannel.on).toHaveBeenCalledWith('postgres_changes', expect.any(Object), expect.any(Function));
    expect(mockChannel.subscribe).toHaveBeenCalled();
    expect(subscription).toBeDefined();
  });
});
