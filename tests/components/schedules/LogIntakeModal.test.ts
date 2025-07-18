import { render, screen, fireEvent } from '@testing-library/react';
import LogIntakeModal from '../../../components/schedules/LogIntakeModal';

describe('LogIntakeModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();
  const scheduleId = 'sch1';
  const patientId = 'pat1';
  const scheduledTime = '2023-01-01T10:00:00Z';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<LogIntakeModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} scheduleId={scheduleId} patientId={patientId} scheduledTime={scheduledTime} />);
    expect(screen.getByText('Log Medication Intake')).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<LogIntakeModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} scheduleId={scheduleId} patientId={patientId} scheduledTime={scheduledTime} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<LogIntakeModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} scheduleId={scheduleId} patientId={patientId} scheduledTime={scheduledTime} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with taken status and taken time', () => {
    render(<LogIntakeModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} scheduleId={scheduleId} patientId={patientId} scheduledTime={scheduledTime} />);

    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'taken' } });
    fireEvent.change(screen.getByLabelText(/Taken Time/i), { target: { value: '2023-01-01T10:30' } });

    fireEvent.click(screen.getByText(/Log Intake/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      schedule_id: scheduleId,
      patient_id: patientId,
      scheduled_time: scheduledTime,
      status: 'taken',
      taken_time: '2023-01-01T10:30',
    });
  });

  it('calls onSubmit with missed status and null taken time', () => {
    render(<LogIntakeModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} scheduleId={scheduleId} patientId={patientId} scheduledTime={scheduledTime} />);

    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'missed' } });

    fireEvent.click(screen.getByText(/Log Intake/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      schedule_id: scheduleId,
      patient_id: patientId,
      scheduled_time: scheduledTime,
      status: 'missed',
      taken_time: null,
    });
  });
});
