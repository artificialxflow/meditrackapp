import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../../../components/ui/Select';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders with a label and select field', () => {
    render(<Select label="Choose an option" options={options} />);
    expect(screen.getByLabelText(/Choose an option/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders options correctly', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('option', { name: /Option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Option 2/i })).toBeInTheDocument();
  });

  it('displays placeholder when provided', () => {
    render(<Select options={options} placeholder="Select..." />);
    expect(screen.getByRole('option', { name: /Select.../i })).toBeInTheDocument();
  });

  it('calls onChange handler when select value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('option2');
  });

  it('displays error message', () => {
    render(<Select options={options} error="Invalid selection" />);
    expect(screen.getByText(/Invalid selection/i)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Select options={options} helperText="Some helpful text" />);
    expect(screen.getByText(/Some helpful text/i)).toBeInTheDocument();
  });
});
