import { render, screen, fireEvent } from '@testing-library/react';
import MedicineCard from '../../../components/medicines/MedicineCard';

describe('MedicineCard', () => {
  const mockMedicine = {
    id: '1',
    patient_id: 'pat1',
    name: 'Aspirin',
    medication_type: 'tablet',
    dosage_form: 'mg',
    strength: 100,
    strength_unit: 'mg',
    instructions: 'Take with water',
    is_active: true,
    created_by: 'user1',
  };

  const mockOnDelete = jest.fn();

  it('renders medicine details correctly', () => {
    render(<MedicineCard medicine={mockMedicine} onDelete={mockOnDelete} />);

    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText('100 mg')).toBeInTheDocument();
    expect(screen.getByText('Take with water')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<MedicineCard medicine={mockMedicine} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockOnDelete).toHaveBeenCalledWith(mockMedicine.id);
  });
});
