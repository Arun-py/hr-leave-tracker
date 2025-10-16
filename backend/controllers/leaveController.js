import Leave from '../models/Leave.js';
import User from '../models/User.js';
import Holiday from '../models/Holiday.js';
import Notification from '../models/Notification.js';
import {
  calculateLeaveDuration,
  validateLeaveBalance,
  deductLeaveBalance,
  restoreLeaveBalance,
} from '../utils/leaveCalculator.js';

// @desc    Apply for leave
// @route   POST /api/leaves
// @access  Private
export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Get holidays for calculation
    const holidays = await Holiday.find({ isActive: true });

    // Calculate leave duration
    const duration = calculateLeaveDuration(start, end, holidays);

    if (duration === 0) {
      return res.status(400).json({ message: 'No working days in selected period' });
    }

    // Get user with leave balance
    const user = await User.findById(req.user._id);

    // Validate leave balance
    const validation = validateLeaveBalance(user, leaveType, duration);

    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    // Create leave request
    const leave = await Leave.create({
      user: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      duration,
      reason,
      status: 'Pending',
    });

    // Populate user details
    await leave.populate('user', 'name employeeId email');

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's leave requests
// @route   GET /api/leaves/my-leaves
// @access  Private
export const getMyLeaves = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    }

    const leaves = await Leave.find(query)
      .populate('user', 'name employeeId email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single leave request
// @route   GET /api/leaves/:id
// @access  Private
export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate('user', 'name employeeId email department')
      .populate('approvedBy', 'name email');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Check if user is authorized to view this leave
    if (
      leave.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'HR' &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel leave request
// @route   PUT /api/leaves/:id/cancel
// @access  Private
export const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Check if user owns this leave request
    if (leave.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only pending or approved leaves can be cancelled
    if (leave.status !== 'Pending' && leave.status !== 'Approved') {
      return res.status(400).json({ message: 'Cannot cancel this leave request' });
    }

    // If leave was approved, restore balance
    if (leave.status === 'Approved') {
      const user = await User.findById(req.user._id);
      restoreLeaveBalance(user, leave.leaveType, leave.duration);
      await user.save();
    }

    leave.status = 'Cancelled';
    await leave.save();

    res.json({ message: 'Leave request cancelled successfully', leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leave statistics for user
// @route   GET /api/leaves/stats
// @access  Private
export const getLeaveStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59);

    const leaves = await Leave.find({
      user: req.user._id,
      startDate: { $gte: yearStart },
      endDate: { $lte: yearEnd },
    });

    const stats = {
      totalRequests: leaves.length,
      pending: leaves.filter(l => l.status === 'Pending').length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      rejected: leaves.filter(l => l.status === 'Rejected').length,
      cancelled: leaves.filter(l => l.status === 'Cancelled').length,
      totalDaysTaken: leaves
        .filter(l => l.status === 'Approved')
        .reduce((sum, l) => sum + l.duration, 0),
      leaveBalance: user.leaveBalance,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
