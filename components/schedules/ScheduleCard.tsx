import { Schedule } from '@/lib/services/scheduleService';
import { FaClock, FaCalendarAlt, FaPills } from 'react-icons/fa';

interface ScheduleCardProps {
  schedule: Schedule;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <FaPills className="me-3 text-primary" style={{ fontSize: '2rem' }} />
          <div>
            <h5 className="card-title mb-0">Medication Schedule</h5>
            <small className="text-muted">For Medication ID: {schedule.medication_id}</small>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-primary" />
            <span>{schedule.start_date} to {schedule.end_date || 'Ongoing'}</span>
          </div>
          <div className="list-group-item d-flex align-items-center">
            <FaClock className="me-2 text-primary" />
            <span>{schedule.time_slots.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
