import { AppointmentService } from '../lib/services/appointmentService';
import { supabase } from '../lib/supabase/client';

// Mock supabase client
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

describe('AppointmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an appointment', async () => {
    const mockAppointment = { id: '1', patient_id: 'pat1', title: 'Checkup', appointment_datetime: '2023-01-01T10:00:00Z', status: 'scheduled', created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockAppointment, error: null }),
    });

    const result = await AppointmentService.createAppointment('user1', { patient_id: 'pat1', title: 'Checkup', appointment_datetime: '2023-01-01T10:00:00Z', status: 'scheduled' });
    expect(result).toEqual(mockAppointment);
    expect(supabase.from).toHaveBeenCalledWith('appointments');
  });

  it('should get appointments for a patient', async () => {
    const mockAppointments = [{ id: '1', patient_id: 'pat1', title: 'Checkup', appointment_datetime: '2023-01-01T10:00:00Z', status: 'scheduled', created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockAppointments, error: null }),
    });

    const result = await AppointmentService.getAppointments('pat1');
    expect(result).toEqual(mockAppointments);
    expect(supabase.from).toHaveBeenCalledWith('appointments');
  });
});
