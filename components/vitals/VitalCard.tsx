import { Vital } from '@/lib/services/vitalsService';
import { FaHeartbeat, FaThermometerHalf, FaWeight, FaRulerVertical, FaTint, FaPlus, FaStethoscope } from 'react-icons/fa';

interface VitalCardProps {
  vital: Vital;
}

const VitalIcon = ({ type }: { type: Vital['vital_type'] }) => {
  switch (type) {
    case 'blood_pressure': return <FaStethoscope />;
    case 'heart_rate': return <FaHeartbeat />;
    case 'temperature': return <FaThermometerHalf />;
    case 'weight': return <FaWeight />;
    case 'height': return <FaRulerVertical />;
    case 'blood_sugar': return <FaTint />;
    case 'oxygen_saturation': return <FaPlus />;
    default: return <FaHeartbeat />;
  }
};

export default function VitalCard({ vital }: VitalCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 text-primary" style={{ fontSize: '2rem' }}><VitalIcon type={vital.vital_type} /></div>
          <div>
            <h5 className="card-title mb-0">{vital.vital_type.replace('_', ' ')}</h5>
            <small className="text-muted">{new Date(vital.measured_at).toLocaleString('fa-IR')}</small>
          </div>
        </div>
        <div className="text-center">
          <h3 className="display-4">{vital.value}</h3>
          <p className="text-muted">{vital.unit}</p>
        </div>
      </div>
    </div>
  );
}
