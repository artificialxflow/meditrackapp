import { supabase } from '../supabase/client'

// Interface matching the 'patients' table schema
export interface Patient {
  id?: string
  family_id?: string | null
  full_name: string
  date_of_birth?: string | null
  gender?: 'male' | 'female' | 'other' | null
  avatar_url?: string | null
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | null
  height_cm?: number | null
  weight_kg?: number | null
  notes?: string | null
  is_active?: boolean
  created_by: string
  created_at?: string
  updated_at?: string
}

// Interface for form data when creating or updating a patient
export interface PatientFormData {
  full_name: string
  date_of_birth?: string | null
  gender?: 'male' | 'female' | 'other' | null
  avatar_url?: string | null
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | null
}

export class PatientService {

  // Get all patients created by a specific user
  static async getPatients(userId: string): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('created_by', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching patients:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getPatients:', error)
      throw error
    }
  }

  // Get a single patient by ID
  static async getPatientById(patientId: string): Promise<Patient | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching patient by ID:', error)
        throw error
      }

      return data || null
    } catch (error) {
      console.error('Error in getPatientById:', error)
      throw error
    }
  }

  // Add a new patient for a user
  static async addPatient(userId: string, patientData: PatientFormData): Promise<Patient> {
    try {
      // Validate and format date if provided
      let formattedData = { ...patientData }
      if (patientData.date_of_birth) {
        // Ensure date is in YYYY-MM-DD format
        const date = new Date(patientData.date_of_birth)
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format')
        }
        formattedData.date_of_birth = date.toISOString().split('T')[0]
      }

      const { data, error } = await supabase
        .from('patients')
        .insert([
          {
            created_by: userId,
            ...formattedData,
            is_active: true
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error adding patient:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in addPatient:', error)
      throw error
    }
  }

  // Update a patient's information
  static async updatePatient(patientId: string, patientData: Partial<PatientFormData>): Promise<Patient> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({
          ...patientData,
          updated_at: new Date().toISOString()
        })
        .eq('id', patientId)
        .select()
        .single()

      if (error) {
        console.error('Error updating patient:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in updatePatient:', error)
      throw error
    }
  }

  // Soft delete a patient
  static async deletePatient(patientId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('patients')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', patientId)

      if (error) {
        console.error('Error deleting patient:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in deletePatient:', error)
      throw error
    }
  }

  // Share a patient profile with another user
  static async sharePatient(patientId: string, sharedWithProfileId: string, sharedByProfileId: string, permissionLevel: 'view_only' | 'edit_access' | 'full_access'): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('patient_shares')
        .insert([
          {
            patient_id: patientId,
            shared_with_profile_id: sharedWithProfileId,
            shared_by_profile_id: sharedByProfileId,
            permission_level: permissionLevel,
            is_active: true
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sharing patient:', error);
      throw error;
    }
  }
}
