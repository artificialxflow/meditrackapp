'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PatientService, Patient } from '@/lib/services/patientService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import { AppointmentService, Appointment } from '@/lib/services/appointmentService';
import { VitalsService, Vital } from '@/lib/services/vitalsService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { FaUser, FaPills, FaCalendarCheck, FaHeartbeat } from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError('');

      // Fetch patients
      const fetchedPatients = await PatientService.getPatients(user.id);
      setPatients(fetchedPatients);

      // For medicines, appointments, and vitals, we need a patient ID.
      // For simplicity, we'll use the first patient found, or skip if none.
      const firstPatientId = fetchedPatients.length > 0 ? fetchedPatients[0].id : null;

      if (firstPatientId) {
        const fetchedMedicines = await MedicineService.getMedicines(firstPatientId);
        setMedicines(fetchedMedicines);

        const fetchedAppointments = await AppointmentService.getAppointments(firstPatientId);
        setAppointments(fetchedAppointments);

        const fetchedVitals = await VitalsService.getVitals(firstPatientId);
        setVitals(fetchedVitals);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <Loading />
          <p className="mt-4 text-muted">در حال بارگذاری داشبورد...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="h2 text-primary mb-4">داشبورد</h1>

        {error && <div className="alert alert-danger">خطا در بارگذاری اطلاعات داشبورد.</div>}

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card text-center p-3">
              <FaUser className="text-primary mb-2" style={{ fontSize: '2rem' }} />
              <h5 className="card-title">بیماران</h5>
              <p className="card-text display-4">{patients.length}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center p-3">
              <FaPills className="text-success mb-2" style={{ fontSize: '2rem' }} />
              <h5 className="card-title">داروها</h5>
              <p className="card-text display-4">{medicines.length}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center p-3">
              <FaCalendarCheck className="text-info mb-2" style={{ fontSize: '2rem' }} />
              <h5 className="card-title">قرار ملاقات</h5>
              <p className="card-text display-4">{appointments.length}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-center p-3">
              <FaHeartbeat className="text-danger mb-2" style={{ fontSize: '2rem' }} />
              <h5 className="card-title">علائم حیاتی</h5>
              <p className="card-text display-4">{vitals.length}</p>
            </div>
          </div>
        </div>

        {/* You can add more sections here, e.g., recent activities, upcoming appointments */}

      </div>
      <Footer />
    </div>
  );
}