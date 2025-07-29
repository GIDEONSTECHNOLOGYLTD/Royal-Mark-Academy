# Deployment Guide

## Quick Deployment Options

### Netlify (Recommended)
1. **Drag & Drop**: Simply drag the `dist` folder to [netlify.com](https://netlify.com)
2. **Git Integration**: Connect your GitHub repository for automatic deployments
3. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Vercel
1. **Git Integration**: Connect your GitHub repository
2. **Build Settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Manual Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Upload the `dist` folder** to your hosting provider
3. **Configure custom domain** if needed

## Environment Variables
Create a `.env` file for production:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_SITE_NAME=Royal Mark Academy
```

## Performance Optimization
- **Images**: Use WebP format with fallbacks
- **Fonts**: Preload critical fonts
- **Scripts**: Minify and compress
- **Caching**: Configure proper cache headers

## SEO Configuration
- **Meta Tags**: Update in `index.html`
- **Sitemap**: Generate automatically
- **Robots.txt**: Configure for search engines
- **Analytics**: Add Google Analytics code
