'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PatientService, Patient } from '@/lib/services/patientService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import { AppointmentService, Appointment } from '@/lib/services/appointmentService';
import { VitalsService, Vital } from '@/lib/services/vitalsService';
import { DocumentService, Document } from '@/lib/services/documentService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { FaUser, FaPills, FaCalendarCheck, FaHeartbeat, FaFileAlt } from 'react-icons/fa';

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { user } = useAuth();
  const patientId = params.id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!user?.id || !patientId) return;
    try {
      setLoading(true);
      setError('');

      // Fetch patient details
      const fetchedPatient = await PatientService.getPatientById(patientId); // Assuming getPatientById exists
      setPatient(fetchedPatient);

      // Fetch related data
      const fetchedMedicines = await MedicineService.getMedicines(patientId);
      setMedicines(fetchedMedicines);

      const fetchedAppointments = await AppointmentService.getAppointments(patientId);
      setAppointments(fetchedAppointments);

      const fetchedVitals = await VitalsService.getVitals(patientId);
      setVitals(fetchedVitals);

      const fetchedDocuments = await DocumentService.getDocuments(patientId);
      setDocuments(fetchedDocuments);

    } catch (err) {
      console.error('Error fetching patient details:', err);
      setError('Failed to load patient data.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, patientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <Loading />
          <p className="mt-4 text-muted">Loading patient profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h3 className="h4 text-muted">Patient not found.</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="h2 text-primary mb-4">Patient Profile: {patient.full_name}</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {/* Patient Details Card */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src={patient.avatar_url || '/default-avatar.png'} alt={patient.full_name} className="rounded-circle mb-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                <h5 className="card-title">{patient.full_name}</h5>
                <p className="card-text text-muted">DOB: {patient.date_of_birth || 'N/A'}</p>
                <p className="card-text text-muted">Gender: {patient.gender || 'N/A'}</p>
                <p className="card-text text-muted">Blood Type: {patient.blood_type || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Medications Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaPills className="me-2" /> Medications</h5>
                <p className="card-text">Total: {medicines.length}</p>
                {/* Add a list of recent medications or a link to the full medications page */}
              </div>
            </div>
          </div>

          {/* Appointments Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaCalendarCheck className="me-2" /> Appointments</h5>
                <p className="card-text">Total: {appointments.length}</p>
                {/* Add a list of upcoming appointments or a link to the full appointments page */}
              </div>
            </div>
          </div>

          {/* Vitals Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaHeartbeat className="me-2" /> Vitals</h5>
                <p className="card-text">Total: {vitals.length}</p>
                {/* Add a list of recent vital readings or a link to the full vitals page */}
              </div>
            </div>
          </div>

          {/* Documents Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaFileAlt className="me-2" /> Documents</h5>
                <p className="card-text">Total: {documents.length}</p>
                {/* Add a list of recent documents or a link to the full documents page */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
