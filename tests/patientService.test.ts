import { PatientService } from '../lib/services/patientService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}));

describe('PatientService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get patients for a user', async () => {
    const mockPatients = [{ id: '1', full_name: 'Patient 1', created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockPatients, error: null }),
    });

    const result = await PatientService.getPatients('user1');
    expect(result).toEqual(mockPatients);
    expect(supabase.from).toHaveBeenCalledWith('patients');
  });

  it('should get a patient by ID', async () => {
    const mockPatient = { id: '1', full_name: 'Patient 1', created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPatient, error: null }),
    });

    const result = await PatientService.getPatientById('1');
    expect(result).toEqual(mockPatient);
    expect(supabase.from).toHaveBeenCalledWith('patients');
  });

  it('should add a patient', async () => {
    const mockPatient = { id: '1', full_name: 'New Patient', created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPatient, error: null }),
    });

    const result = await PatientService.addPatient('user1', { full_name: 'New Patient' });
    expect(result).toEqual(mockPatient);
    expect(supabase.from).toHaveBeenCalledWith('patients');
  });

  it('should update a patient', async () => {
    const mockPatient = { id: '1', full_name: 'Updated Patient' };
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPatient, error: null }),
    });

    const result = await PatientService.updatePatient('1', { full_name: 'Updated Patient' });
    expect(result).toEqual(mockPatient);
    expect(supabase.from).toHaveBeenCalledWith('patients');
  });

  it('should soft delete a patient', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    await PatientService.deletePatient('1');
    expect(supabase.from).toHaveBeenCalledWith('patients');
    expect(supabase.from().update).toHaveBeenCalledWith({ is_active: false, updated_at: expect.any(String) });
  });

  it('should share a patient', async () => {
    const mockShare = { id: '1', patient_id: 'pat1', shared_with_profile_id: 'user2', shared_by_profile_id: 'user1', permission_level: 'view_only' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockShare, error: null }),
    });

    const result = await PatientService.sharePatient('pat1', 'user2', 'user1', 'view_only');
    expect(result).toEqual(mockShare);
    expect(supabase.from).toHaveBeenCalledWith('patient_shares');
  });
});
