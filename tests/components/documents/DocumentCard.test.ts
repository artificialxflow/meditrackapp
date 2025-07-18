import { render, screen } from '@testing-library/react';
import DocumentCard from '../../../components/documents/DocumentCard';

describe('DocumentCard', () => {
  const mockDocument = {
    id: '1',
    patient_id: 'pat1',
    title: 'Lab Results',
    document_type: 'lab_result',
    file_url: 'http://example.com/lab_results.pdf',
    document_date: '2023-01-15',
    created_by: 'user1',
  };

  it('renders document details correctly', () => {
    render(<DocumentCard document={mockDocument} />);

    expect(screen.getByText('Lab Results')).toBeInTheDocument();
    expect(screen.getByText('lab_result')).toBeInTheDocument();
    expect(screen.getByText('1/15/2023')).toBeInTheDocument(); // Adjust based on locale
    expect(screen.getByRole('link', { name: /View Document/i })).toHaveAttribute('href', mockDocument.file_url);
  });
});
