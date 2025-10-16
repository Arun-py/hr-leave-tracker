import Attendance from '../models/Attendance.js';
import { formatDate, getMonthRange } from '../utils/dateUtils.js';

// @desc    Check in
// @route   POST /api/attendance/checkin
// @access  Private
export const checkIn = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    const attendance = await Attendance.create({
      user: req.user._id,
      date: new Date(),
      checkIn: new Date(),
      status: 'Present',
    });

    await attendance.populate('user', 'name employeeId email');

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check out
// @route   PUT /api/attendance/checkout
// @access  Private
export const checkOut = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!attendance) {
      return res.status(404).json({ message: 'No check-in record found for today' });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: 'Already checked out today' });
    }

    attendance.checkOut = new Date();
    
    // Calculate work hours
    const workHours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
    attendance.workHours = parseFloat(workHours.toFixed(2));

    await attendance.save();
    await attendance.populate('user', 'name employeeId email');

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my attendance records
// @route   GET /api/attendance/my-attendance
// @access  Private
export const getMyAttendance = async (req, res) => {
  try {
    const { month, year, startDate, endDate } = req.query;

    let query = { user: req.user._id };

    if (month && year) {
      const { startDate: monthStart, endDate: monthEnd } = getMonthRange(
        parseInt(year),
        parseInt(month) - 1
      );
      query.date = { $gte: monthStart, $lte: monthEnd };
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(query)
      .populate('user', 'name employeeId email')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's attendance status
// @route   GET /api/attendance/today
// @access  Private
export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate('user', 'name employeeId email');

    if (!attendance) {
      return res.json({ checkedIn: false, message: 'Not checked in yet' });
    }

    res.json({
      checkedIn: true,
      checkedOut: !!attendance.checkOut,
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance statistics
// @route   GET /api/attendance/stats
// @access  Private
export const getAttendanceStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const { startDate, endDate } = getMonthRange(currentYear, currentMonth);

    const attendance = await Attendance.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    });

    const stats = {
      totalDays: attendance.length,
      presentDays: attendance.filter(a => a.status === 'Present').length,
      absentDays: attendance.filter(a => a.status === 'Absent').length,
      halfDays: attendance.filter(a => a.status === 'Half Day').length,
      leaveDays: attendance.filter(a => a.status === 'On Leave').length,
      totalWorkHours: attendance.reduce((sum, a) => sum + (a.workHours || 0), 0).toFixed(2),
      averageWorkHours: attendance.length > 0
        ? (attendance.reduce((sum, a) => sum + (a.workHours || 0), 0) / attendance.length).toFixed(2)
        : 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
