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
      setFormData({
        full_name: initialData.full_name || '',
        date_of_birth: initialData.date_of_birth || '',
        gender: initialData.gender || 'other',
        blood_type: initialData.blood_type || 'A+'
      });
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
    
    // Validate required fields
    if (!formData.full_name.trim()) {
      alert('لطفاً نام کامل را وارد کنید');
      return;
    }
    
    // Validate and format date if provided
    let submitData = { ...formData };
    if (formData.date_of_birth && formData.date_of_birth.trim()) {
      try {
        const date = new Date(formData.date_of_birth);
        if (isNaN(date.getTime())) {
          alert('لطفاً تاریخ را به فرمت صحیح وارد کنید');
          return;
        }
        // Format as YYYY-MM-DD
        submitData.date_of_birth = date.toISOString().split('T')[0];
      } catch (error) {
        alert('لطفاً تاریخ را به فرمت صحیح وارد کنید');
        return;
      }
    } else {
      // Remove date if empty
      delete submitData.date_of_birth;
    }
    
    onSubmit(submitData);
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
                  placeholder="تاریخ تولد را انتخاب کنید"
                />
                <small className="form-text text-muted">اختیاری - برای یادآوری بهتر</small>
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
