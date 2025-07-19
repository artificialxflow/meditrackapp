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
  status?: 'pending' | 'taken' | 'missed' | 'skipped'; // وضعیت مصرف
  last_taken?: string | null; // آخرین زمان مصرف
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
      console.log('Creating schedule with data:', scheduleData);
      
      // بررسی وجود دارو در جدول medicines
      const { data: medicineData, error: medicineError } = await supabase
        .from('medicines')
        .select('id')
        .eq('id', scheduleData.medication_id)
        .single();
      
      if (medicineError || !medicineData) {
        console.error('Medicine not found:', scheduleData.medication_id);
        throw new Error(`دارو با شناسه ${scheduleData.medication_id} یافت نشد`);
      }
      
      const { data, error } = await supabase
        .from('medication_schedules')
        .insert([{ ...scheduleData, created_by: userId, is_active: true }])
        .select()
        .single();

      if (error) {
        console.error('Error creating schedule:', error);
        throw error;
      }
      
      console.log('Schedule created successfully:', data);
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

  // Update a schedule
  static async updateSchedule(scheduleId: string, scheduleData: Partial<Omit<Schedule, 'created_by' | 'is_active'>>): Promise<Schedule> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .update({ ...scheduleData, updated_at: new Date().toISOString() })
        .eq('id', scheduleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  }

  // Delete a schedule (soft delete)
  static async deleteSchedule(scheduleId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('medication_schedules')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', scheduleId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting schedule:', error);
      throw error;
    }
  }

  // Mark medication as taken
  static async markAsTaken(scheduleId: string): Promise<Schedule> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .update({ 
          status: 'taken',
          last_taken: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', scheduleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking as taken:', error);
      throw error;
    }
  }

  // Mark medication as missed
  static async markAsMissed(scheduleId: string): Promise<Schedule> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .update({ 
          status: 'missed',
          updated_at: new Date().toISOString()
        })
        .eq('id', scheduleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking as missed:', error);
      throw error;
    }
  }

  // Reset schedule status to pending
  static async resetStatus(scheduleId: string): Promise<Schedule> {
    try {
      const { data, error } = await supabase
        .from('medication_schedules')
        .update({ 
          status: 'pending',
          last_taken: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', scheduleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error resetting status:', error);
      throw error;
    }
  }
}
