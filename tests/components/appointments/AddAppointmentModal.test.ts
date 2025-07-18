import { render, screen, fireEvent } from '@testing-library/react';
import AddAppointmentModal from '../../../components/appointments/AddAppointmentModal';

describe('AddAppointmentModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();
  const patientId = 'pat1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddAppointmentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    expect(screen.getByText('Add New Appointment')).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddAppointmentModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddAppointmentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<AddAppointmentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Appointment' } });
    fireEvent.change(screen.getByLabelText(/Doctor Name/i), { target: { value: 'Dr. Test' } });
    fireEvent.change(screen.getByLabelText(/Date and Time/i), { target: { value: '2023-11-01T10:00' } });
    fireEvent.change(screen.getByLabelText(/Reminder (minutes before)/i), { target: { value: '30' } });

    fireEvent.click(screen.getByText(/Add Appointment/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      patient_id: patientId,
      title: 'Test Appointment',
      doctor_name: 'Dr. Test',
      appointment_datetime: '2023-11-01T10:00',
      status: 'scheduled',
      reminder_minutes: 30,
    });
  });
});
