import { render, screen, fireEvent } from '@testing-library/react';
import SharePatientModal from '../../../components/patients/SharePatientModal';

describe('SharePatientModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<SharePatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Share Patient Profile')).toBeInTheDocument();
    expect(screen.getByLabelText(/Share with Email/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<SharePatientModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<SharePatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<SharePatientModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Share with Email/i), { target: { value: 'share@example.com' } });
    fireEvent.change(screen.getByLabelText(/Permission Level/i), { target: { value: 'edit_access' } });

    fireEvent.click(screen.getByText(/Share Patient/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('share@example.com', 'edit_access');
  });
});
