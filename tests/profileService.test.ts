import { ProfileService } from '../lib/services/profileService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
      })),
    },
  },
}));

describe('ProfileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a profile', async () => {
    const mockProfile = { id: 'user1', full_name: 'Updated Name' };
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
    });

    const result = await ProfileService.updateProfile('user1', { full_name: 'Updated Name' });
    expect(result).toEqual(mockProfile);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });

  it('should upload an avatar', async () => {
    const mockFile = new File([''], 'avatar.png', { type: 'image/png' });
    const mockPublicUrl = 'http://example.com/avatar.png';

    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: null }),
      getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: mockPublicUrl } }),
    });

    const result = await ProfileService.uploadAvatar('user1', mockFile);
    expect(result).toBe(mockPublicUrl);
    expect(supabase.storage.from).toHaveBeenCalledWith('avatars');
    expect(supabase.storage.from().upload).toHaveBeenCalledWith(expect.any(String), mockFile);
  });
});
