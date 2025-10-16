import express from 'express';
import {
  getPendingLeaveRequests,
  approveLeave,
  rejectLeave,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  getAttendanceSummary,
  getHRDashboard,
  exportLeaveReport,
} from '../controllers/hrController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All HR routes require HR or Admin role
router.get('/dashboard', protect, authorize('HR', 'Admin'), getHRDashboard);
router.get('/leave-requests', protect, authorize('HR', 'Admin'), getPendingLeaveRequests);
router.put('/leave-requests/:id/approve', protect, authorize('HR', 'Admin'), approveLeave);
router.put('/leave-requests/:id/reject', protect, authorize('HR', 'Admin'), rejectLeave);
router.get('/employees', protect, authorize('HR', 'Admin'), getAllEmployees);
router.get('/employees/:id', protect, authorize('HR', 'Admin'), getEmployeeById);
router.put('/employees/:id', protect, authorize('HR', 'Admin'), updateEmployee);
router.get('/attendance-summary', protect, authorize('HR', 'Admin'), getAttendanceSummary);
router.get('/reports/leaves/export', protect, authorize('HR', 'Admin'), exportLeaveReport);

export default router;
