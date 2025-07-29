// Build script for Royal Mark Academy on Render
/* global process */ // ESLint: define process as global
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('=============== Royal Mark Academy Build Process ===============');

// Create .env.production file
console.log('🔑 Creating .env.production file...');
fs.writeFileSync(
  path.join(__dirname, '.env.production'),
  'VITE_API_URL=https://royal-mark-academy.onrender.com/api\n'
);
console.log('✅ Created .env.production with API URL');

// Ensure build dependencies are installed first
try {
  console.log('📦 Installing build dependencies first...');
  
  // Install Vite and required plugins explicitly with exact versions
  execSync('npm install --no-save vite@4.3.9 @vitejs/plugin-react@4.0.0 tailwindcss postcss autoprefixer', {
    cwd: __dirname,
    stdio: 'inherit'
  });
  
  console.log('✅ Build dependencies installed');
  console.log('🏗️ Building frontend with Vite...');
  
  // Try different approaches to run Vite build
  try {
    // First approach: use npx
    console.log('Trying build with npx...');
    execSync('npx vite build', {
      cwd: __dirname,
      stdio: 'inherit'
    });
  } catch (npxError) {
    console.log(`⚠️ npx approach failed: ${npxError.message}`);
    console.log('Trying direct node_modules path...');
    
    // Second approach: direct node_modules path
    execSync('node ./node_modules/vite/bin/vite.js build', {
      cwd: __dirname,
      stdio: 'inherit'
    });
  }
  
  console.log('✅ Frontend build successful!');
  
  // Verify dist directory
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('📁 Contents of dist directory:');
    console.log(fs.readdirSync(path.join(__dirname, 'dist')));
    
    // Copy files to Render location if on Render
    const renderDistPath = '/opt/render/project/src/dist';
    try {
      fs.mkdirSync(renderDistPath, { recursive: true });
      
      // Copy all files from dist to Render location
      console.log(`📋 Copying files to ${renderDistPath}...`);
      const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
      
      for (const file of distFiles) {
        const srcPath = path.join(__dirname, 'dist', file);
        const destPath = path.join(renderDistPath, file);
        
        if (fs.statSync(srcPath).isDirectory()) {
          // Recursive directory copy
          fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
      
      console.log('✅ Files copied successfully');
    } catch (error) {
      console.log(`⚠️ Could not copy to Render path: ${error.message}`);
      console.log('⚠️ This is normal if not running on Render');
    }
  } else {
    console.error('❌ Build failed - dist directory not found!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
