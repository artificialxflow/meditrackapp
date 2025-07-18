import { ReportService } from '../lib/services/reportService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
    })),
  },
}));

describe('ReportService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get medication history report', async () => {
    const mockMedications = [{ id: '1', name: 'Med1' }];
    const mockIntakeHistory = [{ id: '1', status: 'taken' }];

    (supabase.from as jest.Mock).mockImplementation((tableName) => {
      if (tableName === 'medications') {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          mockResolvedValue: jest.fn().mockResolvedValue({ data: mockMedications, error: null }),
          // Mock the final return of the query
          then: jest.fn(function(cb) { return cb({ data: mockMedications, error: null }); })
        };
      } else if (tableName === 'medication_intake') {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockIntakeHistory, error: null }),
        };
      }
      return {};
    });

    const result = await ReportService.getMedicationHistoryReport('pat1');
    expect(result).toEqual({ medications: mockMedications, intakeHistory: mockIntakeHistory });
    expect(supabase.from).toHaveBeenCalledWith('medications');
    expect(supabase.from).toHaveBeenCalledWith('medication_intake');
  });

  it('should get vital signs report', async () => {
    const mockVitals = [{ id: '1', vital_type: 'heart_rate', value: 70 }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockVitals, error: null }),
    });

    const result = await ReportService.getVitalSignsReport('pat1');
    expect(result).toEqual(mockVitals);
    expect(supabase.from).toHaveBeenCalledWith('vitals');
  });
});
