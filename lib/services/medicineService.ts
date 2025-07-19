import { supabase } from '../supabase/client'

// Matches the ENUM types in the database
export type MedicationType = 'tablet' | 'capsule' | 'liquid' | 'injection' | 'inhaler' | 'cream' | 'drops' | 'suppository';
export type DosageForm = 'mg' | 'mcg' | 'ml' | 'units' | 'puffs' | 'drops' | 'tablets' | 'capsules';

// Interface matching the 'medicines' table schema
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
  quantity?: number
  expiration_date?: string
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
  image_file?: File; // Added image file
  image_url?: string; // Added image URL
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
        .maybeSingle() // Use maybeSingle instead of single

      if (error) {
        console.error('Error fetching patient for user:', error)
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
        .from('medicines')
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

  // Get a specific medicine by ID
  static async getMedicineById(medicineId: string): Promise<Medicine | null> {
    try {
      console.log('Fetching medicine by ID:', medicineId);
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('id', medicineId)
        .eq('is_active', true)
        .single()

      if (error) {
        console.error('Error fetching medicine by ID:', error)
        throw error
      }

      console.log('Found medicine:', data);
      return data
    } catch (error) {
      console.error('Error in getMedicineById:', error)
      return null
    }
  }

  // Add a new medicine for a patient
  static async addMedicine(patientId: string, userId: string, medicineData: MedicineFormData): Promise<Medicine> {
    try {
      let imageUrl = null;

      // آپلود عکس اگر وجود داشته باشد
      if (medicineData.image_file) {
        const fileName = `medicines/${patientId}/${Date.now()}_${medicineData.image_file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('medicine-images')
          .upload(fileName, medicineData.image_file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw uploadError;
        }

        // دریافت URL عمومی عکس
        const { data: urlData } = supabase.storage
          .from('medicine-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      // Clean up the data - convert empty strings to null for date fields
      const cleanedData = {
        ...medicineData,
        expiration_date: medicineData.expiration_date && medicineData.expiration_date.trim() !== '' 
          ? medicineData.expiration_date 
          : null,
        image_url: imageUrl || medicineData.image_url || null
      }

      const { data, error } = await supabase
        .from('medicines')
        .insert([
          {
            patient_id: patientId,
            created_by: userId,
            ...cleanedData,
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
        .from('medicines')
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
        .from('medicines')
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
