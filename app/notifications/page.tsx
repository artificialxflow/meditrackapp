'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationService, Notification } from '@/lib/services/notificationService';
import NotificationList from '@/components/notifications/NotificationList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError('');
      const data = await NotificationService.getNotifications(user.id);
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      setError('');
      await NotificationService.markAsRead(notificationId);
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Failed to mark notification as read.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <Loading />
          <p className="mt-4 text-muted">Loading notifications...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="h2 text-primary mb-4">My Notifications</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <NotificationList notifications={notifications} onMarkAsRead={handleMarkAsRead} />
      </div>
      <Footer />
    </div>
  );
}
