import { supabase } from '../supabase/client';

// Interface for vitals data
export interface Vital {
  id?: string;
  patient_id: string;
  vital_type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'height' | 'blood_sugar' | 'oxygen_saturation' | 'pain_level';
  value: number;
  unit?: string | null;
  measured_at: string;
  created_by: string;
}

export class VitalsService {

  // Create a new vital sign entry
  static async createVital(userId: string, vitalData: Omit<Vital, 'created_by'>): Promise<Vital> {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .insert([{ ...vitalData, created_by: userId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating vital:', error);
      throw error;
    }
  }

  // Get all vitals for a patient
  static async getVitals(patientId: string): Promise<Vital[]> {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .eq('patient_id', patientId)
        .order('measured_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching vitals:', error);
      throw error;
    }
  }
}
