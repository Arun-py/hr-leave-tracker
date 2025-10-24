import Notification from '../models/Notification.js';

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const { isRead, limit = 50 } = req.query;

    let query = { user: req.user._id };

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get HR notifications (leave requests, attendance alerts)
// @route   GET /api/hr/notifications
// @access  Private/HR
export const getHRNotifications = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // HR gets notifications about leave requests and attendance from all employees
    const notifications = await Notification.find({
      $or: [
        { user: req.user._id },
        { 
          type: { 
            $in: ['leave_request', 'attendance_alert', 'leave', 'attendance'] 
          } 
        }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email');

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Admin notifications (system events, user management)
// @route   GET /api/admin/notifications
// @access  Private/Admin
export const getAdminNotifications = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Admin gets all system notifications
    const notifications = await Notification.find({
      $or: [
        { user: req.user._id },
        { type: { $in: ['system', 'server', 'user', 'activity'] } }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email role');

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await notification.deleteOne();

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete all notifications
// @route   DELETE /api/notifications
// @access  Private
export const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });

    res.json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
