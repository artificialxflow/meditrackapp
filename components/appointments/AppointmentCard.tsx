import { Appointment } from '@/lib/services/appointmentService';
import { FaCalendarCheck, FaUserMd, FaClock } from 'react-icons/fa';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <FaCalendarCheck className="me-3 text-primary" style={{ fontSize: '2rem' }} />
          <div>
            <h5 className="card-title mb-0">{appointment.title}</h5>
            <small className="text-muted">{appointment.status}</small>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center">
            <FaUserMd className="me-2 text-primary" />
            <span>{appointment.doctor_name || 'N/A'}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaClock className="me-2 text-primary" />
            <span>{new Date(appointment.appointment_datetime).toLocaleString('fa-IR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
