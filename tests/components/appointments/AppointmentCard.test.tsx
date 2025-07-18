import { render, screen } from '@testing-library/react';
import AppointmentCard from '../../../components/appointments/AppointmentCard';

describe('AppointmentCard', () => {
  const mockAppointment = {
    id: '1',
    patient_id: 'pat1',
    title: 'Dental Checkup',
    doctor_name: 'Dr. Smith',
    appointment_datetime: '2023-10-26T10:00:00Z',
    status: 'scheduled',
    created_by: 'user1',
  };

  it('renders appointment details correctly', () => {
    render(<AppointmentCard appointment={mockAppointment} />);

    expect(screen.getByText('Dental Checkup')).toBeInTheDocument();
    expect(screen.getByText('scheduled')).toBeInTheDocument();
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('10/26/2023, 12:00:00 PM')).toBeInTheDocument(); // Adjust based on locale
  });
});
