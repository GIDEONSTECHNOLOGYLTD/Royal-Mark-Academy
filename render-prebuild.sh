#!/bin/bash
# Pre-build script for Royal Mark Academy on Render

echo "=============== Royal Mark Academy Build Process ==============="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file for production build with API URL
echo "🔑 Creating .env.production file..."
echo "VITE_API_URL=https://royal-mark-academy.onrender.com/api" > .env.production
echo "✅ Created .env.production with API URL"

# Build the frontend
echo "🏗️ Building frontend with Vite..."
npm run build

# Verify build output
if [ -d "dist" ]; then
  echo "✅ Frontend build successful - dist directory created"
  echo "📁 Contents of dist directory:"
  ls -la dist
  
  # Ensure the Render target directory exists
  echo "📁 Creating Render target directory..."
  mkdir -p /opt/render/project/src/dist
  
  # Copy build files to Render's expected location
  echo "📋 Copying build files to Render location..."
  cp -r dist/* /opt/render/project/src/dist/
  
  # Verify the copy operation
  echo "🔍 Verifying files in Render location:"
  ls -la /opt/render/project/src/dist/
  
  echo "✅ Build process completed successfully!"
else
  echo "❌ Build failed - dist directory not found!"
  echo "Current directory contents:"
  ls -la
  exit 1
fi
