import { MedicineService } from '../lib/services/medicineService';
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

describe('MedicineService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get patient ID for user', async () => {
    const mockPatient = { id: 'pat1' };
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPatient, error: null }),
    });

    const result = await MedicineService.getPatientIdForUser('user1');
    expect(result).toEqual('pat1');
    expect(supabase.from).toHaveBeenCalledWith('patients');
  });

  it('should get medicines for a patient', async () => {
    const mockMedicines = [{ id: '1', patient_id: 'pat1', name: 'Med1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockMedicines, error: null }),
    });

    const result = await MedicineService.getMedicines('pat1');
    expect(result).toEqual(mockMedicines);
    expect(supabase.from).toHaveBeenCalledWith('medications');
  });

  it('should add a medicine', async () => {
    const mockMedicine = { id: '1', patient_id: 'pat1', name: 'New Med', created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockMedicine, error: null }),
    });

    const result = await MedicineService.addMedicine('pat1', 'user1', { name: 'New Med', medication_type: 'tablet', dosage_form: 'mg' });
    expect(result).toEqual(mockMedicine);
    expect(supabase.from).toHaveBeenCalledWith('medications');
  });

  it('should update a medicine', async () => {
    const mockMedicine = { id: '1', name: 'Updated Med' };
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockMedicine, error: null }),
    });

    const result = await MedicineService.updateMedicine('1', { name: 'Updated Med' });
    expect(result).toEqual(mockMedicine);
    expect(supabase.from).toHaveBeenCalledWith('medications');
  });

  it('should soft delete a medicine', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    await MedicineService.deleteMedicine('1');
    expect(supabase.from).toHaveBeenCalledWith('medications');
    expect(supabase.from().update).toHaveBeenCalledWith({ is_active: false, updated_at: expect.any(String) });
  });
});
