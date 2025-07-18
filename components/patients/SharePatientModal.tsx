import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface SharePatientModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (email: string, permission: 'view_only' | 'edit_access' | 'full_access') => void;
}

export default function SharePatientModal({ show, onHide, onSubmit }: SharePatientModalProps) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'view_only' | 'edit_access' | 'full_access'>('view_only');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, permission);
    setEmail('');
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Patient Profile</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Share with Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Permission Level</label>
                <Select value={permission} onChange={(e) => setPermission(e.target.value as 'view_only' | 'edit_access' | 'full_access')}>
                  <option value="view_only">View Only</option>
                  <option value="edit_access">Edit Access</option>
                  <option value="full_access">Full Access</option>
                </Select>
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Share Patient</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
