import { supabase } from '../supabase/client'

export interface Medicine {
  id?: string
  user_id: string
  name: string
  generic_name?: string
  dosage_form: string
  strength: string
  manufacturer?: string
  description?: string
  instructions?: string
  side_effects?: string
  interactions?: string
  storage_conditions?: string
  prescription_required: boolean
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface MedicineFormData {
  name: string
  generic_name?: string
  dosage_form: string
  strength: string
  manufacturer?: string
  description?: string
  instructions?: string
  side_effects?: string
  interactions?: string
  storage_conditions?: string
  prescription_required: boolean
}

export class MedicineService {
  // دریافت تمام داروهای کاربر
  static async getMedicines(userId: string): Promise<Medicine[]> {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('user_id', userId)
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

  // اضافه کردن داروی جدید
  static async addMedicine(userId: string, medicineData: MedicineFormData): Promise<Medicine> {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .insert([
          {
            user_id: userId,
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

  // به‌روزرسانی دارو
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

  // حذف دارو (soft delete)
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

  // جستجو در داروها
  static async searchMedicines(userId: string, searchTerm: string): Promise<Medicine[]> {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .or(`name.ilike.%${searchTerm}%,generic_name.ilike.%${searchTerm}%,manufacturer.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching medicines:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in searchMedicines:', error)
      throw error
    }
  }

  // فیلتر کردن داروها
  static async filterMedicines(
    userId: string, 
    filters: {
      dosage_form?: string
      prescription_required?: boolean
      manufacturer?: string
    }
  ): Promise<Medicine[]> {
    try {
      let query = supabase
        .from('medicines')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)

      if (filters.dosage_form) {
        query = query.eq('dosage_form', filters.dosage_form)
      }

      if (filters.prescription_required !== undefined) {
        query = query.eq('prescription_required', filters.prescription_required)
      }

      if (filters.manufacturer) {
        query = query.ilike('manufacturer', `%${filters.manufacturer}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error filtering medicines:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in filterMedicines:', error)
      throw error
    }
  }
} 