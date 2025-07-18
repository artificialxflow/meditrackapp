import { useState } from 'react';
import { Appointment } from '@/lib/services/appointmentService';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AddAppointmentModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Appointment, 'created_by'>) => void;
  patientId: string;
}

export default function AddAppointmentModal({ show, onHide, onSubmit, patientId }: AddAppointmentModalProps) {
  const [formData, setFormData] = useState<Omit<Appointment, 'created_by'>>({ patient_id: patientId, title: '', appointment_datetime: '', status: 'scheduled', reminder_minutes: 60 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'reminder_minutes' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Appointment</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Doctor Name</label>
                <Input name="doctor_name" value={formData.doctor_name || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date and Time</label>
                <Input type="datetime-local" name="appointment_datetime" value={formData.appointment_datetime} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Reminder (minutes before)</label>
                <Input type="number" name="reminder_minutes" value={formData.reminder_minutes || 0} onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Add Appointment</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}