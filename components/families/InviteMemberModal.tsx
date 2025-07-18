import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface InviteMemberModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (email: string) => void;
}

export default function InviteMemberModal({ show, onHide, onSubmit }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
    setEmail('');
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invite Family Member</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Member Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Send Invitation</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
