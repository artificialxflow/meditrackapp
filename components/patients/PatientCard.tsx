import { Patient } from '@/lib/services/patientService';
import { FaUser, FaBirthdayCake, FaVenusMars, FaTint, FaShare } from 'react-icons/fa';
import Button from '../ui/Button';
import { Avatar } from '@/components/ui/Avatar';

interface PatientCardProps {
  patient: Patient;
  onDelete: (id: string) => void;
  onEdit: (patient: Patient) => void;
  onShare: (patient: Patient) => void;
}

export default function PatientCard({ patient, onDelete, onEdit, onShare }: PatientCardProps) {
  const getGenderText = (gender: string | null | undefined) => {
    switch (gender) {
      case 'male': return 'مرد';
      case 'female': return 'زن';
      case 'other': return 'سایر';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            <Avatar
              src={patient.avatar_url || undefined}
              name={patient.full_name || undefined}
              size={50}
            />
          </div>
          <div>
            <h5 className="card-title mb-0">{patient.full_name}</h5>
            <small className="text-muted">شناسه: {patient.id}</small>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center">
            <FaBirthdayCake className="me-2 text-primary" />
            <span>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('fa-IR') : 'نامشخص'}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaVenusMars className="me-2 text-primary" />
            <span>{getGenderText(patient.gender)}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaTint className="me-2 text-primary" />
            <span>{patient.blood_type || 'نامشخص'}</span>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-top-0">
        <div className="d-flex justify-content-end">
          <Button 
            className="btn-success me-2" 
            onClick={() => onShare(patient)}
            style={{ 
              backgroundColor: '#28a745', 
              borderColor: '#28a745',
              color: 'white',
              fontWeight: '500'
            }}
          >
            <FaShare className="ms-1" />
            اشتراک
          </Button>
          <Button className="btn-outline-secondary me-2" onClick={() => onEdit(patient)}>ویرایش</Button>
          <Button className="btn-outline-danger" onClick={() => onDelete(patient.id!)}>حذف</Button>
        </div>
      </div>
    </div>
  );
}