import { render, screen, fireEvent } from '@testing-library/react';
import AddScheduleModal from '../../../components/schedules/AddScheduleModal';

describe('AddScheduleModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();
  const patientId = 'pat1';
  const medicationId = 'med1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddScheduleModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} medicationId={medicationId} />);
    expect(screen.getByText('Add New Schedule')).toBeInTheDocument();
    // Add more assertions for form fields if they were fully implemented
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddScheduleModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} medicationId={medicationId} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddScheduleModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} medicationId={medicationId} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  // Note: This test is basic as the form fields in the component are placeholders.
  // It should be expanded once the form is fully implemented.
  it('calls onSubmit when submitted', () => {
    render(<AddScheduleModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} medicationId={medicationId} />);
    fireEvent.click(screen.getByText(/Add Schedule/i));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      patient_id: patientId,
      medication_id: medicationId,
    }));
  });
});
