import { supabase } from '../supabase/client';
import { Medication } from './medicineService';
import { Vital } from './vitalsService';
import { Intake } from './scheduleService';

export class ReportService {
  static async getMedicationHistoryReport(patientId: string): Promise<{
    medications: Medication[];
    intakeHistory: Intake[];
  }> {
    try {
      const { data: medications, error: medError } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId)
        .eq('is_active', true);

      if (medError) throw medError;

      const { data: intakeHistory, error: intakeError } = await supabase
        .from('medication_intake')
        .select('*')
        .eq('patient_id', patientId)
        .order('scheduled_time', { ascending: false });

      if (intakeError) throw intakeError;

      return { medications: medications || [], intakeHistory: intakeHistory || [] };
    } catch (error) {
      console.error('Error fetching medication history report:', error);
      throw error;
    }
  }

  static async getVitalSignsReport(patientId: string): Promise<Vital[]> {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .eq('patient_id', patientId)
        .order('measured_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching vital signs report:', error);
      throw error;
    }
  }
}
