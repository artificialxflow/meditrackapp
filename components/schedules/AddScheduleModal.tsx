import { useState } from 'react';
import { Schedule } from '@/lib/services/scheduleService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddScheduleModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Schedule, 'created_by' | 'is_active'>) => void;
  patientId: string;
  medicationId: string;
}

export default function AddScheduleModal({ show, onHide, onSubmit, patientId, medicationId }: AddScheduleModalProps) {
  const [formData, setFormData] = useState<Omit<Schedule, 'created_by' | 'is_active'>>({ patient_id: patientId, medication_id: medicationId, dosage: 1, frequency_type: 'daily', start_date: '', time_slots: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotChange = (index: number, value: string) => {
    const newTimeSlots = [...formData.time_slots];
    newTimeSlots[index] = value;
    setFormData(prev => ({ ...prev, time_slots: newTimeSlots }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({ ...prev, time_slots: [...prev.time_slots, ''] }));
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
            <h5 className="modal-title">Add New Schedule</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Form fields for schedule */}
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Add Schedule</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
