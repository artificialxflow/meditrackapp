'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { SharingService, PatientShare, CreateShareData } from '@/lib/services/sharingService'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { FaShare, FaCopy, FaLink, FaTrash, FaCalendar, FaUser } from 'react-icons/fa'

interface SharePatientModalProps {
  show: boolean
  onHide: () => void
  patientId: string
  patientName: string
}

export default function SharePatientModal({ show, onHide, patientId, patientName }: SharePatientModalProps) {
  const { user } = useAuth()
  const [shares, setShares] = useState<PatientShare[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    shared_with_email: '',
    permissions: ['view'] as string[],
    expires_at: ''
  })

  // دریافت اشتراک‌های موجود
  useEffect(() => {
    if (show && patientId) {
      fetchShares()
    }
  }, [show, patientId])

  const fetchShares = async () => {
    try {
      setLoading(true)
      const data = await SharingService.getPatientShares(patientId)
      setShares(data)
    } catch (err) {
      console.error('Error fetching shares:', err)
      setError('خطا در دریافت اشتراک‌ها')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      const shareData: CreateShareData = {
        patient_id: patientId,
        shared_with_email: formData.shared_with_email || undefined,
        permissions: formData.permissions,
        expires_at: formData.expires_at || undefined
      }

      const newShare = await SharingService.createShare(user.id, shareData)
      setShares(prev => [newShare, ...prev])
      
      // Reset form
      setFormData({
        shared_with_email: '',
        permissions: ['view'],
        expires_at: ''
      })

      setSuccess('اشتراک با موفقیت ایجاد شد')
    } catch (err) {
      console.error('Error creating share:', err)
      setError('خطا در ایجاد اشتراک')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = async (token: string) => {
    const link = SharingService.generateShareLink(token)
    const success = await SharingService.copyToClipboard(link)
    
    if (success) {
      setSuccess('لینک کپی شد')
    } else {
      setError('خطا در کپی کردن لینک')
    }
  }

  const handleDeleteShare = async (shareId: string) => {
    if (!user?.id) return

    try {
      setLoading(true)
      await SharingService.deleteShare(shareId, user.id)
      setShares(prev => prev.filter(share => share.id !== shareId))
      setSuccess('اشتراک حذف شد')
    } catch (err) {
      console.error('Error deleting share:', err)
      setError('خطا در حذف اشتراک')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR')
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <FaShare className="ms-2" />
              اشتراک‌گذاری بیمار: {patientName}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* فرم ایجاد اشتراک جدید */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">ایجاد اشتراک جدید</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="shared_with_email" className="form-label">
                          <FaUser className="ms-1" />
                          ایمیل کاربر (اختیاری)
                        </label>
                        <Input
                          id="shared_with_email"
                          type="email"
                          value={formData.shared_with_email}
                          onChange={(e) => setFormData(prev => ({ ...prev, shared_with_email: e.target.value }))}
                          className="form-control"
                          placeholder="ایمیل کاربر برای اشتراک مستقیم"
                        />
                        <small className="text-muted">اگر خالی باشد، لینک عمومی ایجاد می‌شود</small>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="permissions" className="form-label">دسترسی‌ها</label>
                        <Select
                          id="permissions"
                          multiple
                          value={formData.permissions}
                          onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => option.value)
                            setFormData(prev => ({ ...prev, permissions: selected }))
                          }}
                          className="form-select"
                          options={[
                            { value: 'view', label: 'مشاهده' },
                            { value: 'edit', label: 'ویرایش' },
                            { value: 'delete', label: 'حذف' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="expires_at" className="form-label">
                      <FaCalendar className="ms-1" />
                      تاریخ انقضا (اختیاری)
                    </label>
                    <Input
                      id="expires_at"
                      type="datetime-local"
                      value={formData.expires_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
                      className="form-control"
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'در حال ایجاد...' : 'ایجاد اشتراک'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* لیست اشتراک‌های موجود */}
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">اشتراک‌های موجود</h6>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                  </div>
                ) : shares.length === 0 ? (
                  <p className="text-muted text-center py-4">هیچ اشتراکی وجود ندارد</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>لینک</th>
                          <th>دسترسی‌ها</th>
                          <th>تاریخ انقضا</th>
                          <th>تاریخ ایجاد</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shares.map((share) => (
                          <tr key={share.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <FaLink className="text-muted ms-2" />
                                <code className="small text-primary">{share.share_token.substring(0, 20)}...</code>
                                <Button
                                  onClick={() => handleCopyLink(share.share_token)}
                                  className="btn btn-sm btn-outline-success ms-2"
                                  style={{ 
                                    backgroundColor: '#28a745', 
                                    borderColor: '#28a745',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    fontSize: '0.875rem'
                                  }}
                                  title="کپی لینک"
                                >
                                  <FaCopy />
                                </Button>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                {share.permissions.map(permission => (
                                  <span key={permission} className="badge bg-primary">
                                    {permission === 'view' ? 'مشاهده' : 
                                     permission === 'edit' ? 'ویرایش' : 'حذف'}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              {share.expires_at ? formatDate(share.expires_at) : 'بدون انقضا'}
                            </td>
                            <td>
                              {share.created_at ? formatDate(share.created_at) : '-'}
                            </td>
                            <td>
                              <Button
                                onClick={() => handleDeleteShare(share.id!)}
                                className="btn btn-outline-danger btn-sm"
                                style={{ 
                                  backgroundColor: '#dc3545', 
                                  borderColor: '#dc3545',
                                  color: 'white'
                                }}
                                title="حذف"
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <Button type="button" className="btn btn-secondary" onClick={onHide}>
              بستن
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
