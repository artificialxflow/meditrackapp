import { render, screen, fireEvent } from '@testing-library/react';
import AddVitalModal from '../../../components/vitals/AddVitalModal';

describe('AddVitalModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();
  const patientId = 'pat1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddVitalModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    expect(screen.getByText('Add New Vital')).toBeInTheDocument();
    expect(screen.getByLabelText(/Vital Type/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddVitalModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddVitalModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<AddVitalModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);

    fireEvent.change(screen.getByLabelText(/Vital Type/i), { target: { value: 'blood_pressure' } });
    fireEvent.change(screen.getByLabelText(/Value/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/Unit/i), { target: { value: 'mmHg' } });

    fireEvent.click(screen.getByText(/Add Vital/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      patient_id: patientId,
      vital_type: 'blood_pressure',
      value: 120,
      unit: 'mmHg',
    }));
  });
});
