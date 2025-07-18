'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { VitalsService, Vital } from '@/lib/services/vitalsService';
import { PatientService, Patient } from '@/lib/services/patientService';
import VitalCard from '@/components/vitals/VitalCard';
import AddVitalModal from '@/components/vitals/AddVitalModal';
import VitalChart from '@/components/vitals/VitalChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaPlus } from 'react-icons/fa';

export default function VitalsPage() {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
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

  const fetchVitals = useCallback(async () => {
    if (!selectedPatient) return;
    try {
      setLoading(true);
      setError('');
      const data = await VitalsService.getVitals(selectedPatient);
      setVitals(data);
    } catch (err) {
      setError('Failed to fetch vitals.');
    } finally {
      setLoading(false);
    }
  }, [selectedPatient]);

  const handleAddVital = async (vitalData: Omit<Vital, 'created_by'>) => {
    if (!user?.id) return;
    try {
      setError('');
      const newVital = await VitalsService.createVital(user.id, vitalData);
      setVitals(prev => [newVital, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add vital.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    fetchVitals();
  }, [fetchVitals]);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">Manage Vitals</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary" disabled={!selectedPatient}>
            <FaPlus className="me-2" />
            Add Vital
          </Button>
        </div>

        <div className="mb-3">
          <Select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select a Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
          </Select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <Loading />
        ) : vitals.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="h4 text-muted">No vitals found.</h3>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              {vitals.map(vital => (
                <div key={vital.id} className="col-lg-6 col-xl-4">
                  <VitalCard vital={vital} />
                </div>
              ))}
            </div>
            <h3 className="h4 text-primary mt-5">Vital Trends</h3>
            <div className="row g-4">
              {[...new Set(vitals.map(v => v.vital_type))].map(type => (
                <div key={type} className="col-lg-6">
                  <VitalChart vitals={vitals} vitalType={type} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AddVitalModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddVital}
        patientId={selectedPatient}
      />

      <Footer />
    </div>
  );
}