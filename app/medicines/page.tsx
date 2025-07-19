'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { MedicineService, Medicine, MedicineFormData, MedicationType, DosageForm } from '@/lib/services/medicineService'
import MedicineCard from '@/components/medicines/MedicineCard'
import AddMedicineModal from '@/components/medicines/AddMedicineModal'
import AppWrapper from '@/components/AppWrapper'

import Loading from '@/components/Loading'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FaPlus, FaSearch, FaSort } from 'react-icons/fa'

export default function MedicinesPage() {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterDosageForm, setFilterDosageForm] = useState<DosageForm | '' >('')
  const [error, setError] = useState('')
  const [patientId, setPatientId] = useState<string | null>(null)

  // Fetch the patient ID for the current user
  useEffect(() => {
    async function fetchPatientId() {
      if (user?.id) {
        try {
          const id = await MedicineService.getPatientIdForUser(user.id)
          if (!id) {
            // Create a default patient for the user if none exists
            const { PatientService } = await import('@/lib/services/patientService')
            const defaultPatient = await PatientService.addPatient(user.id, {
              full_name: user.email?.split('@')[0] || 'کاربر',
              gender: 'other'
            })
            setPatientId(defaultPatient.id || null)
          } else {
            setPatientId(id)
          }
        } catch (err) {
          console.error('Error fetching/creating patient:', err)
          setError('خطا در ایجاد پروفایل بیمار')
        }
      }
    }
    fetchPatientId()
  }, [user?.id])

  // Fetch medicines from Supabase
  const fetchMedicines = useCallback(async () => {
    if (!patientId) return
    
    try {
      setLoading(true)
      setError('')
      const data = await MedicineService.getMedicines(patientId)
      setMedicines(data)
      setFilteredMedicines(data)
    } catch (err) {
      console.error('Error fetching medicines:', err)
      setError('خطا در دریافت داروها')
    } finally {
      setLoading(false)
    }
  }, [patientId])

  // Add a new medicine
  const handleAddMedicine = async (medicineData: MedicineFormData) => {
    if (!user?.id || !patientId) return
    
    try {
      setError('')
      const newMedicine = await MedicineService.addMedicine(patientId, user.id, medicineData)
      setMedicines(prev => [newMedicine, ...prev])
      setFilteredMedicines(prev => [newMedicine, ...prev])
      setShowAddModal(false)
    } catch (err) {
      console.error('Error adding medicine:', err)
      setError('خطا در اضافه کردن دارو')
    }
  }

  // Delete a medicine
  const handleDeleteMedicine = async (medicineId: string) => {
    try {
      setError('')
      await MedicineService.deleteMedicine(medicineId)
      setMedicines(prev => prev.filter(m => m.id !== medicineId))
      setFilteredMedicines(prev => prev.filter(m => m.id !== medicineId))
    } catch (err) {
      console.error('Error deleting medicine:', err)
      setError('خطا در حذف دارو')
    }
  }

  // Search and filter
  useEffect(() => {
    let filtered = [...medicines]

    if (searchTerm) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterDosageForm) {
      filtered = filtered.filter(medicine => medicine.dosage_form === filterDosageForm)
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof Medicine] as string | number | undefined
      const bValue = b[sortBy as keyof Medicine] as string | number | undefined
      const aStr = String(aValue || '').toLowerCase()
      const bStr = String(bValue || '').toLowerCase()

      return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })

    setFilteredMedicines(filtered)
  }, [medicines, searchTerm, sortBy, sortOrder, filterDosageForm])

  // Fetch medicines when patientId is available
  useEffect(() => {
    if (patientId) {
      fetchMedicines()
    }
  }, [patientId, fetchMedicines])

  if (!user) {
    return (
      <div className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8 text-center">
          <Loading />
          <p className="mt-4 text-muted">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    )
  }

  return (
    <AppWrapper>
      <div className="min-h-screen bg-light">
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 text-primary mb-2">مدیریت داروها</h1>
              <p className="text-muted mb-0">داروهای خود را مدیریت کنید</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="btn-primary">
              <FaPlus className="ms-2" />
              افزودن دارو
            </Button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text"><FaSearch /></span>
                  <Input
                    type="text"
                    placeholder="جستجو در داروها..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <Select
                  value={filterDosageForm}
                  onChange={(e) => setFilterDosageForm(e.target.value as DosageForm)}
                  className="form-select"
                  options={[
                    { value: '', label: 'همه فرم‌ها' },
                    { value: 'tablet', label: 'قرص' },
                    { value: 'capsule', label: 'کپسول' },
                    { value: 'liquid', label: 'شربت' },
                    { value: 'injection', label: 'آمپول' },
                    { value: 'cream', label: 'پماد' },
                    { value: 'drops', label: 'قطره' },
                    { value: 'suppository', label: 'شیاف' },
                    { value: 'inhaler', label: 'اسپری' }
                  ]}
                />
              </div>

              <div className="col-md-3">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  options={[
                    { value: 'name', label: 'نام' },
                    { value: 'created_at', label: 'تاریخ اضافه' },
                    { value: 'dosage_form', label: 'فرم دارویی' }
                  ]}
                />
              </div>

              <div className="col-md-2">
                <Button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="btn-outline-secondary w-100">
                  <FaSort className="ms-2" />
                  {sortOrder === 'asc' ? 'صعودی' : 'نزولی'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Loading />
            <p className="mt-3 text-muted">در حال دریافت داروها...</p>
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4"><FaPlus className="text-muted" style={{ fontSize: '3rem' }} /></div>
            <h3 className="h4 text-muted mb-3">هیچ دارویی یافت نشد</h3>
            <p className="text-muted mb-4">
              {searchTerm || filterDosageForm ? 'هیچ دارویی با فیلترهای انتخاب شده مطابقت ندارد' : 'هنوز هیچ دارویی اضافه نکرده‌اید'}
            </p>
            {!searchTerm && !filterDosageForm && (
              <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                <FaPlus className="ms-2" />
                افزودن اولین دارو
              </Button>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="col-lg-6 col-xl-4">
                <MedicineCard medicine={medicine} onDelete={handleDeleteMedicine} />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddMedicineModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddMedicine}
      />
      </div>
    </AppWrapper>
  )
}