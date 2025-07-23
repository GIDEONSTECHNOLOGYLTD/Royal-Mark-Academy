# Royal Mark Academy Official Website

Welcome to the official website project for **Royal Mark Academy**, located at Number 1 Elepa Road, Odeda, Abeokuta, Ogun State, Nigeria. Established October 5, 2014, the school is committed to providing quality education and holistic development.

## Features
- Modern, responsive design with Tailwind CSS and React
- Interactive pages: Homepage, About, Admissions, Academics, News & Events, Gallery, Contact
- Fully functional contact form with email notifications and database storage
- Complete admissions application system with form validation and backend processing
- Tabbed content sections for better information organization
- Animated UI elements using Framer Motion
- MongoDB database integration for storing applications and contact messages
- Full backend API built with Express.js
- Email notification system using Nodemailer

## Getting Started
### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update with your settings
4. Start development server and backend: `npm run dev:full`

### Production Deployment
1. Build the frontend: `npm run build`
2. Start the production server: `npm run server`

## Tech Stack
### Frontend
- React with hooks for state management
- Vite for fast development and building
- Tailwind CSS for responsive styling
- React Router DOM for navigation
- Framer Motion for animations
- React Icons for UI elements

### Backend
- Express.js for the API server
- MongoDB with Mongoose for database operations
- Nodemailer for sending emails
- CORS for secure cross-origin requests
- dotenv for environment variable management

## Project Structure
- `/src` - Frontend React application
- `/server` - Backend Express API
- `/server/models` - MongoDB data models
- `/server/controllers` - API logic controllers
- `/server/routes` - API route definitions

---

For questions or support, contact the project maintainer.
