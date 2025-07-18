import { Patient } from '@/lib/services/patientService';
import { FaUser, FaBirthdayCake, FaVenusMars, FaTint } from 'react-icons/fa';
import Button from '../ui/Button';

interface PatientCardProps {
  patient: Patient;
  onDelete: (id: string) => void;
  onEdit: (patient: Patient) => void;
}

export default function PatientCard({ patient, onDelete, onEdit }: PatientCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar me-3">
            <img 
              src={patient.avatar_url || '/default-avatar.png'} 
              alt={patient.full_name} 
              className="rounded-circle" 
              loading="lazy" // Added lazy loading
            />
          </div>
          <div>
            <h5 className="card-title mb-0">{patient.full_name}</h5>
            <small className="text-muted">Patient ID: {patient.id}</small>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center">
            <FaBirthdayCake className="me-2 text-primary" />
            <span>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('fa-IR') : 'N/A'}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaVenusMars className="me-2 text-primary" />
            <span>{patient.gender || 'N/A'}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaTint className="me-2 text-primary" />
            <span>{patient.blood_type || 'N/A'}</span>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-top-0">
        <div className="d-flex justify-content-end">
          <Button className="btn-outline-secondary me-2" onClick={() => onEdit(patient)}>Edit</Button>
          <Button className="btn-outline-danger" onClick={() => onDelete(patient.id!)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}