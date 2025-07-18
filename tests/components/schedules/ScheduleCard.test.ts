import { render, screen } from '@testing-library/react';
import ScheduleCard from '../../../components/schedules/ScheduleCard';

describe('ScheduleCard', () => {
  const mockSchedule = {
    id: '1',
    medication_id: 'med1',
    patient_id: 'pat1',
    dosage: 1,
    frequency_type: 'daily',
    start_date: '2023-01-01',
    end_date: null,
    time_slots: ['08:00', '20:00'],
    is_active: true,
    created_by: 'user1',
  };

  it('renders schedule details correctly', () => {
    render(<ScheduleCard schedule={mockSchedule} />);

    expect(screen.getByText('Medication Schedule')).toBeInTheDocument();
    expect(screen.getByText('For Medication ID: med1')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01 to Ongoing')).toBeInTheDocument();
    expect(screen.getByText('08:00, 20:00')).toBeInTheDocument();
  });
});
