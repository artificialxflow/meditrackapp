'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppointmentService, Appointment } from '@/lib/services/appointmentService';
import { PatientService, Patient } from '@/lib/services/patientService';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import AddAppointmentModal from '@/components/appointments/AddAppointmentModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaPlus } from 'react-icons/fa';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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

  const fetchAppointments = useCallback(async () => {
    if (!selectedPatient) return;
    try {
      setLoading(true);
      setError('');
      const data = await AppointmentService.getAppointments(selectedPatient);
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  }, [selectedPatient]);

  const handleAddAppointment = async (appointmentData: Omit<Appointment, 'created_by'>) => {
    if (!user?.id) return;
    try {
      setError('');
      const newAppointment = await AppointmentService.createAppointment(user.id, appointmentData);
      setAppointments(prev => [newAppointment, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add appointment.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">Manage Appointments</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary" disabled={!selectedPatient}>
            <FaPlus className="me-2" />
            Add Appointment
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
        ) : appointments.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="h4 text-muted">No appointments found.</h3>
          </div>
        ) : (
          <div className="row g-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="col-lg-6 col-xl-4">
                <AppointmentCard appointment={appointment} />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddAppointmentModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddAppointment}
        patientId={selectedPatient}
      />

      <Footer />
    </div>
  );
}
