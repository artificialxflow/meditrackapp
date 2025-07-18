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
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container py-5 text-center">
          <Loading />
          <p className="mt-4 text-muted">در حال بارگذاری پروفایل بیمار...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container py-5 text-center">
          <h3 className="h4 text-muted">بیمار یافت نشد.</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <h1 className="h2 text-primary mb-4">پروفایل بیمار: {patient.full_name}</h1>

        {error && <div className="alert alert-danger">خطا در بارگذاری اطلاعات بیمار.</div>}

        <div className="row g-4">
          {/* Patient Details Card */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src={patient.avatar_url || '/default-avatar.png'} alt={patient.full_name} className="rounded-circle mb-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                <h5 className="card-title">{patient.full_name}</h5>
                <p className="card-text text-muted">تاریخ تولد: {patient.date_of_birth || 'نامشخص'}</p>
                <p className="card-text text-muted">جنسیت: {patient.gender || 'نامشخص'}</p>
                <p className="card-text text-muted">گروه خونی: {patient.blood_type || 'نامشخص'}</p>
              </div>
            </div>
          </div>

          {/* Medications Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaPills className="me-2" /> داروها</h5>
                <p className="card-text">تعداد: {medicines.length}</p>
                {/* Add a list of recent medications or a link to the full medications page */}
              </div>
            </div>
          </div>

          {/* Appointments Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaCalendarCheck className="me-2" /> قرار ملاقات</h5>
                <p className="card-text">تعداد: {appointments.length}</p>
                {/* Add a list of upcoming appointments or a link to the full appointments page */}
              </div>
            </div>
          </div>

          {/* Vitals Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaHeartbeat className="me-2" /> علائم حیاتی</h5>
                <p className="card-text">تعداد: {vitals.length}</p>
                {/* Add a list of recent vital readings or a link to the full vitals page */}
              </div>
            </div>
          </div>

          {/* Documents Summary */}
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><FaFileAlt className="me-2" /> اسناد</h5>
                <p className="card-text">تعداد: {documents.length}</p>
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
