import { useState, useEffect } from 'react';
import { Intake, Schedule } from '@/lib/services/scheduleService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { FaPills, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa';

interface LogIntakeModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: Omit<Intake, 'id' | 'scheduled_time'> & { scheduled_time: string }) => void;
  schedule: Schedule;
  patientId: string;
  scheduledTime: string;
}

export default function LogIntakeModal({ show, onHide, onSubmit, schedule, patientId, scheduledTime }: LogIntakeModalProps) {
  const [status, setStatus] = useState<'taken' | 'missed' | 'skipped'>('taken');
  const [takenTime, setTakenTime] = useState(new Date().toISOString().slice(0, 16));
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);

  // دریافت اطلاعات دارو
  useEffect(() => {
    if (show && schedule.medication_id) {
      const fetchMedicine = async () => {
        try {
          setLoading(true);
          const data = await MedicineService.getMedicines(patientId);
          const foundMedicine = data.find(med => med.id === schedule.medication_id);
          setMedicine(foundMedicine || null);
        } catch (error) {
          console.error('Error fetching medicine:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMedicine();
    }
  }, [show, schedule.medication_id, patientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      schedule_id: schedule.id!,
      patient_id: patientId,
      scheduled_time: scheduledTime,
      status,
      taken_time: status === 'taken' ? takenTime : null,
    });
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <FaPills className="ms-2" />
              ثبت مصرف دارو
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            {/* اطلاعات برنامه دارویی */}
            <div className="card mb-4 border-success">
              <div className="card-header bg-light">
                <h6 className="mb-0">
                  <FaClock className="ms-2 text-success" />
                  اطلاعات برنامه دارویی
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong><FaPills className="ms-2 text-primary" />نام دارو:</strong>
                      <span className="ms-2">
                        {loading ? 'در حال بارگذاری...' : medicine ? medicine.name : 'نامشخص'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong><FaUser className="ms-2 text-info" />مقدار مصرف:</strong>
                      <span className="ms-2">{schedule.dosage} واحد</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong><FaCalendarAlt className="ms-2 text-warning" />زمان برنامه‌ریزی شده:</strong>
                      <span className="ms-2">{new Date(scheduledTime).toLocaleString('fa-IR')}</span>
                    </div>
                    <div className="mb-2">
                      <strong><FaClock className="ms-2 text-secondary" />نوع تکرار:</strong>
                      <span className="ms-2">
                        {schedule.frequency_type === 'daily' ? 'روزانه' :
                         schedule.frequency_type === 'weekly' ? 'هفتگی' :
                         schedule.frequency_type === 'custom' ? 'سفارشی' : schedule.frequency_type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* وضعیت مصرف */}
              <div className="mb-3">
                <label className="form-label">
                  <FaPills className="ms-2" />
                  وضعیت مصرف
                </label>
                <Select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as 'taken' | 'missed' | 'skipped')}
                  options={[
                    { value: 'taken', label: '✅ مصرف شده' },
                    { value: 'missed', label: '❌ فراموش شده' },
                    { value: 'skipped', label: '⏭️ رد شده' }
                  ]}
                  className="form-select"
                />
              </div>

              {/* زمان مصرف (فقط اگر مصرف شده باشد) */}
              {status === 'taken' && (
                <div className="mb-3">
                  <label className="form-label">
                    <FaClock className="ms-2" />
                    زمان مصرف واقعی
                  </label>
                  <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={takenTime} 
                    onChange={(e) => setTakenTime(e.target.value)} 
                  />
                  <small className="text-muted">
                    اگر در زمان برنامه‌ریزی شده مصرف کرده‌اید، نیازی به تغییر نیست
                  </small>
                </div>
              )}

              {/* توضیحات اضافی */}
              {status === 'missed' && (
                <div className="alert alert-warning">
                  <strong>توجه:</strong> این دارو در زمان برنامه‌ریزی شده مصرف نشده است.
                </div>
              )}

              {status === 'skipped' && (
                <div className="alert alert-info">
                  <strong>اطلاع‌رسانی:</strong> این دارو عمداً رد شده است.
                </div>
              )}

              <div className="d-flex justify-content-end">
                <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>
                  انصراف
                </Button>
                <Button type="submit" className="btn btn-primary text-white fw-bold">
                  ثبت مصرف
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
