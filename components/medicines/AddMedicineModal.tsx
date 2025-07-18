import { useState, useEffect } from 'react';
import { MedicineFormData, MedicationType, DosageForm } from '@/lib/services/medicineService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AddMedicineModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: MedicineFormData) => void;
  initialData?: MedicineFormData | null;
}

export default function AddMedicineModal({ show, onHide, onSubmit, initialData }: AddMedicineModalProps) {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    medication_type: 'tablet',
    dosage_form: 'mg',
    strength: undefined,
    strength_unit: '',
    instructions: '',
    quantity: undefined,
    expiration_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        medication_type: 'tablet',
        dosage_form: 'mg',
        strength: undefined,
        strength_unit: '',
        instructions: '',
        quantity: undefined,
        expiration_date: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'strength' || name === 'quantity' ? (value ? parseFloat(value) : undefined) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{initialData ? 'Edit Medicine' : 'Add New Medicine'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="medication_type" className="form-label">Medication Type</label>
                <Select id="medication_type" name="medication_type" value={formData.medication_type} onChange={handleChange} className="form-select">
                  <option value="tablet">Tablet</option>
                  <option value="capsule">Capsule</option>
                  <option value="liquid">Liquid</option>
                  <option value="injection">Injection</option>
                  <option value="inhaler">Inhaler</option>
                  <option value="cream">Cream</option>
                  <option value="drops">Drops</option>
                  <option value="suppository">Suppository</option>
                </Select>
              </div>
              <div className="mb-3">
                <label htmlFor="dosage_form" className="form-label">Dosage Form</label>
                <Select id="dosage_form" name="dosage_form" value={formData.dosage_form} onChange={handleChange} className="form-select">
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="ml">ml</option>
                  <option value="units">units</option>
                  <option value="puffs">puffs</option>
                  <option value="drops">drops</option>
                  <option value="tablets">tablets</option>
                  <option value="capsules">capsules</option>
                </Select>
              </div>
              <div className="mb-3">
                <label htmlFor="strength" className="form-label">Strength</label>
                <Input id="strength" type="number" name="strength" value={formData.strength || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="strength_unit" className="form-label">Strength Unit</label>
                <Input id="strength_unit" name="strength_unit" value={formData.strength_unit || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="instructions" className="form-label">Instructions</label>
                <Input id="instructions" name="instructions" value={formData.instructions || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <Input id="quantity" type="number" name="quantity" value={formData.quantity || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="expiration_date" className="form-label">Expiration Date</label>
                <Input id="expiration_date" type="date" name="expiration_date" value={formData.expiration_date || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>Cancel</Button>
                <Button type="submit" className="btn btn-primary">{initialData ? 'Save Changes' : 'Add Medicine'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
