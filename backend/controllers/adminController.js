import User from '../models/User.js';
import Holiday from '../models/Holiday.js';
import Leave from '../models/Leave.js';
import Attendance from '../models/Attendance.js';

// @desc    Get all users with role management
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['Employee', 'HR', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all holidays
// @route   GET /api/admin/holidays
// @access  Private
export const getHolidays = async (req, res) => {
  try {
    const { year, type } = req.query;

    let query = { isActive: true };

    if (type) {
      query.type = type;
    }

    if (year) {
      const yearStart = new Date(year, 0, 1);
      const yearEnd = new Date(year, 11, 31, 23, 59, 59);
      query.date = { $gte: yearStart, $lte: yearEnd };
    }

    const holidays = await Holiday.find(query).sort({ date: 1 });

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create holiday
// @route   POST /api/admin/holidays
// @access  Private/Admin
export const createHoliday = async (req, res) => {
  try {
    const { name, date, type, description } = req.body;

    const holiday = await Holiday.create({
      name,
      date,
      type: type || 'Public Holiday',
      description: description || '',
    });

    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update holiday
// @route   PUT /api/admin/holidays/:id
// @access  Private/Admin
export const updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }

    const { name, date, type, description, isActive } = req.body;

    if (name) holiday.name = name;
    if (date) holiday.date = date;
    if (type) holiday.type = type;
    if (description !== undefined) holiday.description = description;
    if (isActive !== undefined) holiday.isActive = isActive;

    await holiday.save();

    res.json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete holiday
// @route   DELETE /api/admin/holidays/:id
// @access  Private/Admin
export const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }

    await holiday.deleteOne();

    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update leave policy (default leave balances)
// @route   PUT /api/admin/leave-policy
// @access  Private/Admin
export const updateLeavePolicy = async (req, res) => {
  try {
    const { userId, leaveBalance } = req.body;

    if (!userId || !leaveBalance) {
      return res.status(400).json({ message: 'User ID and leave balance are required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.leaveBalance = { ...user.leaveBalance, ...leaveBalance };
    await user.save();

    res.json({ message: 'Leave policy updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk update leave policy for all employees
// @route   PUT /api/admin/leave-policy/bulk
// @access  Private/Admin
export const bulkUpdateLeavePolicy = async (req, res) => {
  try {
    const { leaveBalance } = req.body;

    if (!leaveBalance) {
      return res.status(400).json({ message: 'Leave balance is required' });
    }

    // Update all employees
    const result = await User.updateMany(
      { role: 'Employee' },
      { $set: { leaveBalance } }
    );

    res.json({
      message: 'Leave policy updated for all employees',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployees = await User.countDocuments({ role: 'Employee' });
    const totalHR = await User.countDocuments({ role: 'HR' });
    const totalAdmins = await User.countDocuments({ role: 'Admin' });
    const activeUsers = await User.countDocuments({ isActive: true });

    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    const approvedLeaves = await Leave.countDocuments({ status: 'Approved' });
    const rejectedLeaves = await Leave.countDocuments({ status: 'Rejected' });

    const totalHolidays = await Holiday.countDocuments({ isActive: true });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const monthlyAttendance = await Attendance.countDocuments({
      date: { $gte: monthStart, $lte: monthEnd },
    });

    const totalAttendanceRecords = await Attendance.countDocuments();

    res.json({
      totalUsers,
      employeeCount: totalEmployees,
      hrCount: totalHR,
      adminCount: totalAdmins,
      activeEmployees: activeUsers,
      totalHolidays,
      totalLeaveRequests: totalLeaves,
      pendingLeaveRequests: pendingLeaves,
      approvedThisMonth: approvedLeaves,
      rejectedLeaves,
      totalAttendanceRecords,
      monthlyAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get system logs (recent activities)
// @route   GET /api/admin/logs
// @access  Private/Admin
export const getSystemLogs = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Get recent leave activities
    const recentLeaves = await Leave.find()
      .populate('user', 'name employeeId')
      .populate('approvedBy', 'name')
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit));

    // Get recent user registrations
    const recentUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      leaveActivities: recentLeaves,
      userActivities: recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
