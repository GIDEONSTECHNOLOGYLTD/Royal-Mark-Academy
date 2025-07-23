import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getAllContacts,
  markContactResponded
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - all admin routes require authentication
router.use(protect);

// Applications routes - available to both admin and staff
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationById);

// Admin-only routes - only admins can update application status
router.patch('/applications/:id', authorize('admin'), updateApplicationStatus);

// Contact routes - available to both admin and staff
router.get('/contacts', getAllContacts);
router.patch('/contacts/:id/respond', markContactResponded);

export default router;
