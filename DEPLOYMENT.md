# Royal Mark Academy - Deployment Guide

This guide provides detailed instructions for deploying the Royal Mark Academy website (frontend + backend) on Render.

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

### 2. Deploy on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Select "New" → "Web Service"
3. Connect to your GitHub repository
4. Configure the service:
   - **Name**: royal-mark-academy
   - **Runtime**: Node
   - **Build Command**: `./render-build.sh`
   - **Start Command**: `node server/index.js`
5. Add environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `EMAIL_SERVICE`: gmail (or your email provider)
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password/app password
   - `JWT_SECRET`: Generate a random string
   - `COOKIE_SECRET`: Generate a random string
   - `DEBUG`: "true"
6. Click "Create Web Service"

### 3. Troubleshooting

#### Missing Frontend Files
If you see errors like `Error: ENOENT: no such file or directory, stat '/opt/render/project/src/dist/index.html'`:
1. Check the build logs to ensure `render-build.sh` executed successfully
2. Verify the `dist` directory was created
3. If needed, manually upload the dist folder to Render

#### MongoDB Connection Issues
If MongoDB fails to connect:
1. Verify your MongoDB Atlas connection string
2. Check if IP whitelisting is correctly set to 0.0.0.0/0
3. Review server logs for specific errors

#### CORS Issues
If you see CORS errors in the browser console:
1. Verify the CORS configuration in `server/index.js`
2. Ensure allowed origins include your deployed frontend URL

## Best Practices

- **Environment Variables**: Never commit sensitive information to your repository
- **Error Logging**: Use DEBUG=true for detailed error information
- **Regular Backups**: Regularly backup your MongoDB data
- **Performance Monitoring**: Use Render's monitoring tools to track performance

## Post-Deployment

After successful deployment:
1. Test all forms (contact, application) 
2. Verify email notifications are working
3. Check mobile responsiveness
4. Test admin features if applicable
5. Run Lighthouse tests to verify performance and accessibility

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practices-performance.html)
