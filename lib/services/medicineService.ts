import { supabase } from '../supabase/client'

// Matches the ENUM types in the database
export type MedicationType = 'tablet' | 'capsule' | 'liquid' | 'injection' | 'inhaler' | 'cream' | 'drops' | 'suppository';
export type DosageForm = 'mg' | 'mcg' | 'ml' | 'units' | 'puffs' | 'drops' | 'tablets' | 'capsules';

// Interface matching the 'medications' table schema
export interface Medicine {
  id?: string
  patient_id: string
  name: string
  medication_type: MedicationType
  dosage_form: DosageForm
  strength?: number
  strength_unit?: string
  instructions?: string
  image_url?: string
  quantity?: number; // Added quantity
  expiration_date?: string; // Added expiration_date
  is_active: boolean
  created_by: string
  created_at?: string
  updated_at?: string
}

// Interface for form data when creating a new medicine
export interface MedicineFormData {
  name: string
  medication_type: MedicationType
  dosage_form: DosageForm
  strength?: number
  strength_unit?: string
  instructions?: string
  quantity?: number; // Added quantity
  expiration_date?: string; // Added expiration_date
}

export class MedicineService {

  /**
   * Finds the patient ID associated with a user. 
   * This assumes a user has one primary patient profile they manage.
   */
  static async getPatientIdForUser(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('id')
        .eq('created_by', userId)
        .limit(1)
        .single() // Expects a single patient profile for the user

      if (error) {
        console.error('Error fetching patient for user:', error)
        if (error.code === 'PGRST116') return null // No patient found, not an error
        throw error
      }

      return data?.id || null
    } catch (error) {
      console.error('Error in getPatientIdForUser:', error)
      throw error
    }
  }

  // Get all medicines for a specific patient
  static async getMedicines(patientId: string): Promise<Medicine[]> {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching medicines:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in getMedicines:', error)
      throw error
    }
  }

  // Add a new medicine for a patient
  static async addMedicine(patientId: string, userId: string, medicineData: MedicineFormData): Promise<Medicine> {
    try {
      const { data, error } = await supabase
        .from('medications')
        .insert([
          {
            patient_id: patientId,
            created_by: userId,
            ...medicineData,
            is_active: true
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error adding medicine:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in addMedicine:', error)
      throw error
    }
  }

  // Update a medicine
  static async updateMedicine(medicineId: string, medicineData: Partial<MedicineFormData>): Promise<Medicine> {
    try {
      const { data, error } = await supabase
        .from('medications')
        .update({
          ...medicineData,
          updated_at: new Date().toISOString()
        })
        .eq('id', medicineId)
        .select()
        .single()

      if (error) {
        console.error('Error updating medicine:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in updateMedicine:', error)
      throw error
    }
  }

  // Soft delete a medicine
  static async deleteMedicine(medicineId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('medications')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', medicineId)

      if (error) {
        console.error('Error deleting medicine:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in deleteMedicine:', error)
      throw error
    }
  }
}
