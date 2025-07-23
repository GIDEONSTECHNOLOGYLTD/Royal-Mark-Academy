import Application from '../models/Application.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload document to an existing application
export const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    if (!documentType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Document type is required' 
      });
    }
    
    const application = await Application.findById(id);
    
    if (!application) {
      // Remove uploaded file if application not found
      fs.unlinkSync(req.file.path);
      
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    const newDocument = {
      name: req.file.originalname,
      fileType: req.file.mimetype,
      path: req.file.path,
      size: req.file.size,
      documentType
    };
    
    application.documents = application.documents || [];
    application.documents.push(newDocument);
    
    await application.save();
    
    res.status(200).json({
      success: true,
      data: newDocument,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to upload document' 
    });
  }
};

// Get all documents for an application
export const getDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findById(id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: application.documents || []
    });
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get documents' 
    });
  }
};

// Delete a document
export const deleteDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;
    
    const application = await Application.findById(id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    // Find the document in the array
    const documentIndex = application.documents.findIndex(
      doc => doc._id.toString() === documentId
    );
    
    if (documentIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Document not found' 
      });
    }
    
    // Get the document path to delete the file
    const documentPath = application.documents[documentIndex].path;
    
    // Remove from array
    application.documents.splice(documentIndex, 1);
    await application.save();
    
    // Delete the actual file
    if (fs.existsSync(documentPath)) {
      fs.unlinkSync(documentPath);
    }
    
    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete document' 
    });
  }
};

// Serve a document file
export const serveDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;
    
    const application = await Application.findById(id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    // Find the document in the array
    const document = application.documents.find(
      doc => doc._id.toString() === documentId
    );
    
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: 'Document not found' 
      });
    }
    
    // Check if file exists
    if (!fs.existsSync(document.path)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Document file not found' 
      });
    }
    
    // Set content type header
    res.setHeader('Content-Type', document.fileType);
    res.setHeader('Content-Disposition', `inline; filename="${document.name}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(document.path);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving document:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to serve document' 
    });
  }
};
