import { useState, useEffect } from 'react';
import { MedicineFormData, MedicationType, DosageForm } from '@/lib/services/medicineService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddMedicineModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: MedicineFormData) => void;
  initialData?: MedicineFormData | null;
}

export default function AddMedicineModal({ show, onHide, onSubmit, initialData }: AddMedicineModalProps) {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    medication_type: 'tablet',
    dosage_form: 'mg',
    strength: undefined,
    strength_unit: '',
    instructions: '',
    quantity: undefined,
    expiration_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        medication_type: 'tablet',
        dosage_form: 'mg',
        strength: undefined,
        strength_unit: '',
        instructions: '',
        quantity: undefined,
        expiration_date: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'strength' || name === 'quantity' ? (value ? parseFloat(value) : undefined) : value,
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
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{initialData ? 'ویرایش دارو' : 'افزودن داروی جدید'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">نام دارو</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="نام دارو را وارد کنید" />
              </div>
              <div className="mb-3">
                <label htmlFor="medication_type" className="form-label">نوع دارو</label>
                <Select 
                  id="medication_type" 
                  name="medication_type" 
                  value={formData.medication_type} 
                  onChange={handleChange}
                  options={[
                    { value: 'tablet', label: 'قرص' },
                    { value: 'capsule', label: 'کپسول' },
                    { value: 'liquid', label: 'مایع' },
                    { value: 'injection', label: 'تزریقی' },
                    { value: 'inhaler', label: 'استنشاقی' },
                    { value: 'cream', label: 'کرم' },
                    { value: 'drops', label: 'قطره' },
                    { value: 'suppository', label: 'شیاف' }
                  ]}
                  placeholder="نوع دارو را انتخاب کنید"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dosage_form" className="form-label">فرم دوز</label>
                <Select 
                  id="dosage_form" 
                  name="dosage_form" 
                  value={formData.dosage_form} 
                  onChange={handleChange}
                  options={[
                    { value: 'mg', label: 'میلی‌گرم' },
                    { value: 'mcg', label: 'میکروگرم' },
                    { value: 'ml', label: 'میلی‌لیتر' },
                    { value: 'units', label: 'واحد' },
                    { value: 'puffs', label: 'پاف' },
                    { value: 'drops', label: 'قطره' },
                    { value: 'tablets', label: 'قرص' },
                    { value: 'capsules', label: 'کپسول' }
                  ]}
                  placeholder="فرم دوز را انتخاب کنید"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="strength" className="form-label">مقدار</label>
                <Input id="strength" type="number" name="strength" value={formData.strength || ''} onChange={handleChange} className="form-control" placeholder="مقدار دارو" />
              </div>
              <div className="mb-3">
                <label htmlFor="strength_unit" className="form-label">واحد مقدار</label>
                <Input id="strength_unit" name="strength_unit" value={formData.strength_unit || ''} onChange={handleChange} className="form-control" placeholder="واحد مقدار (مثل mg)" />
              </div>
              <div className="mb-3">
                <label htmlFor="instructions" className="form-label">دستورالعمل مصرف</label>
                <Input id="instructions" name="instructions" value={formData.instructions || ''} onChange={handleChange} className="form-control" placeholder="دستورالعمل مصرف دارو" />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">تعداد</label>
                <Input id="quantity" type="number" name="quantity" value={formData.quantity || ''} onChange={handleChange} className="form-control" placeholder="تعداد موجود" />
              </div>
              <div className="mb-3">
                <label htmlFor="expiration_date" className="form-label">تاریخ انقضا</label>
                <Input id="expiration_date" type="date" name="expiration_date" value={formData.expiration_date || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>انصراف</Button>
                <Button type="submit" className="btn btn-primary">{initialData ? 'ذخیره تغییرات' : 'افزودن دارو'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
