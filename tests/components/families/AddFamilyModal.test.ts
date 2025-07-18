import { render, screen, fireEvent } from '@testing-library/react';
import AddFamilyModal from '../../../components/families/AddFamilyModal';

describe('AddFamilyModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<AddFamilyModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Create New Family')).toBeInTheDocument();
    expect(screen.getByLabelText(/Family Name/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddFamilyModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<AddFamilyModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<AddFamilyModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Family Name/i), { target: { value: 'My Family' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Family description' } });

    fireEvent.click(screen.getByText(/Create Family/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'My Family',
      description: 'Family description',
    });
  });
});
