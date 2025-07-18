import { render, screen } from '@testing-library/react';
import FamilyCard from '../../../components/families/FamilyCard';

describe('FamilyCard', () => {
  const mockFamily = {
    id: '1',
    name: 'The Test Family',
    description: 'A family for testing',
    created_by: 'user1',
  };

  it('renders family details correctly', () => {
    render(<FamilyCard family={mockFamily} />);

    expect(screen.getByText('The Test Family')).toBeInTheDocument();
    expect(screen.getByText('A family for testing')).toBeInTheDocument();
  });
});
