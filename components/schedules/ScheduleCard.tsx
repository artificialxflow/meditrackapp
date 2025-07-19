import { useState, useEffect } from 'react';
import { Schedule, ScheduleService } from '@/lib/services/scheduleService';
import { MedicineService, Medicine } from '@/lib/services/medicineService';
import { FaClock, FaCalendarAlt, FaPills, FaUser, FaTablets, FaEdit, FaTrash, FaCheck, FaTimes, FaUndo } from 'react-icons/fa';

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit?: (schedule: Schedule) => void;
  onDelete?: (scheduleId: string) => void;
  onLogIntake?: (schedule: Schedule) => void;
}

export default function ScheduleCard({ schedule, onEdit, onDelete, onLogIntake }: ScheduleCardProps) {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>(schedule);
  const [statusLoading, setStatusLoading] = useState(false);

  // دریافت اطلاعات دارو
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        console.log('Schedule data:', {
          medication_id: schedule.medication_id,
          patient_id: schedule.patient_id
        });
        
        // استفاده از متد جدید برای دریافت دارو بر اساس ID
        const foundMedicine = await MedicineService.getMedicineById(schedule.medication_id);
        console.log('Found medicine:', foundMedicine);
        setMedicine(foundMedicine);
        
        // اگر دارو پیدا نشد، امتحان کن همه داروها را fetch کنی
        if (!foundMedicine) {
          console.log('Medicine not found by ID, trying to fetch all medicines...');
          const allMedicines = await MedicineService.getMedicines(schedule.patient_id);
          console.log('All medicines for patient:', allMedicines);
          const fallbackMedicine = allMedicines.find(med => med.id === schedule.medication_id);
          console.log('Fallback medicine:', fallbackMedicine);
          setMedicine(fallbackMedicine || null);
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
        setMedicine(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (schedule.medication_id) {
      fetchMedicine();
    } else {
      console.log('No medication_id provided in schedule');
      setMedicine(null);
    }
  }, [schedule.medication_id, schedule.patient_id]);

  // به‌روزرسانی currentSchedule وقتی schedule تغییر می‌کند
  useEffect(() => {
    setCurrentSchedule(schedule);
  }, [schedule]);

  // تیک زدن مصرف دارو
  const handleMarkAsTaken = async () => {
    if (!currentSchedule.id) return;
    
    try {
      setStatusLoading(true);
      const updatedSchedule = await ScheduleService.markAsTaken(currentSchedule.id);
      setCurrentSchedule(updatedSchedule);
    } catch (error) {
      console.error('Error marking as taken:', error);
      alert('خطا در ثبت مصرف دارو');
    } finally {
      setStatusLoading(false);
    }
  };

  // علامت‌گذاری به عنوان مصرف نشده
  const handleMarkAsMissed = async () => {
    if (!currentSchedule.id) return;
    
    try {
      setStatusLoading(true);
      const updatedSchedule = await ScheduleService.markAsMissed(currentSchedule.id);
      setCurrentSchedule(updatedSchedule);
    } catch (error) {
      console.error('Error marking as missed:', error);
      alert('خطا در علامت‌گذاری مصرف نشده');
    } finally {
      setStatusLoading(false);
    }
  };

  // بازنشانی وضعیت
  const handleResetStatus = async () => {
    if (!currentSchedule.id) return;
    
    try {
      setStatusLoading(true);
      const updatedSchedule = await ScheduleService.resetStatus(currentSchedule.id);
      setCurrentSchedule(updatedSchedule);
    } catch (error) {
      console.error('Error resetting status:', error);
      alert('خطا در بازنشانی وضعیت');
    } finally {
      setStatusLoading(false);
    }
  };

  // تعیین رنگ و آیکون بر اساس وضعیت
  const getStatusInfo = () => {
    switch (currentSchedule.status) {
      case 'taken':
        return {
          color: 'success',
          icon: <FaCheck />,
          text: 'مصرف شده',
          bgClass: 'bg-success',
          textClass: 'text-success'
        };
      case 'missed':
        return {
          color: 'danger',
          icon: <FaTimes />,
          text: 'مصرف نشده',
          bgClass: 'bg-danger',
          textClass: 'text-danger'
        };
      case 'skipped':
        return {
          color: 'warning',
          icon: <FaTimes />,
          text: 'رد شده',
          bgClass: 'bg-warning',
          textClass: 'text-warning'
        };
      default:
        return {
          color: 'secondary',
          icon: <FaClock />,
          text: 'در انتظار',
          bgClass: 'bg-secondary',
          textClass: 'text-secondary'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="card h-100 border-primary schedule-card">
      <div className="card-header bg-primary text-white py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaPills className="me-2" />
            <h6 className="mb-0">برنامه دارویی</h6>
          </div>
          <div className="d-flex align-items-center gap-2">
            <small className="text-white-50">
              {currentSchedule.frequency_type === 'daily' ? 'روزانه' :
               currentSchedule.frequency_type === 'weekly' ? 'هفتگی' :
               currentSchedule.frequency_type === 'custom' ? 'سفارشی' : currentSchedule.frequency_type}
            </small>
            <span className={`badge ${statusInfo.bgClass} text-white`} style={{ fontSize: '0.7rem' }}>
              {statusInfo.icon} {statusInfo.text}
            </span>
          </div>
        </div>
      </div>
      <div className="card-body py-3">
        {/* نام دارو و مقدار مصرف در یک ردیف */}
        <div className="row mb-2">
          <div className="col-8">
            <div className="d-flex align-items-center">
              <FaTablets className="me-1 text-primary" style={{ fontSize: '0.9rem' }} />
              <small className="text-muted">نام دارو:</small>
            </div>
            <div className="ps-3">
              {loading ? (
                <small className="text-muted">در حال بارگذاری...</small>
              ) : medicine ? (
                <span className="text-primary fw-bold">{medicine.name}</span>
              ) : (
                <span className="text-danger">نامشخص</span>
              )}
            </div>
          </div>
          <div className="col-4 text-end">
            <div className="d-flex align-items-center justify-content-end">
              <FaUser className="me-1 text-info" style={{ fontSize: '0.9rem' }} />
              <small className="text-muted">مقدار:</small>
            </div>
            <span className="badge bg-info">{schedule.dosage}</span>
          </div>
        </div>

        {/* تاریخ شروع */}
        <div className="mb-2">
          <div className="d-flex align-items-center">
            <FaCalendarAlt className="me-1 text-warning" style={{ fontSize: '0.9rem' }} />
            <small className="text-muted">شروع:</small>
            <span className="ms-2 small">
              {new Date(schedule.start_date).toLocaleDateString('fa-IR')}
              {schedule.end_date && (
                <span className="text-muted"> تا {new Date(schedule.end_date).toLocaleDateString('fa-IR')}</span>
              )}
            </span>
          </div>
        </div>

        {/* زمان‌های مصرف */}
        <div className="mb-2">
          <div className="d-flex align-items-center">
            <FaClock className="me-1 text-success" style={{ fontSize: '0.9rem' }} />
            <small className="text-muted">زمان‌ها:</small>
            <div className="ms-2">
              {schedule.time_slots.map((time, index) => (
                <span key={index} className="badge bg-success me-1" style={{ fontSize: '0.7rem' }}>
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="card-footer bg-light py-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group btn-group-sm" role="group">
              {onEdit && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => onEdit(currentSchedule)}
                  title="ویرایش برنامه"
                  disabled={statusLoading}
                >
                  <FaEdit />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (confirm('آیا مطمئن هستید که می‌خواهید این برنامه را حذف کنید؟')) {
                      onDelete(currentSchedule.id!);
                    }
                  }}
                  title="حذف برنامه"
                  disabled={statusLoading}
                >
                  <FaTrash />
                </button>
              )}
            </div>
            
            {/* دکمه‌های وضعیت مصرف */}
            <div className="btn-group btn-group-sm" role="group">
              {currentSchedule.status === 'taken' ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={handleMarkAsMissed}
                    title="علامت‌گذاری به عنوان مصرف نشده"
                    disabled={statusLoading}
                  >
                    <FaTimes />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleResetStatus}
                    title="بازنشانی وضعیت"
                    disabled={statusLoading}
                  >
                    <FaUndo />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={`btn btn-${statusInfo.color} btn-sm fw-bold`}
                  onClick={handleMarkAsTaken}
                  title="تیک زدن مصرف"
                  disabled={statusLoading}
                  style={{
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    minWidth: '80px'
                  }}
                >
                  {statusLoading ? (
                    <span className="spinner-border spinner-border-sm me-1" />
                  ) : (
                    <FaCheck className="me-1" />
                  )}
                  تیک مصرف
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
