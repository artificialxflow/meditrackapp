import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AddFamilyModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: { name: string; description?: string }) => void;
}

export default function AddFamilyModal({ show, onHide, onSubmit }: AddFamilyModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Family</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Family Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn-primary">Create Family</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
