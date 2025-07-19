'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { SharingService } from '@/lib/services/sharingService'
import { PatientService } from '@/lib/services/patientService'
import { MedicineService } from '@/lib/services/medicineService'
import { ScheduleService } from '@/lib/services/scheduleService'
import { VitalsService } from '@/lib/services/vitalsService'
import { AppointmentService } from '@/lib/services/appointmentService'
import { DocumentService } from '@/lib/services/documentService'
import Loading from '@/components/Loading'
import Button from '@/components/ui/Button'
import { FaUser, FaPills, FaCalendar, FaHeartbeat, FaFileAlt, FaSignInAlt } from 'react-icons/fa'

interface SharedPatientData {
  patient: any
  medicines: any[]
  schedules: any[]
  vitals: any[]
  appointments: any[]
  documents: any[]
}

export default function SharedPatientPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [patientData, setPatientData] = useState<SharedPatientData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const token = params.token as string

  useEffect(() => {
    if (token) {
      loadSharedPatient()
    }
  }, [token])

  const loadSharedPatient = async () => {
    try {
      setLoading(true)
      setError('')

      // بررسی اعتبار token
      const shareInfo = await SharingService.validateShareToken(token)
      if (!shareInfo) {
        setError('لینک اشتراک نامعتبر یا منقضی شده است')
        return
      }

      // دریافت اطلاعات بیمار
      const patient = await PatientService.getPatientById(shareInfo.patient_id)
      if (!patient) {
        setError('بیمار یافت نشد')
        return
      }

      // دریافت اطلاعات مرتبط
      const [medicines, schedules, vitals, appointments, documents] = await Promise.all([
        MedicineService.getMedicines(patient.id),
        ScheduleService.getSchedules(patient.id),
        VitalsService.getVitals(patient.id),
        AppointmentService.getAppointments(patient.id),
        DocumentService.getDocuments(patient.id)
      ])

      setPatientData({
        patient,
        medicines,
        schedules,
        vitals,
        appointments,
        documents
      })
    } catch (err) {
      console.error('Error loading shared patient:', err)
      setError('خطا در بارگذاری اطلاعات بیمار')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="alert alert-danger">
            <h4>خطا</h4>
            <p>{error}</p>
            {!user && (
              <Button onClick={handleLogin} className="btn btn-primary">
                <FaSignInAlt className="ms-2" />
                ورود به سیستم
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="alert alert-warning">
            <h4>اطلاعات یافت نشد</h4>
            <p>اطلاعات بیمار در دسترس نیست</p>
          </div>
        </div>
      </div>
    )
  }

  const { patient, medicines, schedules, vitals, appointments, documents } = patientData

  return (
    <div className="min-h-screen bg-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 text-primary mb-2">
                  <FaUser className="ms-2" />
                  {patient.full_name}
                </h1>
                <p className="text-muted mb-0">
                  پروفایل اشتراک‌گذاری شده - {patient.gender === 'male' ? 'مرد' : 'زن'}
                </p>
              </div>
              {!user && (
                <Button onClick={handleLogin} className="btn btn-primary">
                  <FaSignInAlt className="ms-2" />
                  ورود به سیستم
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card mb-4">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  خلاصه
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'medicines' ? 'active' : ''}`}
                  onClick={() => setActiveTab('medicines')}
                >
                  <FaPills className="ms-1" />
                  داروها ({medicines.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'schedules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('schedules')}
                >
                  <FaCalendar className="ms-1" />
                  برنامه‌ها ({schedules.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'vitals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vitals')}
                >
                  <FaHeartbeat className="ms-1" />
                  علائم حیاتی ({vitals.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <FaCalendar className="ms-1" />
                  قرار ملاقات‌ها ({appointments.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  <FaFileAlt className="ms-1" />
                  اسناد ({documents.length})
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <FaPills className="text-primary mb-2" style={{ fontSize: '2rem' }} />
                      <h5>{medicines.length}</h5>
                      <p className="text-muted">دارو</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <FaCalendar className="text-success mb-2" style={{ fontSize: '2rem' }} />
                      <h5>{schedules.length}</h5>
                      <p className="text-muted">برنامه</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <FaHeartbeat className="text-danger mb-2" style={{ fontSize: '2rem' }} />
                      <h5>{vitals.length}</h5>
                      <p className="text-muted">علائم حیاتی</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <FaFileAlt className="text-info mb-2" style={{ fontSize: '2rem' }} />
                      <h5>{documents.length}</h5>
                      <p className="text-muted">سند</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Medicines Tab */}
            {activeTab === 'medicines' && (
              <div>
                {medicines.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ دارویی ثبت نشده است</p>
                ) : (
                  <div className="row">
                    {medicines.map((medicine) => (
                      <div key={medicine.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{medicine.name}</h6>
                            <p className="card-text text-muted">
                              {medicine.medication_type} - {medicine.dosage_form}
                            </p>
                            {medicine.instructions && (
                              <p className="card-text small">{medicine.instructions}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Schedules Tab */}
            {activeTab === 'schedules' && (
              <div>
                {schedules.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ برنامه‌ای ثبت نشده است</p>
                ) : (
                  <div className="row">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{schedule.medicine_name}</h6>
                            <p className="card-text text-muted">
                              {schedule.frequency} - {schedule.dosage}
                            </p>
                            <p className="card-text small">{schedule.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vitals Tab */}
            {activeTab === 'vitals' && (
              <div>
                {vitals.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ علائم حیاتی ثبت نشده است</p>
                ) : (
                  <div className="row">
                    {vitals.map((vital) => (
                      <div key={vital.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{vital.vital_type}</h6>
                            <p className="card-text">
                              <strong>{vital.value}</strong> {vital.unit}
                            </p>
                            <p className="card-text text-muted small">
                              {new Date(vital.recorded_at).toLocaleDateString('fa-IR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div>
                {appointments.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ قرار ملاقاتی ثبت نشده است</p>
                ) : (
                  <div className="row">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{appointment.title}</h6>
                            <p className="card-text text-muted">
                              {new Date(appointment.appointment_date).toLocaleDateString('fa-IR')}
                            </p>
                            <p className="card-text small">{appointment.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                {documents.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ سندی آپلود نشده است</p>
                ) : (
                  <div className="row">
                    {documents.map((document) => (
                      <div key={document.id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">{document.title}</h6>
                            <p className="card-text text-muted">{document.document_type}</p>
                            <p className="card-text small">{document.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 