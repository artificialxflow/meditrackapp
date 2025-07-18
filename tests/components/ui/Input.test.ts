import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/ui/Input';
import { FaUser } from 'react-icons/fa';

describe('Input', () => {
  it('renders with a label and input field', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/Enter text/i)).toBeInTheDocument();
  });

  it('renders with an icon at start position', () => {
    render(<Input icon={FaUser} />);
    expect(screen.getByTestId('fa-user')).toBeInTheDocument(); // Assuming FaUser renders with data-testid="fa-user"
  });

  it('renders with an icon at end position', () => {
    render(<Input icon={FaUser} iconPosition="end" />);
    expect(screen.getByTestId('fa-user')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input error="Invalid input" />);
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input helperText="Some helpful text" />);
    expect(screen.getByText(/Some helpful text/i)).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Input fullWidth />);
    expect(screen.getByRole('textbox').closest('.input-group')).toHaveClass('w-100');
  });
});
