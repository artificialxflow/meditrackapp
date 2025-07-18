'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DocumentService, Document } from '@/lib/services/documentService';
import { PatientService, Patient } from '@/lib/services/patientService';
import { CategoryService, Category } from '@/lib/services/categoryService';
import DocumentCard from '@/components/documents/DocumentCard';
import AddDocumentModal from '@/components/documents/AddDocumentModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');

  const fetchPatients = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await PatientService.getPatients(user.id);
      setPatients(data);
      if (data.length > 0) {
        setSelectedPatient(data[0].id!);
      }
    } catch (err) {
      setError('Failed to fetch patients.');
    }
  }, [user?.id]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoryService.getCategories('document');
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories.');
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    if (!selectedPatient) return;
    try {
      setLoading(true);
      setError('');
      let data: Document[] = [];
      if (searchTerm) {
        data = await DocumentService.searchDocuments(selectedPatient, searchTerm);
      } else if (selectedCategory) {
        data = await DocumentService.filterDocumentsByCategory(selectedPatient, selectedCategory);
      } else {
        data = await DocumentService.getDocuments(selectedPatient);
      }
      setDocuments(data);
    } catch (err) {
      setError('Failed to fetch documents.');
    } finally {
      setLoading(false);
    }
  }, [selectedPatient, selectedCategory, searchTerm]);

  const handleAddDocument = async (docData: Omit<Document, 'created_by' | 'file_url'> & { file: File }) => {
    if (!user?.id) return;
    try {
      setError('');
      const fileUrl = await DocumentService.uploadFile(docData.file);
      const newDocument = await DocumentService.createDocument(user.id, { ...docData, file_url: fileUrl });
      setDocuments(prev => [newDocument, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add document.');
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchCategories();
  }, [fetchPatients, fetchCategories]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">Manage Documents</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary" disabled={!selectedPatient}>
            <FaPlus className="me-2" />
            Add Document
          </Button>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <Select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
              <option value="">Select a Patient</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
            </Select>
          </div>
          <div className="col-md-4">
            <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </Select>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <Input type="text" placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <Button className="btn-outline-secondary"><FaSearch /></Button>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <Loading />
        ) : documents.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="h4 text-muted">No documents found.</h3>
          </div>
        ) : (
          <div className="row g-4">
            {documents.map(document => (
              <div key={document.id} className="col-lg-6 col-xl-4">
                <DocumentCard document={document} />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddDocumentModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddDocument}
        patientId={selectedPatient}
      />

      <Footer />
    </div>
  );
}