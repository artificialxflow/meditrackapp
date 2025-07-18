import { NotificationService } from '../lib/services/notificationService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}));

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get notifications for a profile', async () => {
    const mockNotifications = [{ id: '1', profile_id: 'user1', title: 'Test Notif', message: 'Hello', is_read: false }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockNotifications, error: null }),
    });

    const result = await NotificationService.getNotifications('user1');
    expect(result).toEqual(mockNotifications);
    expect(supabase.from).toHaveBeenCalledWith('sharing_notifications');
  });

  it('should mark a notification as read', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    await NotificationService.markAsRead('1');
    expect(supabase.from).toHaveBeenCalledWith('sharing_notifications');
    expect(supabase.from().update).toHaveBeenCalledWith({ is_read: true, read_at: expect.any(String) });
  });

  it('should create a notification', async () => {
    const mockNotification = { id: '1', profile_id: 'user1', title: 'New Notif', message: 'Test', is_read: false };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockNotification, error: null }),
    });

    const result = await NotificationService.createNotification({ profile_id: 'user1', notification_type: 'system_notification', title: 'New Notif', message: 'Test' });
    expect(result).toEqual(mockNotification);
    expect(supabase.from).toHaveBeenCalledWith('sharing_notifications');
  });
});
