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
    // Validate date format before submitting
    if (formData.date_of_birth && !formData.date_of_birth.match(/^\d{4}-\d{2}-\d{2}$/)) {
      alert('لطفاً تاریخ را به فرمت صحیح وارد کنید');
      return;
    }
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{initialData ? 'ویرایش بیمار' : 'افزودن بیمار جدید'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">نام کامل</label>
                <Input 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleChange} 
                  required 
                  placeholder="نام کامل بیمار را وارد کنید"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">تاریخ تولد</label>
                <Input 
                  type="date" 
                  name="date_of_birth" 
                  value={formData.date_of_birth || ''} 
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">جنسیت</label>
                <Select 
                  name="gender" 
                  value={formData.gender || 'other'} 
                  onChange={handleChange}
                  options={[
                    { value: 'male', label: 'مرد' },
                    { value: 'female', label: 'زن' },
                    { value: 'other', label: 'سایر' }
                  ]}
                  placeholder="جنسیت را انتخاب کنید"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">گروه خونی</label>
                <Select 
                  name="blood_type" 
                  value={formData.blood_type || 'A+'} 
                  onChange={handleChange}
                  options={[
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' }
                  ]}
                  placeholder="گروه خونی را انتخاب کنید"
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>انصراف</Button>
                <Button type="submit" className="btn-primary">{initialData ? 'ذخیره تغییرات' : 'افزودن بیمار'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
