import { FamilyService } from '../lib/services/familyService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}));

describe('FamilyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a family and add the creator as owner', async () => {
    const mockFamily = { id: 'fam1', name: 'Test Family', created_by: 'user1' };
    const mockFamilyMember = { id: 'fm1', family_id: 'fam1', profile_id: 'user1', role: 'owner' };

    (supabase.from as jest.Mock).mockImplementation((tableName) => {
      if (tableName === 'families') {
        return {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockFamily, error: null }),
        };
      } else if (tableName === 'family_members') {
        return {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockFamilyMember, error: null }),
        };
      }
      return {};
    });

    const result = await FamilyService.createFamily('user1', { name: 'Test Family' });
    expect(result).toEqual(mockFamily);
    expect(supabase.from).toHaveBeenCalledWith('families');
    expect(supabase.from).toHaveBeenCalledWith('family_members');
    expect(supabase.from('family_members').insert).toHaveBeenCalledWith([{ family_id: 'fam1', profile_id: 'user1', role: 'owner' }]);
  });

  it('should add a family member', async () => {
    const mockFamilyMember = { id: 'fm1', family_id: 'fam1', profile_id: 'user2', role: 'viewer' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockFamilyMember, error: null }),
    });

    const result = await FamilyService.addFamilyMember('fam1', 'user2', 'viewer');
    expect(result).toEqual(mockFamilyMember);
    expect(supabase.from).toHaveBeenCalledWith('family_members');
  });

  it('should get families for a user', async () => {
    const mockFamilies = [{ families: { id: 'fam1', name: 'Family 1' } }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockFamilies, error: null }),
    });

    const result = await FamilyService.getFamilies('user1');
    expect(result).toEqual([{ id: 'fam1', name: 'Family 1' }]);
    expect(supabase.from).toHaveBeenCalledWith('family_members');
  });

  it('should get family members', async () => {
    const mockFamilyMembers = [{ id: 'fm1', family_id: 'fam1', profile_id: 'user1', role: 'owner', profiles: { full_name: 'User One', email: 'user1@example.com' } }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockFamilyMembers, error: null }),
    });

    const result = await FamilyService.getFamilyMembers('fam1');
    expect(result).toEqual(mockFamilyMembers);
    expect(supabase.from).toHaveBeenCalledWith('family_members');
  });

  it('should find a profile by email', async () => {
    const mockProfile = { id: 'user1', email: 'user1@example.com' };
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
    });

    const result = await FamilyService.findProfileByEmail('user1@example.com');
    expect(result).toEqual(mockProfile);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });

  it('should invite a family member', async () => {
    const mockInvitation = { id: 'inv1', invited_email: 'new@example.com' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockInvitation, error: null }),
    });

    const result = await FamilyService.inviteFamilyMember('fam1', 'new@example.com', 'user1');
    expect(result).toEqual(mockInvitation);
    expect(supabase.from).toHaveBeenCalledWith('sharing_invitations');
  });

  it('should update a family member role', async () => {
    const mockUpdatedMember = { id: 'fm1', family_id: 'fam1', profile_id: 'user2', role: 'admin' };
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUpdatedMember, error: null }),
    });

    const result = await FamilyService.updateFamilyMemberRole('fm1', 'admin');
    expect(result).toEqual(mockUpdatedMember);
    expect(supabase.from).toHaveBeenCalledWith('family_members');
  });
});
