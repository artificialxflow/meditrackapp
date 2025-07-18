import { render, screen, fireEvent } from '@testing-library/react';
import AvatarUpload from '../../components/AvatarUpload';

describe('AvatarUpload', () => {
  it('renders correctly with initial avatar', () => {
    render(<AvatarUpload onUpload={jest.fn()} currentAvatarUrl="/test-avatar.png" />);
    const avatarImage = screen.getByAltText('Avatar Preview');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', '/test-avatar.png');
  });

  it('renders correctly without initial avatar', () => {
    render(<AvatarUpload onUpload={jest.fn()} />);
    expect(screen.getByText('No Avatar')).toBeInTheDocument();
  });

  it('calls onUpload when a file is selected and uploaded', () => {
    const mockOnUpload = jest.fn();
    render(<AvatarUpload onUpload={mockOnUpload} />);
    const fileInput = screen.getByLabelText(/file/i);
    const uploadButton = screen.getByText(/Upload Avatar/i);

    const mockFile = new File(['hello'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    fireEvent.click(uploadButton);
    expect(mockOnUpload).toHaveBeenCalledWith(mockFile);
  });
});
