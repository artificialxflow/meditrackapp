import { Notification } from '@/lib/services/notificationService';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  return (
    <div className="card">
      <div className="card-header">Notifications</div>
      <ul className="list-group list-group-flush">
        {notifications.length === 0 ? (
          <li className="list-group-item text-center text-muted">No new notifications.</li>
        ) : (
          notifications.map(notification => (
            <li key={notification.id} className={`list-group-item ${!notification.is_read ? 'bg-light' : ''}`}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1"><FaBell className="me-2 text-info" />{notification.title}</h6>
                  <p className="mb-1">{notification.message}</p>
                  <small className="text-muted">{new Date(notification.created_at!).toLocaleString()}</small>
                </div>
                {!notification.is_read && (
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onMarkAsRead(notification.id!)}>
                    <FaCheckCircle /> Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
