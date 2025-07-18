import { useState, useEffect } from 'react';
import { PatientFormData } from '@/lib/services/patientService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddPatientModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: PatientFormData) => void;
  initialData?: PatientFormData | null;
}

export default function AddPatientModal({ show, onHide, onSubmit, initialData }: AddPatientModalProps) {
  const [formData, setFormData] = useState<PatientFormData>({ full_name: '', date_of_birth: '', gender: 'other', blood_type: 'A+' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ full_name: '', date_of_birth: '', gender: 'other', blood_type: 'A+' });
    }
  }, [initialData]);

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
            <h5 className="modal-title">{initialData ? 'Edit Patient' : 'Add New Patient'}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <Input name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <Input type="date" name="date_of_birth" value={formData.date_of_birth || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <Select name="gender" value={formData.gender || 'other'} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Blood Type</label>
                <Select name="blood_type" value={formData.blood_type || 'A+'} onChange={handleChange}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">{initialData ? 'Save Changes' : 'Add Patient'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
