import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Vital } from '@/lib/services/vitalsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VitalChartProps {
  vitals: Vital[];
  vitalType: Vital['vital_type'];
}

export default function VitalChart({ vitals, vitalType }: VitalChartProps) {
  const filteredVitals = vitals.filter(v => v.vital_type === vitalType);

  const data = {
    labels: filteredVitals.map(v => new Date(v.measured_at).toLocaleDateString()),
    datasets: [
      {
        label: vitalType.replace('_', ' '),
        data: filteredVitals.map(v => v.value),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${vitalType.replace('_', ' ')} Over Time`,
      },
    },
  };

  return (
    <div className="card p-3">
      <Line data={data} options={options} />
    </div>
  );
}
