import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
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
  
  if (staticPath) {
    console.log(`✅ Serving static files from: ${staticPath}`);
    app.use(express.static(staticPath));
    
    // Serve index.html for any routes not handled by the API
    // This allows React Router to handle client-side routing
    app.get('*', (req, res) => {
      // Skip API routes
      if (req.path.startsWith('/api')) {
        return res.status(404).send('API endpoint not found');
      }
      
      // For all other routes, send the React app's index.html
      console.log(`Serving index.html for route: ${req.path}`);
      res.sendFile(join(staticPath, 'index.html'));
    });
  } else {
    console.warn('⚠️ WARNING: Could not find frontend build directory. Static files will not be served.');
  }
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

// Catch-all route in production to serve the frontend
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
