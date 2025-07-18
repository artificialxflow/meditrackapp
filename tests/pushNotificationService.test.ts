import { PushNotificationService } from '../lib/services/pushNotificationService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    })),
  },
}));

describe('PushNotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log device registration', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await PushNotificationService.registerDevice('user1', 'token123', 'web');
    expect(consoleSpy).toHaveBeenCalledWith('Registering device for user user1 on web with token: token123');
    consoleSpy.mockRestore();
  });

  it('should log push notification sending', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await PushNotificationService.sendPushNotification('user1', 'Test Title', 'Test Body');
    expect(consoleSpy).toHaveBeenCalledWith('Sending push notification to user user1: Test Title - Test Body');
    consoleSpy.mockRestore();
  });

  it('should log device unregistration', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await PushNotificationService.unregisterDevice('token123');
    expect(consoleSpy).toHaveBeenCalledWith('Unregistering device with token: token123');
    consoleSpy.mockRestore();
  });
});
