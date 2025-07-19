'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ScheduleService, Schedule, Intake } from '@/lib/services/scheduleService';
import { PatientService, Patient } from '@/lib/services/patientService';
import ScheduleCard from '@/components/schedules/ScheduleCard';
import AddScheduleModal from '@/components/schedules/AddScheduleModal';
import LogIntakeModal from '@/components/schedules/LogIntakeModal';
import AppWrapper from '@/components/AppWrapper';

import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaPlus, FaHistory, FaClock } from 'react-icons/fa';

export default function SchedulesPage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [intakeHistory, setIntakeHistory] = useState<Intake[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogIntakeModal, setShowLogIntakeModal] = useState(false);
  const [selectedScheduleForIntake, setSelectedScheduleForIntake] = useState<Schedule | null>(null);
  const [selectedScheduleForEdit, setSelectedScheduleForEdit] = useState<Schedule | null>(null);
  const [error, setError] = useState('');

  const fetchPatients = useCallback(async () => {
    if (!user?.id) return;
    try {
      console.log('Fetching patients for user:', user.id);
      const data = await PatientService.getPatients(user.id);
      console.log('Fetched patients:', data);
      setPatients(data);
      if (data.length > 0) {
        console.log('Setting selected patient to:', data[0].id);
        setSelectedPatient(data[0].id!);
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to fetch patients.');
    }
  }, [user?.id]);

  const fetchSchedules = useCallback(async () => {
    if (!selectedPatient) return;
    try {
      setLoading(true);
      setError('');
      const data = await ScheduleService.getSchedules(selectedPatient);
      setSchedules(data);
    } catch (err) {
      setError('Failed to fetch schedules.');
    } finally {
      setLoading(false);
    }
  }, [selectedPatient]);

  const fetchIntakeHistory = useCallback(async () => {
    if (!selectedPatient) return;
    try {
      const data = await ScheduleService.getIntakeHistory(selectedPatient);
      setIntakeHistory(data);
    } catch (err) {
      setError('Failed to fetch intake history.');
    }
  }, [selectedPatient]);

  const handleAddSchedule = async (scheduleData: Omit<Schedule, 'created_by' | 'is_active'>) => {
    if (!user?.id) return;
    try {
      setError('');
      const newSchedule = await ScheduleService.createSchedule(user.id, scheduleData);
      setSchedules(prev => [newSchedule, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add schedule.');
    }
  };

  const handleLogIntake = async (intakeData: Omit<Intake, 'id' | 'scheduled_time'> & { scheduled_time: string }) => {
    try {
      setError('');
      // تبدیل status به یکی از مقادیر مجاز
      const validIntakeData = {
        ...intakeData,
        status: intakeData.status === 'scheduled' ? 'taken' : intakeData.status as 'taken' | 'missed' | 'skipped'
      };
      await ScheduleService.logIntake(validIntakeData);
      setShowLogIntakeModal(false);
      fetchIntakeHistory(); // Refresh intake history
    } catch (err) {
      setError('Failed to log intake.');
    }
  };

  const handleEditSchedule = async (scheduleData: Omit<Schedule, 'created_by' | 'is_active'>) => {
    if (!user?.id || !selectedScheduleForEdit) return;
    try {
      setError('');
      await ScheduleService.updateSchedule(selectedScheduleForEdit.id!, scheduleData);
      setShowAddModal(false);
      setSelectedScheduleForEdit(null);
      fetchSchedules(); // Refresh schedules
    } catch (err) {
      setError('Failed to update schedule.');
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    try {
      setError('');
      await ScheduleService.deleteSchedule(scheduleId);
      fetchSchedules(); // Refresh schedules
    } catch (err) {
      setError('Failed to delete schedule.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    fetchSchedules();
    fetchIntakeHistory();
  }, [fetchSchedules, fetchIntakeHistory]);

  const openLogIntakeModal = (schedule: Schedule) => {
    setSelectedScheduleForIntake(schedule);
    setShowLogIntakeModal(true);
  };

  return (
    <AppWrapper>
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 text-primary mb-2">مدیریت برنامه‌های دارویی</h1>
              <p className="text-muted mb-0">برنامه‌ریزی و نظارت بر مصرف داروها</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="btn-primary text-white fw-bold" disabled={!selectedPatient}>
              <FaPlus className="ms-2" />
              افزودن برنامه
            </Button>
          </div>

          {/* انتخاب بیمار */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">انتخاب بیمار</h5>
              <Select 
                value={selectedPatient} 
                onChange={(e) => setSelectedPatient(e.target.value)}
                options={[
                  { value: '', label: 'بیمار را انتخاب کنید' },
                  ...patients.map(p => ({ value: p.id!, label: p.full_name }))
                ]}
                className="form-select"
              />
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Loading />
            <p className="mt-3 text-muted">در حال دریافت برنامه‌ها...</p>
          </div>
        ) : (
          <>
            {/* برنامه‌های دارویی */}
            <div className="card mb-5">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">
                  <FaClock className="ms-2" />
                  برنامه‌های دارویی
                </h3>
              </div>
              <div className="card-body">
                {schedules.length === 0 ? (
                  <div className="text-center py-5">
                    <FaClock className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                    <h4 className="h5 text-muted mb-3">هیچ برنامه‌ای یافت نشد</h4>
                    <p className="text-muted mb-4">
                      {selectedPatient ? 'برای این بیمار هنوز برنامه دارویی تنظیم نشده است' : 'ابتدا یک بیمار انتخاب کنید'}
                    </p>
                    {selectedPatient && (
                      <Button onClick={() => setShowAddModal(true)} className="btn-primary text-white fw-bold">
                        <FaPlus className="ms-2" />
                        افزودن اولین برنامه
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="row g-3">
                    {schedules.map(schedule => (
                      <div key={schedule.id} className="col-lg-6 col-xl-4 col-xxl-3">
                        <ScheduleCard 
                          schedule={schedule}
                          onEdit={(schedule) => {
                            setSelectedScheduleForEdit(schedule);
                            setShowAddModal(true);
                          }}
                          onDelete={handleDeleteSchedule}
                          onLogIntake={openLogIntakeModal}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* تاریخچه مصرف */}
            <div className="card">
              <div className="card-header bg-info text-white">
                <h3 className="h5 mb-0">
                  <FaHistory className="ms-2" />
                  تاریخچه مصرف
                </h3>
              </div>
              <div className="card-body">
                {intakeHistory.length === 0 ? (
                  <div className="text-center py-4">
                    <FaHistory className="text-muted mb-3" style={{ fontSize: '2rem' }} />
                    <p className="text-muted">هیچ سابقه‌ای از مصرف دارو یافت نشد</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>نام دارو</th>
                          <th>زمان برنامه‌ریزی شده</th>
                          <th>زمان مصرف</th>
                          <th>وضعیت</th>
                        </tr>
                      </thead>
                      <tbody>
                        {intakeHistory.map(intake => (
                          <tr key={intake.id}>
                            <td>
                              <strong>{intake.schedule_id}</strong>
                            </td>
                            <td>
                              {new Date(intake.scheduled_time).toLocaleString('fa-IR')}
                            </td>
                            <td>
                              {intake.taken_time ? 
                                new Date(intake.taken_time).toLocaleString('fa-IR') : 
                                <span className="text-muted">-</span>
                              }
                            </td>
                            <td>
                              <span className={`badge ${
                                intake.status === 'taken' ? 'bg-success' :
                                intake.status === 'missed' ? 'bg-danger' :
                                intake.status === 'skipped' ? 'bg-warning' : 'bg-secondary'
                              }`}>
                                {intake.status === 'taken' ? 'مصرف شده' :
                                 intake.status === 'missed' ? 'فراموش شده' :
                                 intake.status === 'skipped' ? 'رد شده' : 'برنامه‌ریزی شده'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <AddScheduleModal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setSelectedScheduleForEdit(null);
        }}
        onSubmit={selectedScheduleForEdit ? handleEditSchedule : handleAddSchedule}
        patientId={selectedPatient}
        editSchedule={selectedScheduleForEdit}
      />

      {selectedScheduleForIntake && (
        <LogIntakeModal
          show={showLogIntakeModal}
          onHide={() => setShowLogIntakeModal(false)}
          onSubmit={handleLogIntake}
          schedule={selectedScheduleForIntake}
          patientId={selectedScheduleForIntake.patient_id}
          scheduledTime={new Date().toISOString()} // Use current time for logging
        />
      )}
      </div>
    </AppWrapper>
  );
}