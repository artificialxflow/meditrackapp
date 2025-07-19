import { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTrash, FaCamera } from 'react-icons/fa';

interface MedicineImageUploadProps {
  currentImageUrl?: string | null;
  onImageChange: (file: File | null, imageUrl: string | null) => void;
  medicineName?: string;
}

export default function MedicineImageUpload({ 
  currentImageUrl, 
  onImageChange, 
  medicineName 
}: MedicineImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // بررسی نوع فایل
    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری انتخاب کنید');
      return;
    }

    // بررسی اندازه فایل (حداکثر 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم فایل نباید بیشتر از 5 مگابایت باشد');
      return;
    }

    setUploading(true);

    // ایجاد preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewUrl(url);
      onImageChange(file, url);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCapturePhoto = () => {
    // ایجاد یک input برای دوربین
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    };
    
    input.click();
  };

  return (
    <div className="medicine-image-upload">
      <label className="form-label d-flex align-items-center">
        <FaImage className="me-2" />
        عکس دارو
        {medicineName && (
          <small className="text-muted ms-2">({medicineName})</small>
        )}
      </label>
      
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${previewUrl ? 'has-image' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="upload-loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">در حال آپلود...</span>
            </div>
            <p className="mt-2 mb-0">در حال آپلود عکس...</p>
          </div>
        ) : previewUrl ? (
          <div className="image-preview">
            <img src={previewUrl} alt="عکس دارو" className="preview-image" />
            <div className="image-overlay">
              <div className="overlay-buttons">
                <button
                  type="button"
                  className="btn btn-light btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title="تغییر عکس"
                >
                  <FaUpload />
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCapturePhoto();
                  }}
                  title="عکس گرفتن"
                >
                  <FaCamera />
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  title="حذف عکس"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <FaImage className="upload-icon" />
            <p className="upload-text">
              برای آپلود عکس کلیک کنید یا فایل را اینجا بکشید
            </p>
            <p className="upload-hint">
              فرمت‌های پشتیبانی شده: JPG, PNG, GIF (حداکثر 5MB)
            </p>
            <div className="upload-buttons">
              <button
                type="button"
                className="btn btn-primary btn-sm me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <FaUpload className="me-1" />
                انتخاب فایل
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCapturePhoto();
                }}
              >
                <FaCamera className="me-1" />
                عکس گرفتن
              </button>
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
} 