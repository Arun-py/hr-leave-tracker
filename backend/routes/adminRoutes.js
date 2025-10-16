import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
  updateLeavePolicy,
  bulkUpdateLeavePolicy,
  getAdminDashboard,
  getSystemLogs,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All admin routes require Admin role
router.get('/dashboard', protect, authorize('Admin'), getAdminDashboard);
router.get('/users', protect, authorize('Admin'), getAllUsers);
router.put('/users/:id/role', protect, authorize('Admin'), updateUserRole);
router.delete('/users/:id', protect, authorize('Admin'), deleteUser);

// Holiday routes (accessible to all authenticated users for GET, Admin only for modifications)
router.get('/holidays', protect, getHolidays);
router.post('/holidays', protect, authorize('Admin'), createHoliday);
router.put('/holidays/:id', protect, authorize('Admin'), updateHoliday);
router.delete('/holidays/:id', protect, authorize('Admin'), deleteHoliday);

router.put('/leave-policy', protect, authorize('Admin'), updateLeavePolicy);
router.put('/leave-policy/bulk', protect, authorize('Admin'), bulkUpdateLeavePolicy);
router.get('/logs', protect, authorize('Admin'), getSystemLogs);

export default router;
