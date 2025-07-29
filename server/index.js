import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line no-unused-vars
import { buildFrontendIfNeeded, checkFrontendFiles } from './deploy-handler.js';

import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Application from './models/Application.js';
import Contact from './models/Contact.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Load environment variables
dotenv.config();

/* global process */ // This comment tells ESLint that process is a global variable

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://royalmark.netlify.app', 'https://royalmarkacademy.com'] 
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/student', studentRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Check for production static placeholder first
  const productionHtmlPath = join(__dirname, '../static-placeholder/production.html');
  const hasProductionHtml = fs.existsSync(productionHtmlPath);
  if (hasProductionHtml) {
    console.log('✅ Found production.html placeholder for fallback');
  }
  
  // Handle different deployment environments by checking different possible paths
  const possiblePaths = [
    join(__dirname, '../dist'),          // Standard path from server directory
    join(dirname(__dirname), 'dist'),    // From project root
    '/opt/render/project/src/dist'       // Render's default path
  ];
  
  // Find the first path that exists
  let staticPath = null;
  for (const path of possiblePaths) {
    try {
      const stats = fs.statSync(join(path, 'index.html'));
      if (stats.isFile()) {
        staticPath = path;
        break;
      }
    } catch (error) {
      console.log(`Path ${path} not found, trying next... (${error.code})`);
      // Log more details at debug level
      if (process.env.DEBUG) {
        console.debug(`Full error: ${error.message}`);
      }
    }
  }
  
  // Also check static-placeholder directory for fallback serving
  const placeholderPath = join(__dirname, '../static-placeholder');
  if (fs.existsSync(placeholderPath)) {
    console.log(`✅ Found static placeholder directory at: ${placeholderPath}`);
    // Serve placeholder files first, then built dist files if available
    app.use(express.static(placeholderPath));
  }
  
  // If we have built files, serve them too (these will take precedence over placeholders)
  if (staticPath) {
    console.log(`✅ Serving static files from: ${staticPath}`);
    app.use(express.static(staticPath));
  }
  
  // Serve appropriate HTML for SPA routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).send('API endpoint not found');
    }
    
    // Try serving the built index.html first
    if (staticPath) {
      console.log(`Serving index.html for route: ${req.path}`);
      return res.sendFile(join(staticPath, 'index.html'));
    }
    
    // If no built files, serve production.html placeholder
    if (hasProductionHtml) {
      console.log(`Serving production.html placeholder for route: ${req.path}`);
      return res.sendFile(productionHtmlPath);
    }
    
    // Last resort - serve basic placeholder or 404
    const basicPlaceholder = join(placeholderPath, 'index.html');
    if (fs.existsSync(basicPlaceholder)) {
      return res.sendFile(basicPlaceholder);
    } else {
      return res.status(404).send('Site is currently unavailable. Please check back later.');
    }
  });
  
  console.log('✅ Static file serving setup complete');
} else {
  console.warn('⚠️ Not in production mode - static files will not be served.');
}

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@royalmarkacademy.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Message from Royal Mark Academy Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Try to send email but continue even if email fails
    try {
      await transporter.sendMail(mailOptions);
      console.log('Contact email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed but form was saved:', emailError);
    }
    
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Admissions application endpoint
app.post('/api/application', async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, 
      dob, gradeApplying, currentSchool, 
      parentName, address, message 
    } = req.body;
    
    // Validate input
    if (!firstName || !lastName || !email || !phone || !gradeApplying || !parentName) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Save to database
    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gradeApplying,
      currentSchool,
      parentName,
      address,
      message
    });
    await application.save();
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMISSIONS_EMAIL || 'admissions@royalmarkacademy.com',
      subject: `New Application: ${firstName} ${lastName}`,
      html: `
        <h3>New Student Application</h3>
        <p><strong>Student Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Grade Applying For:</strong> ${gradeApplying}</p>
        <p><strong>Current School:</strong> ${currentSchool || 'N/A'}</p>
        <p><strong>Contact Email:</strong> ${email}</p>
        <p><strong>Contact Phone:</strong> ${phone}</p>
        <p><strong>Parent/Guardian Name:</strong> ${parentName}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Additional Message:</strong></p>
        <p>${message || 'N/A'}</p>
      `
    };

    // Try to send email but continue even if email fails
    try {
      await transporter.sendMail(mailOptions);
      console.log('Application email sent successfully');
    } catch (emailError) {
      console.error('Application email failed but data was saved:', emailError);
    }
    
    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application' });
  }
});

// Start the server
const startServer = async () => {
  // We'll no longer trigger frontend builds on server start to avoid crashes
  // Frontend files should be built during the build phase instead
  console.log('🌐 Starting server without triggering frontend build');
  
  // Start server
  const PORT = process.env.PORT || port;
  try {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server on port ${PORT}:`, error);
    // Try an alternative port if the primary one fails
    const alternatePort = parseInt(PORT) + 1;
    app.listen(alternatePort, () => {
      console.log(`⚠️ Server running on alternate port ${alternatePort}`);
    });
  }
};

// Initialize the server
startServer().catch(err => {
  console.error('❌ Failed to start server:', err);
});
