import { render, screen, fireEvent } from '@testing-library/react';
import PatientCard from '../../../components/patients/PatientCard';

describe('PatientCard', () => {
  const mockPatient = {
    id: '1',
    full_name: 'John Doe',
    date_of_birth: '1990-05-15',
    gender: 'male',
    blood_type: 'A+',
    avatar_url: '/test-avatar.png',
    created_by: 'user1',
  };

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  it('renders patient details correctly', () => {
    render(<PatientCard patient={mockPatient} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Patient ID: 1')).toBeInTheDocument();
    expect(screen.getByText('5/15/1990')).toBeInTheDocument(); // Adjust based on locale
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('A+')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/test-avatar.png');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<PatientCard patient={mockPatient} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockOnDelete).toHaveBeenCalledWith(mockPatient.id);
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<PatientCard patient={mockPatient} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByText(/Edit/i));
    expect(mockOnEdit).toHaveBeenCalledWith(mockPatient);
  });
});
