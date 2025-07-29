// Deploy handler for Royal Mark Academy - builds frontend if files don't exist
/* global process */ // ESLint: define process as a global variable
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

// Paths to check for frontend files
const possiblePaths = [
  path.join(projectRoot, 'dist'),
  '/opt/render/project/src/dist'
];

// Check if any of the paths have the index.html file
function checkFrontendFiles() {
  for (const distPath of possiblePaths) {
    try {
      if (fs.existsSync(path.join(distPath, 'index.html'))) {
        console.log(`✅ Found frontend files at: ${distPath}`);
        return true;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log(`Path ${distPath} not found or not accessible`);
    }
  }
  console.log('❌ Frontend files not found in any expected location');
  return false;
}

// Build frontend if needed
async function buildFrontendIfNeeded() {
  if (!checkFrontendFiles()) {
    console.log('🏗️ Building frontend...');
    
    // Create .env.production for correct API URL
    const envFilePath = path.join(projectRoot, '.env.production');
    fs.writeFileSync(
      envFilePath, 
      `VITE_API_URL=https://royal-mark-academy.onrender.com/api\n`
    );
    console.log('✅ Created .env.production with API URL');
    
    try {
      // If we're on Render, we need to build from scratch
      if (process.env.RENDER) {
        console.log('📦 Installing frontend dependencies...');
        execSync('npm install', { 
          cwd: projectRoot,
          stdio: 'inherit'
        });
      }
      
      // Build the frontend
      console.log('🔨 Running frontend build...');
      execSync('npm run build', { 
        cwd: projectRoot, 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });
      
      // Ensure Render directory exists and copy files there
      const renderDistPath = '/opt/render/project/src/dist';
      if (!fs.existsSync(renderDistPath)) {
        fs.mkdirSync(renderDistPath, { recursive: true });
      }
      
      // Copy files from local dist to Render dist
      const localDistPath = path.join(projectRoot, 'dist');
      if (fs.existsSync(localDistPath)) {
        console.log(`📋 Copying files from ${localDistPath} to ${renderDistPath}`);
        const files = fs.readdirSync(localDistPath);
        
        for (const file of files) {
          const srcPath = path.join(localDistPath, file);
          const destPath = path.join(renderDistPath, file);
          
          if (fs.statSync(srcPath).isDirectory()) {
            fs.cpSync(srcPath, destPath, { recursive: true });
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
        
        console.log('✅ Frontend build and copy completed successfully');
        return true;
      } else {
        console.error('❌ Build failed - dist directory not found after build!');
        return false;
      }
    } catch (error) {
      console.error('❌ Error building frontend:', error);
      return false;
    }
  }
  return true;
}

export { buildFrontendIfNeeded, checkFrontendFiles };
