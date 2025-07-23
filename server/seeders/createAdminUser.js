import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/* global process */ // Tell ESLint process is a global variable

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../../.env') });

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/royalmarkacademy');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@royalmarkacademy.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      createdAt: Date.now(),
    });

    console.log(`Admin user created: ${admin.email}`);
  } catch (error) {
    console.error(`Error creating admin: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeder
const runSeeder = async () => {
  const conn = await connectDB();
  
  console.log('Creating admin user...');
  await createAdminUser();
  
  console.log('Seeding completed!');
  await conn.disconnect();
  process.exit();
};

runSeeder();
