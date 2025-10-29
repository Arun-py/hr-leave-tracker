import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/companyController.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('Admin'));

router.route('/').get(getAllCompanies).post(createCompany);
router.route('/:id').put(updateCompany).delete(deleteCompany);

export default router;
