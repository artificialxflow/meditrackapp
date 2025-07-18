import { useState, useEffect } from 'react';
import { Document, DocumentService } from '@/lib/services/documentService';
import { CategoryService, Category } from '@/lib/services/categoryService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddDocumentModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Document, 'created_by' | 'file_url'> & { file: File }) => void;
  patientId: string;
}

export default function AddDocumentModal({ show, onHide, onSubmit, patientId }: AddDocumentModalProps) {
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState<'prescription' | 'lab_result' | 'imaging'>('prescription');
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docsCategories = await CategoryService.getCategories('document');
        setCategories(docsCategories);
        if (docsCategories.length > 0) {
          setSelectedCategory(docsCategories[0].id);
        }
      } catch (error) {
        console.error('Error fetching document categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const file_url = await DocumentService.uploadFile(file);
    onSubmit({ patient_id: patientId, title, document_type: documentType, file_url, file, category_id: selectedCategory });
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Document</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Document Type</label>
                <Select value={documentType} onChange={(e) => setDocumentType(e.target.value as any)}>
                  <option value="prescription">Prescription</option>
                  <option value="lab_result">Lab Result</option>
                  <option value="imaging">Imaging</option>
                  <option value="medical_report">Medical Report</option>
                  <option value="insurance_card">Insurance Card</option>
                  <option value="id_card">ID Card</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <Select value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <label className="form-label">File</label>
                <Input type="file" onChange={handleFileChange} required />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Add Document</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}