import { render, screen } from '@testing-library/react';
import VitalCard from '../../../components/vitals/VitalCard';

describe('VitalCard', () => {
  const mockVital = {
    id: '1',
    patient_id: 'pat1',
    vital_type: 'heart_rate',
    value: 75,
    unit: 'bpm',
    measured_at: '2023-10-26T10:00:00Z',
    created_by: 'user1',
  };

  it('renders vital details correctly', () => {
    render(<VitalCard vital={mockVital} />);

    expect(screen.getByText('heart rate')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('bpm')).toBeInTheDocument();
    expect(screen.getByText('10/26/2023, 12:00:00 PM')).toBeInTheDocument(); // Adjust based on locale
  });
});
