import { render, screen, fireEvent } from '@testing-library/react';
import NotificationList from '../../../components/notifications/NotificationList';

describe('NotificationList', () => {
  const mockOnMarkAsRead = jest.fn();

  it('renders no notifications message when array is empty', () => {
    render(<NotificationList notifications={[]} onMarkAsRead={mockOnMarkAsRead} />);
    expect(screen.getByText('No new notifications.')).toBeInTheDocument();
  });

  it('renders a list of notifications', () => {
    const mockNotifications = [
      { id: '1', profile_id: 'user1', notification_type: 'system_notification', title: 'Welcome', message: 'Welcome to MediTrack!', is_read: false, created_at: '2023-01-01T10:00:00Z' },
      { id: '2', profile_id: 'user1', notification_type: 'medication_reminder', title: 'Take your medicine', message: 'It's time for Aspirin', is_read: true, created_at: '2023-01-01T09:00:00Z' },
    ];
    render(<NotificationList notifications={mockNotifications} onMarkAsRead={mockOnMarkAsRead} />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Welcome to MediTrack!')).toBeInTheDocument();
    expect(screen.getByText('Take your medicine')).toBeInTheDocument();
    expect(screen.getByText(/It's time for Aspirin/)).toBeInTheDocument();
  });

  it('calls onMarkAsRead when button is clicked for unread notification', () => {
    const mockNotifications = [
      { id: '1', profile_id: 'user1', notification_type: 'system_notification', title: 'Welcome', message: 'Welcome to MediTrack!', is_read: false, created_at: '2023-01-01T10:00:00Z' },
    ];
    render(<NotificationList notifications={mockNotifications} onMarkAsRead={mockOnMarkAsRead} />);

    fireEvent.click(screen.getByText(/Mark as Read/i));
    expect(mockOnMarkAsRead).toHaveBeenCalledWith('1');
  });

  it('does not show Mark as Read button for read notifications', () => {
    const mockNotifications = [
      { id: '1', profile_id: 'user1', notification_type: 'system_notification', title: 'Welcome', message: 'Welcome to MediTrack!', is_read: true, created_at: '2023-01-01T10:00:00Z' },
    ];
    render(<NotificationList notifications={mockNotifications} onMarkAsRead={mockOnMarkAsRead} />);

    expect(screen.queryByText(/Mark as Read/i)).not.toBeInTheDocument();
  });
});
