import { supabase } from '../supabase/client';

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  category_type: 'medication' | 'appointment' | 'document';
  created_by?: string;
  created_at?: string;
}

export class CategoryService {
  static async getCategories(type: 'medication' | 'appointment' | 'document'): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('category_type', type);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}
