import { render, screen } from '@testing-library/react';
import VitalChart from '../../../components/vitals/VitalChart';
import { Chart as ChartJS } from 'chart.js';

// Mock ChartJS register to avoid actual chart rendering issues in tests
jest.mock('chart.js', () => ({
  Chart as ChartJS: {
    register: jest.fn(),
  },
  CategoryScale: {}, LinearScale: {}, PointElement: {}, LineElement: {}, Title: {}, Tooltip: {}, Legend: {}
}));

jest.mock('react-chartjs-2', () => ({
  Line: ({ data, options }: any) => {
    return (
      <div data-testid="mock-line-chart">
        <p>{options.plugins.title.text}</p>
        <p>{data.labels.join(', ')}</p>
        <p>{data.datasets[0].label}: {data.datasets[0].data.join(', ')}</p>
      </div>
    );
  },
}));

describe('VitalChart', () => {
  const mockVitals = [
    { id: '1', patient_id: 'pat1', vital_type: 'heart_rate', value: 70, unit: 'bpm', measured_at: '2023-01-01T10:00:00Z', created_by: 'user1' },
    { id: '2', patient_id: 'pat1', vital_type: 'heart_rate', value: 72, unit: 'bpm', measured_at: '2023-01-02T10:00:00Z', created_by: 'user1' },
    { id: '3', patient_id: 'pat1', vital_type: 'blood_pressure', value: 120, unit: 'mmHg', measured_at: '2023-01-01T10:00:00Z', created_by: 'user1' },
  ];

  it('renders the chart with correct data for heart rate', () => {
    render(<VitalChart vitals={mockVitals} vitalType="heart_rate" />);

    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
    expect(screen.getByText('heart rate Over Time')).toBeInTheDocument();
    expect(screen.getByText('1/1/2023, 1/2/2023')).toBeInTheDocument();
    expect(screen.getByText('heart rate: 70, 72')).toBeInTheDocument();
  });

  it('renders the chart with correct data for blood pressure', () => {
    render(<VitalChart vitals={mockVitals} vitalType="blood_pressure" />);

    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
    expect(screen.getByText('blood pressure Over Time')).toBeInTheDocument();
    expect(screen.getByText('1/1/2023')).toBeInTheDocument();
    expect(screen.getByText('blood pressure: 120')).toBeInTheDocument();
  });
});
