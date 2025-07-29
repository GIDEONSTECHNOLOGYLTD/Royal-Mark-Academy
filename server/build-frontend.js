/**
 * Royal Mark Academy Frontend Build Script
 * 
 * This script handles building the React frontend for Royal Mark Academy
 * using direct paths to dependencies to avoid deployment issues.
 * 
 * It installs necessary build dependencies and runs the Vite build
 * process in a way that works reliably in the Render environment.
 */

/* global process */ // ESLint: define process as global
import { execSync } from 'child_process';
/**
 * Royal Mark Academy Frontend Build Script
 * This script handles building the React frontend on the server
 * It attempts multiple methods to ensure the build succeeds
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Color formatting for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Log with color and emoji
 */
function log(emoji, message, color = 'bright') {
  console.log(`${colors[color]}${emoji}  ${message}${colors.reset}`);
}

/**
 * Create a production environment file
 */
function createEnvFile() {
  log('🔧', 'Creating .env.production file');
  
  const envContent = `VITE_API_URL=${process.env.RENDER_EXTERNAL_URL || 'https://royal-mark-academy.onrender.com'}/api\n`;
  
  fs.writeFileSync(
    path.join(rootDir, '.env.production'),
    envContent
  );
  
  log('✅', '.env.production created successfully', 'green');
  log('📄', `Contents: VITE_API_URL=${process.env.RENDER_EXTERNAL_URL || 'https://royal-mark-academy.onrender.com'}/api`);
}

/**
 * Install necessary build dependencies
 */
function installBuildDependencies() {
  log('📦', 'Installing build dependencies');
  
  try {
    execSync('npm install -g vite@latest @vitejs/plugin-react', {
      cwd: rootDir,
      stdio: 'inherit'
    });
    
    log('✅', 'Build dependencies installed', 'green');
  } catch (error) {
    log('⚠️', 'Warning: Could not install global dependencies, will try local path', 'yellow');
    log('🔍', `Error details: ${error.message}`);
  }
}

/**
 * Build the frontend
 */
function buildFrontend() {
  log('🏗️', 'Building React frontend');
  
  try {
    // Try multiple approaches to find and run vite
    const commands = [
      'npx --no-install vite build',
      'node ./node_modules/vite/bin/vite.js build',
      'vite build'
    ];
    
    let built = false;
    
    for (const command of commands) {
      try {
        log('🔄', `Attempting: ${command}`, 'cyan');
        execSync(command, {
          cwd: rootDir,
          stdio: 'inherit'
        });
        built = true;
        log('✅', 'Frontend built successfully!', 'green');
        break;
      } catch (error) {
        log('⚠️', `Command failed: ${command}`, 'yellow');
        log('🔍', `Error: ${error.message}`);
      }
    }
    
    if (!built) {
      throw new Error('All build attempts failed');
    }
  } catch (error) {
    log('❌', 'Frontend build failed', 'red');
    log('🔍', `Error details: ${error.message}`, 'red');
    process.exit(1);
  }
}

/**
 * Copy build files to Render directory
 */
function copyBuildFiles() {
  log('📋', 'Copying build files');
  
  // Check if dist directory exists
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    log('📁', 'dist directory found');
    
    // Create Render dist directory if it doesn't exist
    const renderDistPath = '/opt/render/project/src/dist';
    
    try {
      log('📁', `Creating directory: ${renderDistPath}`);
      fs.mkdirSync(renderDistPath, { recursive: true });
      
      // Copy files
      log('📋', 'Copying files...');
      execSync(`cp -r ${path.join(rootDir, 'dist')}/* ${renderDistPath}`, {
        stdio: 'inherit'
      });
      
      log('✅', 'Files copied successfully', 'green');
    } catch (error) {
      log('⚠️', 'Could not copy to Render dist path', 'yellow');
      log('🔍', `Error details: ${error.message}`);
      log('ℹ️', 'This is normal if not running on Render');
    }
  } else {
    log('❌', 'dist directory not found!', 'red');
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  log('🚀', 'Royal Mark Academy Frontend Build', 'cyan');
  log('📅', `Build date: ${new Date().toISOString()}`);
  
  try {
    createEnvFile();
    installBuildDependencies();
    buildFrontend();
    copyBuildFiles();
    
    log('🎉', 'Build process completed successfully!', 'green');
  } catch (error) {
    log('❌', 'Build process failed', 'red');
    log('🔍', `Error details: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the build process
main();
