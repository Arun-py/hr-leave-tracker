import Leave from '../models/Leave.js';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Notification from '../models/Notification.js';
import { deductLeaveBalance, restoreLeaveBalance } from '../utils/leaveCalculator.js';
import { getMonthRange } from '../utils/dateUtils.js';
import { exportToCSV, flattenObject } from '../utils/csvExporter.js';

// @desc    Get all pending leave requests
// @route   GET /api/hr/leave-requests
// @access  Private/HR
export const getPendingLeaveRequests = async (req, res) => {
  try {
    const { status, department, startDate, endDate } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = 'Pending'; // Default to pending
    }

    const leaves = await Leave.find(query)
      .populate('user', 'name employeeId email department designation')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    // Filter by department if specified
    let filteredLeaves = leaves;
    if (department) {
      filteredLeaves = leaves.filter(
        leave => leave.user.department === department
      );
    }

    res.json(filteredLeaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve leave request
// @route   PUT /api/hr/leave-requests/:id/approve
// @access  Private/HR
export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate('user');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'Leave request already processed' });
    }

    // Deduct leave balance
    const user = await User.findById(leave.user._id);
    deductLeaveBalance(user, leave.leaveType, leave.duration);
    await user.save();

    // Update leave status
    leave.status = 'Approved';
    leave.approvedBy = req.user._id;
    leave.approvedDate = new Date();
    await leave.save();

    // Create notification
    await Notification.create({
      user: leave.user._id,
      title: 'Leave Approved',
      message: `Your ${leave.leaveType} request from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been approved.`,
      type: 'Approval',
      relatedId: leave._id,
    });

    await leave.populate('approvedBy', 'name email');

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject leave request
// @route   PUT /api/hr/leave-requests/:id/reject
// @access  Private/HR
export const rejectLeave = async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    const leave = await Leave.findById(req.params.id).populate('user');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'Leave request already processed' });
    }

    leave.status = 'Rejected';
    leave.approvedBy = req.user._id;
    leave.approvedDate = new Date();
    leave.rejectionReason = rejectionReason || 'Not specified';
    await leave.save();

    // Create notification
    await Notification.create({
      user: leave.user._id,
      title: 'Leave Rejected',
      message: `Your ${leave.leaveType} request from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been rejected. Reason: ${leave.rejectionReason}`,
      type: 'Approval',
      relatedId: leave._id,
    });

    await leave.populate('approvedBy', 'name email');

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all employees
// @route   GET /api/hr/employees
// @access  Private/HR
export const getAllEmployees = async (req, res) => {
  try {
    const { department, role, isActive } = req.query;

    let query = {};

    if (department) query.department = department;
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const employees = await User.find(query).select('-password').sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get employee by ID
// @route   GET /api/hr/employees/:id
// @access  Private/HR
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Get employee's leave statistics
    const leaves = await Leave.find({ user: employee._id });
    const attendance = await Attendance.find({ user: employee._id });

    res.json({
      employee,
      leaveStats: {
        total: leaves.length,
        pending: leaves.filter(l => l.status === 'Pending').length,
        approved: leaves.filter(l => l.status === 'Approved').length,
        rejected: leaves.filter(l => l.status === 'Rejected').length,
      },
      attendanceStats: {
        total: attendance.length,
        present: attendance.filter(a => a.status === 'Present').length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee details
// @route   PUT /api/hr/employees/:id
// @access  Private/HR
export const updateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { name, phone, department, designation, isActive, leaveBalance } = req.body;

    if (name) employee.name = name;
    if (phone) employee.phone = phone;
    if (department) employee.department = department;
    if (designation) employee.designation = designation;
    if (isActive !== undefined) employee.isActive = isActive;
    if (leaveBalance) employee.leaveBalance = { ...employee.leaveBalance, ...leaveBalance };

    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance summary for all employees
// @route   GET /api/hr/attendance-summary
// @access  Private/HR
export const getAttendanceSummary = async (req, res) => {
  try {
    const { month, year, department } = req.query;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    const { startDate, endDate } = getMonthRange(targetYear, targetMonth);

    let userQuery = {};
    if (department) userQuery.department = department;

    const users = await User.find(userQuery).select('name employeeId department');

    const summary = await Promise.all(
      users.map(async (user) => {
        const attendance = await Attendance.find({
          user: user._id,
          date: { $gte: startDate, $lte: endDate },
        });

        return {
          user: {
            _id: user._id,
            name: user.name,
            employeeId: user.employeeId,
            department: user.department,
          },
          totalDays: attendance.length,
          presentDays: attendance.filter(a => a.status === 'Present').length,
          absentDays: attendance.filter(a => a.status === 'Absent').length,
          leaveDays: attendance.filter(a => a.status === 'On Leave').length,
          totalWorkHours: attendance.reduce((sum, a) => sum + (a.workHours || 0), 0).toFixed(2),
        };
      })
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get HR dashboard statistics
// @route   GET /api/hr/dashboard
// @access  Private/HR
export const getHRDashboard = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'Employee' });
    const activeEmployees = await User.countDocuments({ role: 'Employee', isActive: true });
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAttendance = await Attendance.countDocuments({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const recentLeaves = await Leave.find()
      .populate('user', 'name employeeId email department')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalEmployees,
      activeEmployees,
      pendingLeaves,
      todayAttendance,
      recentLeaves,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export leave report as CSV
// @route   GET /api/hr/reports/leaves/export
// @access  Private/HR
export const exportLeaveReport = async (req, res) => {
  try {
    const { startDate, endDate, status, department } = req.query;

    let query = {};
    if (status) query.status = status;
    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    }

    const leaves = await Leave.find(query)
      .populate('user', 'name employeeId email department')
      .populate('approvedBy', 'name email')
      .lean();

    // Flatten and format data for CSV
    const formattedData = leaves.map(leave => ({
      'Employee ID': leave.user?.employeeId || '',
      'Employee Name': leave.user?.name || '',
      'Department': leave.user?.department || '',
      'Leave Type': leave.leaveType,
      'Start Date': new Date(leave.startDate).toLocaleDateString(),
      'End Date': new Date(leave.endDate).toLocaleDateString(),
      'Duration': leave.duration,
      'Reason': leave.reason,
      'Status': leave.status,
      'Approved By': leave.approvedBy?.name || '',
      'Approved Date': leave.approvedDate ? new Date(leave.approvedDate).toLocaleDateString() : '',
    }));

    const headers = [
      'Employee ID', 'Employee Name', 'Department', 'Leave Type',
      'Start Date', 'End Date', 'Duration', 'Reason', 'Status',
      'Approved By', 'Approved Date'
    ];

    const csv = exportToCSV(formattedData, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leave-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
