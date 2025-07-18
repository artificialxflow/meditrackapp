import { supabase } from '../supabase/client';

// Interface for appointment data
export interface Appointment {
  id?: string;
  patient_id: string;
  title: string;
  doctor_name?: string | null;
  appointment_datetime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string | null;
  reminder_minutes?: number | null; // Added reminder_minutes
  created_by: string;
}

export class AppointmentService {

  // Create a new appointment
  static async createAppointment(userId: string, appointmentData: Omit<Appointment, 'created_by'>): Promise<Appointment> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ ...appointmentData, created_by: userId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  // Get all appointments for a patient
  static async getAppointments(patientId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId)
        .order('appointment_datetime', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }
}