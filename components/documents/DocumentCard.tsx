import { Document } from '@/lib/services/documentService';
import { FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <FaFileAlt className="me-3 text-primary" style={{ fontSize: '2rem' }} />
          <div>
            <h5 className="card-title mb-0">{document.title}</h5>
            <small className="text-muted">{document.document_type}</small>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-primary" />
            <span>{document.document_date ? new Date(document.document_date).toLocaleDateString('fa-IR') : 'N/A'}</span>
          </div>
        </div>
        <a href={document.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">View Document</a>
      </div>
    </div>
  );
}
