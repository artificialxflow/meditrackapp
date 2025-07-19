import { useState, useEffect } from 'react';
import { Schedule } from '@/lib/services/scheduleService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import { supabase } from '@/lib/supabase/client';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { FaPlus, FaTrash, FaClock } from 'react-icons/fa';

interface AddScheduleModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Schedule, 'created_by' | 'is_active'>) => void;
  patientId: string;
  editSchedule?: Schedule | null;
}

export default function AddScheduleModal({ show, onHide, onSubmit, patientId, editSchedule }: AddScheduleModalProps) {
  const [formData, setFormData] = useState<Omit<Schedule, 'created_by' | 'is_active'>>({ 
    patient_id: patientId, 
    medication_id: '', 
    dosage: 1, 
    frequency_type: 'daily', 
    start_date: '', 
    time_slots: [''] 
  });
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

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

  // دریافت داروهای بیمار
  useEffect(() => {
    if (show && patientId) {
      const fetchMedicines = async () => {
        try {
          setLoading(true);
          console.log('Fetching medicines for patientId:', patientId);
          const data = await MedicineService.getMedicines(patientId);
          console.log('Fetched medicines:', data);
          setMedicines(data);
          
          // اگر هیچ دارویی یافت نشد، همه داروها را امتحان کن
          if (data.length === 0) {
            console.log('No medicines found for patient, trying to fetch all medicines...');
            try {
              const { data: allData, error } = await supabase
                .from('medicines')
                .select('*')
                .limit(10);
              console.log('All medicines in database:', allData);
              if (allData && allData.length > 0) {
                setMedicines(allData);
              }
            } catch (allError) {
              console.error('Error fetching all medicines:', allError);
            }
          }
        } catch (error) {
          console.error('Error fetching medicines:', error);
          // نمایش خطا به کاربر
          alert('خطا در دریافت داروها: ' + (error as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchMedicines();
    } else {
      console.log('Modal not showing or patientId missing:', { show, patientId });
      if (show && !patientId) {
        alert('خطا: شناسه بیمار مشخص نشده است');
      }
    }
  }, [show, patientId]);

  // به‌روزرسانی patient_id وقتی patientId تغییر می‌کند
  useEffect(() => {
    setFormData(prev => ({ ...prev, patient_id: patientId }));
  }, [patientId]);

  // تنظیم داده‌های edit
  useEffect(() => {
    if (editSchedule) {
      setFormData({
        patient_id: editSchedule.patient_id,
        medication_id: editSchedule.medication_id,
        dosage: editSchedule.dosage,
        frequency_type: editSchedule.frequency_type,
        start_date: editSchedule.start_date,
        time_slots: editSchedule.time_slots
      });
    } else {
      setFormData({
        patient_id: patientId,
        medication_id: '',
        dosage: 1,
        frequency_type: 'daily',
        start_date: '',
        time_slots: ['']
      });
    }
  }, [editSchedule, patientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.medication_id) {
      alert('لطفاً دارو را انتخاب کنید');
      return;
    }
    if (!formData.start_date) {
      alert('لطفاً تاریخ شروع را وارد کنید');
      return;
    }
    if (formData.time_slots.length === 0 || formData.time_slots[0] === '') {
      alert('لطفاً حداقل یک زمان مصرف وارد کنید');
      return;
    }
    onSubmit(formData);
  };

  const removeTimeSlot = (index: number) => {
    if (formData.time_slots.length > 1) {
      const newTimeSlots = formData.time_slots.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, time_slots: newTimeSlots }));
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <FaClock className="ms-2" />
              {editSchedule ? 'ویرایش برنامه دارویی' : 'افزودن برنامه دارویی جدید'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* انتخاب دارو */}
              <div className="mb-3">
                <label htmlFor="medication_id" className="form-label">
                  انتخاب دارو 
                  {loading && <span className="text-muted ms-2">(در حال بارگذاری...)</span>}
                </label>
                <Select
                  id="medication_id"
                  name="medication_id"
                  value={formData.medication_id}
                  onChange={handleChange}
                  options={[
                    { value: '', label: loading ? 'در حال بارگذاری...' : 'دارو را انتخاب کنید' },
                    ...medicines.map(med => ({ 
                      value: med.id!, 
                      label: `${med.name}${med.strength ? ` (${med.strength}${med.strength_unit || ''})` : ''}` 
                    }))
                  ]}
                  className="form-select"
                  required
                  disabled={loading}
                />
                {!loading && medicines.length === 0 && (
                  <div className="text-warning mt-1">
                    <small>هیچ دارویی برای این بیمار یافت نشد. ابتدا داروها را اضافه کنید.</small>
                    <br />
                    <small className="text-muted">شناسه بیمار: {patientId}</small>
                    <br />
                    <small className="text-muted">تعداد کل داروها در دیتابیس: {medicines.length}</small>
                  </div>
                )}
                {medicines.length > 0 && (
                  <div className="text-success mt-1">
                    <small>{medicines.length} دارو یافت شد</small>
                  </div>
                )}
              </div>

              {/* مقدار مصرف */}
              <div className="mb-3">
                <label htmlFor="dosage" className="form-label">مقدار مصرف</label>
                <Input
                  id="dosage"
                  type="number"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  className="form-control"
                  min="0.5"
                  step="0.5"
                  required
                />
              </div>

              {/* نوع تکرار */}
              <div className="mb-3">
                <label htmlFor="frequency_type" className="form-label">نوع تکرار</label>
                <Select
                  id="frequency_type"
                  name="frequency_type"
                  value={formData.frequency_type}
                  onChange={handleChange}
                  options={[
                    { value: 'daily', label: 'روزانه' },
                    { value: 'twice_daily', label: 'دو بار در روز' },
                    { value: 'three_times_daily', label: 'سه بار در روز' },
                    { value: 'weekly', label: 'هفتگی' },
                    { value: 'monthly', label: 'ماهانه' }
                  ]}
                  className="form-select"
                  required
                />
              </div>

              {/* تاریخ شروع */}
              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">تاریخ شروع</label>
                <Input
                  id="start_date"
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* زمان‌های مصرف */}
              <div className="mb-3">
                <label className="form-label">زمان‌های مصرف</label>
                {formData.time_slots.map((time, index) => (
                  <div key={index} className="input-group mb-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                      className="form-control"
                      required
                    />
                    {formData.time_slots.length > 1 && (
                      <Button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  className="btn btn-success btn-sm fw-bold btn-add-time"
                  onClick={addTimeSlot}
                >
                  <FaPlus className="ms-2" />
                  افزودن زمان
                </Button>
              </div>

              <div className="d-flex justify-content-end">
                <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>
                  انصراف
                </Button>
                <Button type="submit" className="btn btn-primary text-white fw-bold">
                  {editSchedule ? 'ویرایش برنامه' : 'افزودن برنامه'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
