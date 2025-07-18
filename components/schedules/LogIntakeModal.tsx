import { useState } from 'react';
import { Intake } from '@/lib/services/scheduleService';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface LogIntakeModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Intake, 'id' | 'scheduled_time'> & { scheduled_time: string }) => void;
  scheduleId: string;
  patientId: string;
  scheduledTime: string;
}

export default function LogIntakeModal({ show, onHide, onSubmit, scheduleId, patientId, scheduledTime }: LogIntakeModalProps) {
  const [status, setStatus] = useState<'taken' | 'missed' | 'skipped'>('taken');
  const [takenTime, setTakenTime] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      schedule_id: scheduleId,
      patient_id: patientId,
      scheduled_time: scheduledTime,
      status,
      taken_time: status === 'taken' ? takenTime : null,
    });
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Log Medication Intake</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <Select value={status} onChange={(e) => setStatus(e.target.value as 'taken' | 'missed' | 'skipped')}>
                  <option value="taken">Taken</option>
                  <option value="missed">Missed</option>
                  <option value="skipped">Skipped</option>
                </Select>
              </div>
              {status === 'taken' && (
                <div className="mb-3">
                  <label className="form-label">Taken Time</label>
                  <input type="datetime-local" className="form-control" value={takenTime} onChange={(e) => setTakenTime(e.target.value)} />
                </div>
              )}
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Log Intake</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
