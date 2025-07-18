'use client'

import { useState } from 'react'
import { FaPills, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaClock, FaNotesMedical, FaIndustry, FaPrescriptionBottle } from 'react-icons/fa'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Medicine } from '@/lib/services/medicineService'

interface MedicineCardProps {
  medicine: Medicine
  onDelete: (id: string) => void
  onEdit?: (medicine: Medicine) => void
}

export default function MedicineCard({ medicine, onDelete, onEdit }: MedicineCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm(`آیا مطمئن هستید که می‌خواهید "${medicine.name}" را حذف کنید؟`)) {
      setIsDeleting(true)
      try {
        await onDelete(medicine.id!)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR')
  }

  const getDosageFormColor = (dosageForm: string) => {
    const colors: { [key: string]: string } = {
      'قرص': 'primary',
      'کپسول': 'success',
      'شربت': 'warning',
      'آمپول': 'danger',
      'پماد': 'info',
      'قطره': 'secondary',
      'اسپری': 'dark'
    }
    return colors[dosageForm] || 'primary'
  }

  const dosageFormColor = getDosageFormColor(medicine.dosage_form)

  return (
    <Card
      icon={FaPills}
      iconColor={dosageFormColor}
      title={medicine.name}
      subtitle={`${medicine.strength} - ${medicine.dosage_form}`}
      hover
      shadow="md"
      className="h-100"
    >
      <div className="mb-3">
        {medicine.generic_name && (
          <div className="d-flex align-items-center mb-2">
            <FaPrescriptionBottle className="text-muted me-2" />
            <span className="text-muted small">{medicine.generic_name}</span>
          </div>
        )}
        
        {medicine.manufacturer && (
          <div className="d-flex align-items-center mb-2">
            <FaIndustry className="text-muted me-2" />
            <span className="text-muted small">{medicine.manufacturer}</span>
          </div>
        )}
        
        <div className="d-flex align-items-center mb-2">
          <FaCalendarAlt className="text-muted me-2" />
          <span className="text-muted small">
            افزوده شده: {medicine.created_at ? formatDate(medicine.created_at) : 'نامشخص'}
          </span>
        </div>
        
        {medicine.description && (
          <div className="d-flex align-items-start mb-2">
            <FaNotesMedical className="text-muted me-2 mt-1" />
            <span className="text-muted small">{medicine.description}</span>
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          icon={FaEye}
          onClick={() => setShowDetails(!showDetails)}
          className="flex-fill"
        >
          جزئیات
        </Button>
        
        {onEdit && (
          <Button
            variant="outline-warning"
            size="sm"
            icon={FaEdit}
            onClick={() => onEdit(medicine)}
          >
            ویرایش
          </Button>
        )}
        
        <Button
          variant="outline-danger"
          size="sm"
          icon={FaTrash}
          loading={isDeleting}
          onClick={handleDelete}
        >
          حذف
        </Button>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="mt-3 pt-3 border-top">
          <h6 className="fw-semibold mb-2">اطلاعات تکمیلی</h6>
          <div className="row g-2">
            <div className="col-6">
              <small className="text-muted">فرم دارویی:</small>
              <div className="fw-semibold">{medicine.dosage_form}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">مقدار:</small>
              <div className="fw-semibold">{medicine.strength}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">نسخه‌ای:</small>
              <div>
                <span className={`badge bg-${medicine.prescription_required ? 'warning' : 'success'}`}>
                  {medicine.prescription_required ? 'بله' : 'خیر'}
                </span>
              </div>
            </div>
            <div className="col-6">
              <small className="text-muted">وضعیت:</small>
              <div>
                <span className={`badge bg-${medicine.is_active ? 'success' : 'secondary'}`}>
                  {medicine.is_active ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
            </div>
            
            {medicine.instructions && (
              <div className="col-12">
                <small className="text-muted">دستورات مصرف:</small>
                <div className="small">{medicine.instructions}</div>
              </div>
            )}
            
            {medicine.side_effects && (
              <div className="col-12">
                <small className="text-muted">عوارض جانبی:</small>
                <div className="small text-warning">{medicine.side_effects}</div>
              </div>
            )}
            
            {medicine.interactions && (
              <div className="col-12">
                <small className="text-muted">تداخلات دارویی:</small>
                <div className="small text-danger">{medicine.interactions}</div>
              </div>
            )}
            
            {medicine.storage_conditions && (
              <div className="col-12">
                <small className="text-muted">شرایط نگهداری:</small>
                <div className="small text-info">{medicine.storage_conditions}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
} 