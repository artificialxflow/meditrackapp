'use client'

import { useState } from 'react'
import { FaPills, FaTimes, FaSave } from 'react-icons/fa'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { MedicineFormData } from '@/lib/services/medicineService'

interface AddMedicineModalProps {
  show: boolean
  onHide: () => void
  onSubmit: (medicineData: MedicineFormData) => Promise<void>
}

export default function AddMedicineModal({ show, onHide, onSubmit }: AddMedicineModalProps) {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    generic_name: '',
    dosage_form: 'قرص',
    strength: '',
    manufacturer: '',
    description: '',
    instructions: '',
    side_effects: '',
    interactions: '',
    storage_conditions: '',
    prescription_required: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dosageForms = [
    { value: 'قرص', label: 'قرص' },
    { value: 'کپسول', label: 'کپسول' },
    { value: 'شربت', label: 'شربت' },
    { value: 'آمپول', label: 'آمپول' },
    { value: 'پماد', label: 'پماد' },
    { value: 'قطره', label: 'قطره' },
    { value: 'اسپری', label: 'اسپری' }
  ]

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'نام دارو الزامی است'
    }

    if (!formData.dosage_form) {
      newErrors.dosage_form = 'فرم دارویی الزامی است'
    }

    if (!formData.strength.trim()) {
      newErrors.strength = 'مقدار دارو الزامی است'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error('Error adding medicine:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      generic_name: '',
      dosage_form: 'قرص',
      strength: '',
      manufacturer: '',
      description: '',
      instructions: '',
      side_effects: '',
      interactions: '',
      storage_conditions: '',
      prescription_required: false
    })
    setErrors({})
    setIsSubmitting(false)
    onHide()
  }

  const handleInputChange = (field: keyof MedicineFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center">
              <div className="w-8 h-8 bg-primary rounded d-flex align-items-center justify-content-center me-2">
                <FaPills className="text-white small" />
              </div>
              <h5 className="modal-title mb-0">افزودن دارو جدید</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                {/* نام دارو */}
                <div className="col-md-6">
                  <Input
                    label="نام دارو"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="مثال: پاراستامول"
                    error={errors.name}
                    required
                  />
                </div>

                {/* نام ژنریک */}
                <div className="col-md-6">
                  <Input
                    label="نام ژنریک (اختیاری)"
                    type="text"
                    value={formData.generic_name || ''}
                    onChange={(e) => handleInputChange('generic_name', e.target.value)}
                    placeholder="مثال: استامینوفن"
                  />
                </div>

                {/* فرم دارویی */}
                <div className="col-md-6">
                  <Select
                    label="فرم دارویی"
                    value={formData.dosage_form}
                    onChange={(e) => handleInputChange('dosage_form', e.target.value)}
                    options={dosageForms}
                    error={errors.dosage_form}
                    required
                  />
                </div>

                {/* مقدار دارو */}
                <div className="col-md-6">
                  <Input
                    label="مقدار دارو"
                    type="text"
                    value={formData.strength}
                    onChange={(e) => handleInputChange('strength', e.target.value)}
                    placeholder="مثال: 500mg"
                    error={errors.strength}
                    required
                  />
                </div>

                {/* سازنده */}
                <div className="col-md-6">
                  <Input
                    label="سازنده (اختیاری)"
                    type="text"
                    value={formData.manufacturer || ''}
                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                    placeholder="نام شرکت سازنده"
                  />
                </div>

                {/* نیاز به نسخه */}
                <div className="col-md-6">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="prescriptionRequired"
                      checked={formData.prescription_required}
                      onChange={(e) => handleInputChange('prescription_required', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="prescriptionRequired">
                      نیاز به نسخه دارد
                    </label>
                  </div>
                </div>

                {/* توضیحات */}
                <div className="col-12">
                  <label className="form-label">توضیحات (اختیاری)</label>
                  <textarea
                    className="form-control"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="توضیحات کلی درباره دارو..."
                    rows={3}
                  />
                </div>

                {/* دستورات مصرف */}
                <div className="col-12">
                  <label className="form-label">دستورات مصرف (اختیاری)</label>
                  <textarea
                    className="form-control"
                    value={formData.instructions || ''}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    placeholder="دستورات مصرف دارو..."
                    rows={3}
                  />
                </div>

                {/* عوارض جانبی */}
                <div className="col-12">
                  <label className="form-label">عوارض جانبی (اختیاری)</label>
                  <textarea
                    className="form-control"
                    value={formData.side_effects || ''}
                    onChange={(e) => handleInputChange('side_effects', e.target.value)}
                    placeholder="عوارض جانبی احتمالی..."
                    rows={3}
                  />
                </div>

                {/* تداخلات دارویی */}
                <div className="col-12">
                  <label className="form-label">تداخلات دارویی (اختیاری)</label>
                  <textarea
                    className="form-control"
                    value={formData.interactions || ''}
                    onChange={(e) => handleInputChange('interactions', e.target.value)}
                    placeholder="تداخلات با سایر داروها..."
                    rows={3}
                  />
                </div>

                {/* شرایط نگهداری */}
                <div className="col-12">
                  <label className="form-label">شرایط نگهداری (اختیاری)</label>
                  <textarea
                    className="form-control"
                    value={formData.storage_conditions || ''}
                    onChange={(e) => handleInputChange('storage_conditions', e.target.value)}
                    placeholder="شرایط نگهداری دارو..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Button
                type="button"
                variant="secondary"
                icon={FaTimes}
                onClick={handleClose}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={FaSave}
                loading={isSubmitting}
              >
                ذخیره دارو
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 