import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddMedicineModal from '../../../components/medicines/AddMedicineModal';

describe('AddMedicineModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddMedicineModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Add New Medicine')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddMedicineModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddMedicineModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<AddMedicineModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Med' } });
    fireEvent.change(screen.getByLabelText(/Medication Type/i), { target: { value: 'liquid' } });
    fireEvent.change(screen.getByLabelText(/Dosage Form/i), { target: { value: 'ml' } });
    fireEvent.change(screen.getByLabelText(/Strength/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Strength Unit/i), { target: { value: 'ml' } });
    fireEvent.change(screen.getByLabelText(/Instructions/i), { target: { value: 'Take daily' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: '2024-12-31' } });

    fireEvent.click(screen.getByText(/Add Medicine/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test Med',
      medication_type: 'liquid',
      dosage_form: 'ml',
      strength: 10,
      strength_unit: 'ml',
      instructions: 'Take daily',
      quantity: 30,
      expiration_date: '2024-12-31',
    });
  });

  it('populates form with initialData when provided', () => {
    const initialData = {
      name: 'Existing Med',
      medication_type: 'capsule',
      dosage_form: 'mg',
      strength: 50,
      strength_unit: 'mg',
      instructions: 'Take twice daily',
      quantity: 60,
      expiration_date: '2025-06-30',
    };
    render(<AddMedicineModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/Name/i)).toHaveValue('Existing Med');
    expect(screen.getByLabelText(/Medication Type/i)).toHaveValue('capsule');
    expect(screen.getByLabelText(/Dosage Form/i)).toHaveValue('mg');
    expect(screen.getByLabelText(/Strength/i)).toHaveValue(50);
    expect(screen.getByLabelText(/Strength Unit/i)).toHaveValue('mg');
    expect(screen.getByLabelText(/Instructions/i)).toHaveValue('Take twice daily');
    expect(screen.getByLabelText(/Quantity/i)).toHaveValue(60);
    expect(screen.getByLabelText(/Expiration Date/i)).toHaveValue('2025-06-30');
    expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
  });
});
