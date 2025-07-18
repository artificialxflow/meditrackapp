import { VitalsService } from '../lib/services/vitalsService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}));

describe('VitalsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a vital entry', async () => {
    const mockVital = { id: '1', patient_id: 'pat1', vital_type: 'heart_rate', value: 70, created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockVital, error: null }),
    });

    const result = await VitalsService.createVital('user1', { patient_id: 'pat1', vital_type: 'heart_rate', value: 70, measured_at: '2023-01-01T10:00:00Z' });
    expect(result).toEqual(mockVital);
    expect(supabase.from).toHaveBeenCalledWith('vitals');
  });

  it('should get vitals for a patient', async () => {
    const mockVitals = [{ id: '1', patient_id: 'pat1', vital_type: 'heart_rate', value: 70, created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockVitals, error: null }),
    });

    const result = await VitalsService.getVitals('pat1');
    expect(result).toEqual(mockVitals);
    expect(supabase.from).toHaveBeenCalledWith('vitals');
  });
});
