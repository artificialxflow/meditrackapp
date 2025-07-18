import { useState } from 'react';
import Button from './ui/Button';

interface AvatarUploadProps {
  onUpload: (file: File) => void;
  currentAvatarUrl?: string | null;
}

export default function AvatarUpload({ onUpload, currentAvatarUrl }: AvatarUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="card">
      <div className="card-body text-center">
        {previewUrl ? (
          <img src={previewUrl} alt="Avatar Preview" className="rounded-circle mb-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ) : (
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
            <span>No Avatar</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-3" />
          <Button type="submit" className="btn-primary" disabled={!file}>Upload Avatar</Button>
        </form>
      </div>
    </div>
  );
}
