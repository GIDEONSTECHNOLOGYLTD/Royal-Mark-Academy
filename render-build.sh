#!/bin/bash

# Render build script for Royal Mark Academy

echo "=== Starting Royal Mark Academy build process ==="

# Install dependencies
echo "=== Installing dependencies ==="
npm install

# Build the frontend
echo "=== Building frontend ==="
npm run build

# Verify the build output
echo "=== Checking dist directory ==="
if [ -d "dist" ]; then
  echo "✅ dist directory created successfully"
  ls -la dist
  echo "=== Contents of dist/index.html ==="
  cat dist/index.html | head -20
else
  echo "❌ ERROR: dist directory was not created"
  echo "=== Current directory contents ==="
  ls -la
  exit 1
fi

# Ensure dist directory is in the right place for server to find it
echo "=== Ensuring dist directory is accessible ==="
if [ ! -d "/opt/render/project/src/dist" ]; then
  echo "Creating symbolic link for dist directory"
  ln -sf "$(pwd)/dist" "/opt/render/project/src/dist"
fi

echo "=== Build completed successfully ==="
