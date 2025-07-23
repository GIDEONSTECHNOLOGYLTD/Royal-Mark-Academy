import express from 'express';
import upload from '../middleware/upload.js';
import { 
  uploadDocument, 
  getDocuments, 
  deleteDocument,
  serveDocument
} from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all documents for an application (protected for admin viewing)
router.get('/applications/:id/documents', protect, getDocuments);

// Serve document file (no auth required to support public viewing with a token)
router.get('/applications/:id/documents/:documentId/view', serveDocument);

// Upload document to an application (public for applicants to upload)
router.post('/applications/:id/documents', upload.single('document'), uploadDocument);

// Delete a document (protected for admin)
router.delete('/applications/:id/documents/:documentId', protect, deleteDocument);

export default router;
