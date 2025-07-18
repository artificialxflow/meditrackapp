'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PatientService, Patient, PatientFormData } from '@/lib/services/patientService';
import { ProfileService } from '@/lib/services/profileService';
import { FamilyService } from '@/lib/services/familyService';
import PatientCard from '@/components/patients/PatientCard';
import AddPatientModal from '@/components/patients/AddPatientModal';
import SharePatientModal from '@/components/patients/SharePatientModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import { FaPlus, FaShareAlt } from 'react-icons/fa';

export default function PatientsPage() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [sharingPatientId, setSharingPatientId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchPatients = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError('');
      const data = await PatientService.getPatients(user.id);
      setPatients(data);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to fetch patients.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleAddPatient = async (patientData: PatientFormData) => {
    if (!user?.id) return;
    try {
      setError('');
      
      // Ensure user has a profile first
      try {
        await ProfileService.ensureProfile();
      } catch (profileError) {
        console.warn('Profile creation failed, trying to continue:', profileError);
        // Continue anyway, the backend will handle it
      }
      
      // Clean the data before sending
      const cleanData = {
        ...patientData,
        full_name: patientData.full_name?.trim() || '',
        date_of_birth: patientData.date_of_birth?.trim() || undefined,
        gender: patientData.gender || 'other',
        blood_type: patientData.blood_type || 'A+'
      };
      
      // Remove empty date_of_birth
      if (!cleanData.date_of_birth) {
        delete cleanData.date_of_birth;
      }
      
      const newPatient = await PatientService.addPatient(user.id, cleanData);
      setPatients(prev => [newPatient, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('خطا در افزودن بیمار.');
    }
  };

  const handleUpdatePatient = async (patientData: PatientFormData) => {
    if (!editingPatient?.id) return;
    try {
      setError('');
      
      // Clean the data before sending
      const cleanData = {
        ...patientData,
        full_name: patientData.full_name?.trim() || '',
        date_of_birth: patientData.date_of_birth?.trim() || undefined,
        gender: patientData.gender || 'other',
        blood_type: patientData.blood_type || 'A+'
      };
      
      // Remove empty date_of_birth
      if (!cleanData.date_of_birth) {
        delete cleanData.date_of_birth;
      }
      
      const updatedPatient = await PatientService.updatePatient(editingPatient.id, cleanData);
      setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
      setShowAddModal(false);
      setEditingPatient(null);
    } catch (err) {
      console.error('Error updating patient:', err);
      setError('خطا در بروزرسانی بیمار.');
    }
  };

  const handleDeletePatient = async (patientId: string) => {
    try {
      setError('');
      await PatientService.deletePatient(patientId);
      setPatients(prev => prev.filter(p => p.id !== patientId));
    } catch (err) {
      console.error('Error deleting patient:', err);
      setError('Failed to delete patient.');
    }
  };

  const handleSharePatient = async (email: string, permission: 'view_only' | 'edit_access' | 'full_access') => {
    if (!user?.id || !sharingPatientId) return;
    try {
      setError('');
      const sharedWithProfile = await FamilyService.findProfileByEmail(email);
      if (!sharedWithProfile) {
        setError('User with this email not found.');
        return;
      }
      await PatientService.sharePatient(sharingPatientId, sharedWithProfile.id, user.id, permission);
      setShowShareModal(false);
      setSharingPatientId(null);
      alert('Patient shared successfully!');
    } catch (err) {
      console.error('Error sharing patient:', err);
      setError('Failed to share patient.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowAddModal(true);
  };

  const handleShare = (patientId: string) => {
    setSharingPatientId(patientId);
    setShowShareModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditingPatient(null);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setSharingPatientId(null);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">مدیریت بیماران</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary">
            <FaPlus className="me-2" />
            افزودن بیمار
          </Button>
        </div>

        {error && <div className="alert alert-danger">خطا در بارگذاری بیماران.</div>}

        {loading ? (
          <div className="text-center py-5">
            <Loading />
            <p className="mt-3 text-muted">در حال بارگذاری بیماران...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="h4 text-muted">هیچ بیماری یافت نشد.</h3>
            <p className="text-muted">با افزودن یک بیمار جدید شروع کنید.</p>
            <Button onClick={() => setShowAddModal(true)} className="btn-primary mt-3">
              <FaPlus className="me-2" />
              افزودن اولین بیمار
            </Button>
          </div>
        ) : (
          <div className="row g-4">
            {patients.map(patient => (
              <div key={patient.id} className="col-lg-6 col-xl-4">
                <PatientCard patient={patient} onDelete={handleDeletePatient} onEdit={handleEdit} />
                <Button className="btn-sm btn-outline-info mt-2" onClick={() => handleShare(patient.id!)}>
                  <FaShareAlt className="me-1" /> اشتراک‌گذاری
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddPatientModal
        show={showAddModal}
        onHide={handleCloseAddModal}
        onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
        initialData={editingPatient}
      />

      {sharingPatientId && (
        <SharePatientModal
          show={showShareModal}
          onHide={handleCloseShareModal}
          onSubmit={handleSharePatient}
        />
      )}

      <Footer />
    </div>
  );
}