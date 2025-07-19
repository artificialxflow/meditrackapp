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
      {/* عکس دارو */}
      {medicine.image_url ? (
        <img 
          src={medicine.image_url} 
          alt={`عکس ${medicine.name}`}
          className="medicine-card-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('d-none');
          }}
        />
      ) : null}
      <div className={`medicine-image-placeholder ${medicine.image_url ? 'd-none' : ''}`}>
        <FaPills className="me-2" />
        عکس دارو موجود نیست
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center mb-2">
          <FaCalendarAlt className="text-muted me-2" />
          <span className="text-muted small">
            افزوده شده: {medicine.created_at ? formatDate(medicine.created_at) : 'نامشخص'}
          </span>
        </div>
        
        {medicine.instructions && (
          <div className="d-flex align-items-start mb-2">
            <FaNotesMedical className="text-muted me-2 mt-1" />
            <span className="text-muted small">{medicine.instructions}</span>
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
              <small className="text-muted">نوع دارو:</small>
              <div className="fw-semibold">{medicine.medication_type}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">فرم دوز:</small>
              <div className="fw-semibold">{medicine.dosage_form}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">مقدار:</small>
              <div className="fw-semibold">{medicine.strength || 'نامشخص'}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">واحد:</small>
              <div className="fw-semibold">{medicine.strength_unit || 'نامشخص'}</div>
            </div>
            <div className="col-6">
              <small className="text-muted">تعداد:</small>
              <div className="fw-semibold">{medicine.quantity || 'نامشخص'}</div>
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
            
            {medicine.expiration_date && (
              <div className="col-12">
                <small className="text-muted">تاریخ انقضا:</small>
                <div className="small text-warning">{formatDate(medicine.expiration_date)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
} 