'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PatientService, Patient } from '@/lib/services/patientService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import { AppointmentService, Appointment } from '@/lib/services/appointmentService';
import { VitalsService, Vital } from '@/lib/services/vitalsService';
import AppWrapper from '@/components/AppWrapper';
import Loading from '@/components/Loading';
import { FaUser, FaPills, FaCalendarCheck, FaHeartbeat, FaChartLine, FaClock, FaExclamationTriangle } from 'react-icons/fa';

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
          <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <Loading />
        <p className="mt-4 text-muted">در حال بارگذاری داشبورد...</p>
      </div>
    </div>
    );
  }

  return (
    <AppWrapper>
      <div className="bg-light">
        <main className="bg-light">
        <div className="container py-5">
          {/* Header Section */}
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="display-4 text-primary fw-bold mb-3">داشبورد</h1>
              <p className="lead text-muted">خوش آمدید! اینجا خلاصه‌ای از وضعیت سلامت شما را مشاهده می‌کنید.</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <FaExclamationTriangle className="me-2" />
              <div>خطا در بارگذاری اطلاعات داشبورد.</div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <FaUser className="text-primary" style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h5 className="card-title text-dark mb-2">بیماران</h5>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="display-6 fw-bold text-primary me-2">{patients.length}</span>
                    <small className="text-muted">نفر</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <FaPills className="text-success" style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h5 className="card-title text-dark mb-2">داروها</h5>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="display-6 fw-bold text-success me-2">{medicines.length}</span>
                    <small className="text-muted">عدد</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <FaCalendarCheck className="text-info" style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h5 className="card-title text-dark mb-2">قرار ملاقات</h5>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="display-6 fw-bold text-info me-2">{appointments.length}</span>
                    <small className="text-muted">جلسه</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <FaHeartbeat className="text-danger" style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h5 className="card-title text-dark mb-2">علائم حیاتی</h5>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="display-6 fw-bold text-danger me-2">{vitals.length}</span>
                    <small className="text-muted">رکورد</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">
                    <FaChartLine className="text-primary me-2" />
                    فعالیت‌های اخیر
                  </h5>
                </div>
                <div className="card-body">
                  {patients.length === 0 && medicines.length === 0 && appointments.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                        <FaClock className="text-muted" style={{ fontSize: '2rem' }} />
                      </div>
                      <h6 className="text-muted">هنوز فعالیتی ثبت نشده است</h6>
                      <p className="text-muted small">با افزودن بیماران، داروها و قرار ملاقات‌ها، اینجا فعالیت‌های شما نمایش داده خواهد شد.</p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {patients.length > 0 && (
                        <div className="list-group-item border-0 px-0">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <FaUser className="text-primary" />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">بیمار جدید اضافه شد</h6>
                              <small className="text-muted">{patients.length} بیمار در سیستم ثبت شده است</small>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {medicines.length > 0 && (
                        <div className="list-group-item border-0 px-0">
                          <div className="d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <FaPills className="text-success" />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">داروها مدیریت می‌شوند</h6>
                              <small className="text-muted">{medicines.length} دارو در سیستم ثبت شده است</small>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {appointments.length > 0 && (
                        <div className="list-group-item border-0 px-0">
                          <div className="d-flex align-items-center">
                            <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <FaCalendarCheck className="text-info" />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">قرار ملاقات‌ها برنامه‌ریزی شده</h6>
                              <small className="text-muted">{appointments.length} قرار ملاقات در سیستم ثبت شده است</small>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">دسترسی سریع</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <a href="/patients" className="btn btn-outline-primary">
                      <FaUser className="me-2" />
                      مدیریت بیماران
                    </a>
                    <a href="/medicines" className="btn btn-outline-success">
                      <FaPills className="me-2" />
                      مدیریت داروها
                    </a>
                    <a href="/appointments" className="btn btn-outline-info">
                      <FaCalendarCheck className="me-2" />
                      قرار ملاقات‌ها
                    </a>
                    <a href="/vitals" className="btn btn-outline-danger">
                      <FaHeartbeat className="me-2" />
                      علائم حیاتی
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </AppWrapper>
  );
}