import { render, screen, fireEvent } from '@testing-library/react';
import AddPatientModal from '../../../components/patients/AddPatientModal';

describe('AddPatientModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddPatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Add New Patient')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddPatientModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddPatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<AddPatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1995-10-20' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'female' } });
    fireEvent.change(screen.getByLabelText(/Blood Type/i), { target: { value: 'B+' } });

    fireEvent.click(screen.getByText(/Add Patient/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      full_name: 'Jane Doe',
      date_of_birth: '1995-10-20',
      gender: 'female',
      blood_type: 'B+',
    });
  });

  it('populates form with initialData when provided', () => {
    const initialData = {
      full_name: 'Existing Patient',
      date_of_birth: '1980-01-01',
      gender: 'male',
      blood_type: 'O-',
    };
    render(<AddPatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Existing Patient');
    expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue('1980-01-01');
    expect(screen.getByLabelText(/Gender/i)).toHaveValue('male');
    expect(screen.getByLabelText(/Blood Type/i)).toHaveValue('O-');
    expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
  });
});
