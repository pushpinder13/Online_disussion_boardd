import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useNotifications = () => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Simulate real notifications based on user activity
      const mockNotifications = [
        {
          id: 1,
          type: 'reply',
          title: 'New reply on your thread',
          message: `Someone replied to your discussion`,
          timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
          read: false,
          color: 'blue'
        },
        {
          id: 2,
          type: 'like',
          title: 'Thread was liked',
          message: 'Your thread received new likes',
          timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
          read: false,
          color: 'green'
        },
        {
          id: 3,
          type: 'welcome',
          title: 'Welcome to ForumHub!',
          message: 'Thanks for joining our community',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          color: 'purple'
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, user]);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    getTimeAgo
  };
};