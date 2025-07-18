'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ScheduleService, Schedule, Intake } from '@/lib/services/scheduleService';
import { PatientService, Patient } from '@/lib/services/patientService';
import ScheduleCard from '@/components/schedules/ScheduleCard';
import AddScheduleModal from '@/components/schedules/AddScheduleModal';
import LogIntakeModal from '@/components/schedules/LogIntakeModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { FaPlus, FaHistory } from 'react-icons/fa';

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
      await ScheduleService.logIntake(intakeData);
      setShowLogIntakeModal(false);
      fetchIntakeHistory(); // Refresh intake history
    } catch (err) {
      setError('Failed to log intake.');
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
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary">Manage Schedules & Intake</h1>
          <Button onClick={() => setShowAddModal(true)} className="btn-primary" disabled={!selectedPatient}>
            <FaPlus className="me-2" />
            Add Schedule
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
        ) : (
          <>
            <h3 className="h4 text-primary mt-5">Medication Schedules</h3>
            {schedules.length === 0 ? (
              <div className="text-center py-3">
                <p className="text-muted">No schedules found for this patient.</p>
              </div>
            ) : (
              <div className="row g-4">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="col-lg-6 col-xl-4">
                    <ScheduleCard schedule={schedule} />
                    <Button className="btn-sm btn-outline-info mt-2" onClick={() => openLogIntakeModal(schedule)}>
                      Log Intake
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <h3 className="h4 text-primary mt-5">Intake History</h3>
            {intakeHistory.length === 0 ? (
              <div className="text-center py-3">
                <p className="text-muted">No intake history found for this patient.</p>
              </div>
            ) : (
              <ul className="list-group">
                {intakeHistory.map(intake => (
                  <li key={intake.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Schedule ID:</strong> {intake.schedule_id} <br/>
                      <strong>Status:</strong> {intake.status} <br/>
                      <strong>Scheduled:</strong> {new Date(intake.scheduled_time).toLocaleString()}
                      {intake.taken_time && <> <br/> <strong>Taken:</strong> {new Date(intake.taken_time).toLocaleString()}</>}
                    </div>
                    <FaHistory className="text-muted" />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Add Schedule Modal - still needs medication selection */}
      {/* <AddScheduleModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddSchedule}
        patientId={selectedPatient}
        medicationId={...} // Needs to be selected
      /> */}

      {selectedScheduleForIntake && (
        <LogIntakeModal
          show={showLogIntakeModal}
          onHide={() => setShowLogIntakeModal(false)}
          onSubmit={handleLogIntake}
          scheduleId={selectedScheduleForIntake.id!}
          patientId={selectedScheduleForIntake.patient_id}
          scheduledTime={new Date().toISOString()} // Use current time for logging
        />
      )}

      <Footer />
    </div>
  );
}