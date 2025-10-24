import React, { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiX, FiUser, FiServer, FiDatabase, FiActivity } from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { showToast } from '../../utils/toast';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, system, user

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/admin/notifications');
      setNotifications(data);
    } catch (error) {
      showToast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => 
        n._id === notificationId ? { ...n, isRead: true } : n
      ));
      showToast.success('Marked as read');
    } catch (error) {
      showToast.error('Failed to mark as read');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      setNotifications(notifications.filter(n => n._id !== notificationId));
      showToast.success('Notification deleted');
    } catch (error) {
      showToast.error('Failed to delete notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      showToast.success('All notifications marked as read');
    } catch (error) {
      showToast.error('Failed to mark all as read');
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (filter === 'system') {
      filtered = filtered.filter(n => n.type === 'system' || n.type === 'server');
    } else if (filter === 'user') {
      filtered = filtered.filter(n => n.type === 'user' || n.type === 'leave' || n.type === 'attendance');
    }
    
    return filtered;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system': return <FiServer className="text-blue-500" />;
      case 'server': return <FiDatabase className="text-purple-500" />;
      case 'user': return <FiUser className="text-green-500" />;
      case 'activity': return <FiActivity className="text-orange-500" />;
      default: return <FiBell className="text-gray-500" />;
    }
  };

  if (loading) return <Loader />;

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
            <FiBell /> Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'unread', 'system', 'user'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FiBell className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg border-l-4 transition-all ${
                notification.isRead
                  ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  : 'bg-yellow-50 dark:bg-gray-700 border-yellow-500'
              } shadow hover:shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-all"
                      title="Mark as read"
                    >
                      <FiCheck />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all"
                    title="Delete"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
