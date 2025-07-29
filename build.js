/**
 * Royal Mark Academy Build Helper
 * Modern ES module version that replaces the old CommonJS version
 */

/* global process */ // ESLint: define process as global
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Helper function to build frontend
 */
function buildFrontend() {
  console.log('🏗️ Building frontend with Vite...');
  
  try {
    execSync('npm run frontend-build', {
      cwd: __dirname,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    console.log('✅ Frontend build successful!');
    return true;
  } catch (error) {
    console.error('❌ Frontend build failed:', error.message);
    return false;
  }
}

/**
 * Copy files to Render directory
 */
function copyToRenderPath() {
  console.log('📋 Copying files to Render directory...');
  
  try {
    // Create Render dist directory if it doesn't exist
    const renderDistPath = '/opt/render/project/src/dist';
    fs.mkdirSync(renderDistPath, { recursive: true });
    
    // Copy files
    const localDistPath = path.join(__dirname, 'dist');
    const distFiles = fs.readdirSync(localDistPath);
    
    for (const file of distFiles) {
      const srcPath = path.join(localDistPath, file);
      const destPath = path.join(renderDistPath, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    
    console.log('✅ Files copied successfully');
    return true;
  } catch (error) {
    console.log(`⚠️ Copy error: ${error.message}`);
    return false;
  }
}

// If this file is run directly, build and copy
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('🚀 Running Royal Mark Academy build script...');
  const success = buildFrontend();
  if (success) {
    copyToRenderPath();
  }
}

export { buildFrontend, copyToRenderPath };
