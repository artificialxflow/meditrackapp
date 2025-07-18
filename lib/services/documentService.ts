import { supabase } from '../supabase/client';

// Interface for document data
export interface Document {
  id?: string;
  patient_id: string;
  title: string;
  document_type: 'prescription' | 'lab_result' | 'imaging' | 'medical_report' | 'insurance_card' | 'id_card' | 'other';
  file_url: string;
  document_date?: string | null;
  category_id?: string | null; // Added category_id
  created_by: string;
}

export class DocumentService {

  // Upload a file to Supabase Storage
  static async uploadFile(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Create a new document entry
  static async createDocument(userId: string, documentData: Omit<Document, 'created_by'>): Promise<Document> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{ ...documentData, created_by: userId }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Get all documents for a patient
  static async getDocuments(patientId: string): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  // Search documents for a patient
  static async searchDocuments(patientId: string, searchTerm: string): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('patient_id', patientId)
        .ilike('title', `%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  // Filter documents by category for a patient
  static async filterDocumentsByCategory(patientId: string, categoryId: string): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('patient_id', patientId)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error filtering documents by category:', error);
      throw error;
    }
  }
}