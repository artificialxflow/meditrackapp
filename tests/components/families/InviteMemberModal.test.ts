import { render, screen, fireEvent } from '@testing-library/react';
import InviteMemberModal from '../../../components/families/InviteMemberModal';

describe('InviteMemberModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown', () => {
    render(<InviteMemberModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Invite Family Member')).toBeInTheDocument();
    expect(screen.getByLabelText(/Member Email/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<InviteMemberModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', () => {
    render(<InviteMemberModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with email when submitted', () => {
    render(<InviteMemberModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Member Email/i), { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByText(/Send Invitation/i));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
  });
});
