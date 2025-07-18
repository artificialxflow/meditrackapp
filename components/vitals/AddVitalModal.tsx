import { useState } from 'react';
import { Vital } from '@/lib/services/vitalsService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddVitalModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Vital, 'created_by'>) => void;
  patientId: string;
}

export default function AddVitalModal({ show, onHide, onSubmit, patientId }: AddVitalModalProps) {
  const [formData, setFormData] = useState<Omit<Vital, 'created_by'>>({ patient_id: patientId, vital_type: 'heart_rate', value: 0, measured_at: new Date().toISOString() });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <h5 className="modal-title">Add New Vital</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Vital Type</label>
                <Select name="vital_type" value={formData.vital_type} onChange={handleChange}>
                  <option value="heart_rate">Heart Rate</option>
                  <option value="blood_pressure">Blood Pressure</option>
                  <option value="temperature">Temperature</option>
                  <option value="weight">Weight</option>
                  <option value="height">Height</option>
                  <option value="blood_sugar">Blood Sugar</option>
                  <option value="oxygen_saturation">Oxygen Saturation</option>
                  <option value="pain_level">Pain Level</option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Value</label>
                <Input type="number" name="value" value={formData.value} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Unit</label>
                <Input name="unit" value={formData.unit || ''} onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Add Vital</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
