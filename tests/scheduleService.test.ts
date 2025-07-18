import { ScheduleService } from '../lib/services/scheduleService';
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

describe('ScheduleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a schedule', async () => {
    const mockSchedule = { id: '1', medication_id: 'med1', patient_id: 'pat1', dosage: 1, frequency_type: 'daily', start_date: '2023-01-01', time_slots: ['08:00'], created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockSchedule, error: null }),
    });

    const result = await ScheduleService.createSchedule('user1', { medication_id: 'med1', patient_id: 'pat1', dosage: 1, frequency_type: 'daily', start_date: '2023-01-01', time_slots: ['08:00'] });
    expect(result).toEqual(mockSchedule);
    expect(supabase.from).toHaveBeenCalledWith('medication_schedules');
  });

  it('should get schedules for a patient', async () => {
    const mockSchedules = [{ id: '1', medication_id: 'med1', patient_id: 'pat1', dosage: 1, frequency_type: 'daily', start_date: '2023-01-01', time_slots: ['08:00'], created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockSchedules, error: null }),
    });

    const result = await ScheduleService.getSchedules('pat1');
    expect(result).toEqual(mockSchedules);
    expect(supabase.from).toHaveBeenCalledWith('medication_schedules');
  });

  it('should log medication intake', async () => {
    const mockIntake = { id: '1', schedule_id: 'sch1', patient_id: 'pat1', scheduled_time: '2023-01-01T08:00:00Z', status: 'taken' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockIntake, error: null }),
    });

    const result = await ScheduleService.logIntake({ schedule_id: 'sch1', patient_id: 'pat1', scheduled_time: '2023-01-01T08:00:00Z', status: 'taken' });
    expect(result).toEqual(mockIntake);
    expect(supabase.from).toHaveBeenCalledWith('medication_intake');
  });

  it('should get intake history for a patient', async () => {
    const mockIntakeHistory = [{ id: '1', schedule_id: 'sch1', patient_id: 'pat1', scheduled_time: '2023-01-01T08:00:00Z', status: 'taken' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockIntakeHistory, error: null }),
    });

    const result = await ScheduleService.getIntakeHistory('pat1');
    expect(result).toEqual(mockIntakeHistory);
    expect(supabase.from).toHaveBeenCalledWith('medication_intake');
  });
});
