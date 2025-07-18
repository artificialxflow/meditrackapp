import { Family } from '@/lib/services/familyService';
import { FaUsers } from 'react-icons/fa';

interface FamilyCardProps {
  family: Family;
}

export default function FamilyCard({ family }: FamilyCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <FaUsers className="me-3 text-primary" style={{ fontSize: '2rem' }} />
          <div>
            <h5 className="card-title mb-0">{family.name}</h5>
            <small className="text-muted">{family.description}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
