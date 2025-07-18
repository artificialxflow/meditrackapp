import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddDocumentModal from '../../../components/documents/AddDocumentModal';
import { DocumentService } from '@/lib/services/documentService';
import { CategoryService } from '@/lib/services/categoryService';

jest.mock('@/lib/services/documentService');
jest.mock('@/lib/services/categoryService');

describe('AddDocumentModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnHide = jest.fn();
  const patientId = 'pat1';

  beforeEach(() => {
    jest.clearAllMocks();
    (CategoryService.getCategories as jest.Mock).mockResolvedValue([
      { id: 'cat1', name: 'Category 1', category_type: 'document' },
    ]);
    (DocumentService.uploadFile as jest.Mock).mockResolvedValue('http://example.com/uploaded.pdf');
  });

  it('renders correctly when shown', async () => {
    render(<AddDocumentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    await waitFor(() => expect(screen.getByText('Add New Document')).toBeInTheDocument());
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  it('does not render when not shown', () => {
    const { container } = render(<AddDocumentModal show={false} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onHide when close button is clicked', async () => {
    render(<AddDocumentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    await waitFor(() => expect(screen.getByText('Add New Document')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when submitted', async () => {
    render(<AddDocumentModal show={true} onHide={mockOnHide} onSubmit={mockOnSubmit} patientId={patientId} />);
    await waitFor(() => expect(screen.getByText('Add New Document')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Document' } });
    fireEvent.change(screen.getByLabelText(/Document Type/i), { target: { value: 'medical_report' } });

    const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText(/File/i), { target: { files: [mockFile] } });

    fireEvent.click(screen.getByText(/Add Document/i));

    await waitFor(() => {
      expect(DocumentService.uploadFile).toHaveBeenCalledWith(mockFile);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        patient_id: patientId,
        title: 'Test Document',
        document_type: 'medical_report',
        file_url: 'http://example.com/uploaded.pdf',
        file: mockFile,
        category_id: 'cat1',
      }));
    });
  });
});
