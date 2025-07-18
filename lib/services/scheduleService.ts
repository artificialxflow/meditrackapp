import { supabase } from '../supabase/client';

// Interfaces for scheduling data
export interface Schedule {
  id?: string;
  medication_id: string;
  patient_id: string;
  dosage: number;
  frequency_type: 'daily' | 'weekly' | 'custom';
  start_date: string;
  end_date?: string | null;
  time_slots: string[]; // e.g., ['08:00', '20:00']
  is_active: boolean;
  created_by: string;
}

export interface Intake {
  id?: string;
  schedule_id: string;
  patient_id: string;
  scheduled_time: string;
  taken_time?: string | null;
  status: 'scheduled' | 'taken' | 'missed' | 'skipped';
}

export class ScheduleService {

  // Create a new schedule for a medication
  static async createSchedule(userId: string, scheduleData: Omit<Schedule, 'created_by' | 'is_active'>): Promise<Schedule> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .insert([{ ...scheduleData, created_by: userId, is_active: true }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  }

  // Get all schedules for a patient
  static async getSchedules(patientId: string): Promise<Schedule[]> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .select('*')
        .eq('patient_id', patientId)
        .eq('is_active', true);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  }

  // Log a medication intake
  static async logIntake(intakeData: Omit<Intake, 'status'> & { status: 'taken' | 'missed' | 'skipped' }): Promise<Intake> {
    try {
      const { data, error } = await supabase
        .from('medication_intake')
        .insert([intakeData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging intake:', error);
      throw error;
    }
  }

  // Get all intake logs for a patient
  static async getIntakeHistory(patientId: string): Promise<Intake[]> {
    try {
      const { data, error } = await supabase
        .from('medication_intake')
        .select('*')
        .eq('patient_id', patientId)
        .order('scheduled_time', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching intake history:', error);
      throw error;
    }
  }
}
