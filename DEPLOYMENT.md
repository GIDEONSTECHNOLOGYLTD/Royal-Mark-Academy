# Royal Mark Academy - Split Deployment Guide

This guide provides detailed instructions for deploying the Royal Mark Academy website using a modern split deployment architecture:

- **Frontend (React)**: Deployed on Netlify for optimal performance and reliability
- **Backend (Express API)**: Deployed on Render for handling API requests

## Project Overview

Royal Mark Academy is a modern school website featuring:
- React frontend with Framer Motion animations and Tailwind CSS
- Node.js/Express backend with MongoDB Atlas
- RESTful API for contact forms and admissions applications
- Email notifications via Nodemailer

## Prerequisites

- A [Render](https://render.com) account
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A GitHub repository with your code
- Email service credentials (e.g., Gmail)

## Deployment Steps

### 1. MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster if you don't have one
2. In the Security tab, go to Network Access
3. Add IP Access: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Create a database user with read/write permissions
5. Get your MongoDB connection string: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>`

### 2. Deploy Backend API on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Select "New" → "Web Service"
3. Connect to your GitHub repository
4. Configure the service:
   - **Name**: royal-mark-academy
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`

### 3. Deploy Frontend on Netlify

1. Log in to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Configure the build settings:
   - **Base directory**: (leave blank)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Configure environment variables:
   - **VITE_API_URL**: `https://royal-mark-academy.onrender.com/api`
6. Click "Deploy site"

### 4. Backend API Environment Variables

For the Render backend service, add these environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `EMAIL_SERVICE`: gmail (or your email provider)
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password/app password
   - `JWT_SECRET`: Generate a random string
   - `COOKIE_SECRET`: Generate a random string
   - `DEBUG`: "true"

Then click "Create Web Service"

### 5. Troubleshooting

#### API Connection Issues
If the frontend can't connect to the backend API:
1. Verify that VITE_API_URL in Netlify environment variables is correct
2. Check that CORS is properly configured in `server/index.js` with the correct Netlify domain
3. Test the API directly using the URL: `https://royal-mark-academy.onrender.com/api`

#### Netlify Build Failures
If Netlify build fails:
1. Check the Netlify build logs for specific errors
2. Verify the build command and publish directory are correctly set
3. Try running the build locally with `npm run build` to identify issues

#### MongoDB Connection Issues
If MongoDB fails to connect:
1. Verify your MongoDB Atlas connection string in Render environment variables
2. Check if IP whitelisting is correctly set to 0.0.0.0/0
3. Review Render server logs for specific errors

#### CORS Issues
If you see CORS errors in the browser console:
1. Verify the CORS configuration in `server/index.js`
2. Ensure allowed origins include your Netlify domain (`https://royalmark.netlify.app`)
3. Check for protocol mismatches (http vs https)

## Best Practices

### Security
- **Environment Variables**: Never commit sensitive information to your repository
- **CORS Configuration**: Strictly limit allowed origins to your Netlify domain
- **API Security**: Consider implementing rate limiting and request validation

### Performance
- **CDN Usage**: Netlify automatically distributes your frontend via global CDN
- **API Caching**: Consider implementing caching for frequent API requests
- **Lighthouse Testing**: Regularly test frontend performance with Chrome Lighthouse

### Monitoring
- **Error Logging**: Use DEBUG=true for detailed backend error information
- **Analytics**: Implement frontend analytics to monitor user behavior
- **Status Monitoring**: Set up uptime monitoring for both frontend and API

### Maintenance
- **Regular Backups**: Schedule automated MongoDB data backups
- **Staged Deployments**: Test changes in a staging environment before production
- **Continuous Integration**: Set up CI/CD pipelines for automated testing

## Post-Deployment

After successful deployment:
1. Test the frontend at `https://royalmark.netlify.app`
2. Verify API connection at `https://royal-mark-academy.onrender.com/api`
3. Test all forms (contact, admissions) to ensure API connectivity
4. Verify email notifications are working correctly
5. Check mobile responsiveness across devices
6. Test admin features if applicable
7. Run Lighthouse tests to verify performance and accessibility
8. Set up domain forwarding if using a custom domain

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practices-performance.html)
- [React Production Deployment](https://create-react-app.dev/docs/deployment/)
