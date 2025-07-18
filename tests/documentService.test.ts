import { DocumentService } from '../lib/services/documentService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
      })),
    },
  },
}));

describe('DocumentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload a file', async () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const mockPublicUrl = 'http://example.com/test.png';

    (supabase.storage.from as jest.Mock).mockReturnValue({
      upload: jest.fn().mockResolvedValue({ error: null }),
      getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: mockPublicUrl } }),
    });

    const result = await DocumentService.uploadFile(mockFile);
    expect(result).toBe(mockPublicUrl);
    expect(supabase.storage.from).toHaveBeenCalledWith('documents');
    expect(supabase.storage.from().upload).toHaveBeenCalledWith(expect.any(String), mockFile);
  });

  it('should create a document', async () => {
    const mockDocument = { id: '1', patient_id: 'pat1', title: 'Lab Result', document_type: 'lab_result', file_url: 'http://example.com/doc1.pdf', created_by: 'user1' };
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockDocument, error: null }),
    });

    const result = await DocumentService.createDocument('user1', { patient_id: 'pat1', title: 'Lab Result', document_type: 'lab_result', file_url: 'http://example.com/doc1.pdf' });
    expect(result).toEqual(mockDocument);
    expect(supabase.from).toHaveBeenCalledWith('documents');
  });

  it('should get documents for a patient', async () => {
    const mockDocuments = [{ id: '1', patient_id: 'pat1', title: 'Lab Result', document_type: 'lab_result', file_url: 'http://example.com/doc1.pdf', created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockDocuments, error: null }),
    });

    const result = await DocumentService.getDocuments('pat1');
    expect(result).toEqual(mockDocuments);
    expect(supabase.from).toHaveBeenCalledWith('documents');
  });

  it('should search documents for a patient', async () => {
    const mockDocuments = [{ id: '1', patient_id: 'pat1', title: 'Lab Result', document_type: 'lab_result', file_url: 'http://example.com/doc1.pdf', created_by: 'user1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockDocuments, error: null }),
    });

    const result = await DocumentService.searchDocuments('pat1', 'Lab');
    expect(result).toEqual(mockDocuments);
    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(supabase.from().ilike).toHaveBeenCalledWith('title', '%Lab%');
  });

  it('should filter documents by category for a patient', async () => {
    const mockDocuments = [{ id: '1', patient_id: 'pat1', title: 'Lab Result', document_type: 'lab_result', file_url: 'http://example.com/doc1.pdf', created_by: 'user1', category_id: 'cat1' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockDocuments, error: null }),
    });

    const result = await DocumentService.filterDocumentsByCategory('pat1', 'cat1');
    expect(result).toEqual(mockDocuments);
    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(supabase.from().eq).toHaveBeenCalledWith('category_id', 'cat1');
  });
});
