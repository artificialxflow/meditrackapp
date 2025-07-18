import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/ui/Button';
import { FaPlus } from 'react-icons/fa';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('renders with specified variant and size', () => {
    render(<Button variant="success" size="lg">Submit</Button>);
    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toHaveClass('btn-success', 'btn-lg');
  });

  it('renders with an icon at start position', () => {
    render(<Button icon={FaPlus}>Add</Button>);
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByTestId('fa-plus')).toBeInTheDocument(); // Assuming FaPlus renders with data-testid="fa-plus"
  });

  it('renders with an icon at end position', () => {
    render(<Button icon={FaPlus} iconPosition="end">Add</Button>);
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByTestId('fa-plus')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByRole('button', { name: /Test Button/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button', { name: /Disabled Button/i })).toBeDisabled();
  });

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/در حال بارگذاری.../i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading Button/i)).not.toBeInTheDocument(); // Text should be hidden
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button', { name: /Full Width/i })).toHaveClass('w-100');
  });
});
