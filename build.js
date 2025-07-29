// Build script for Royal Mark Academy on Render
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const process = require('process');

console.log('🔄 Starting Royal Mark Academy build process...');

// Function to run shell commands and log output
function runCommand(command) {
  console.log(`📋 Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`❌ Error executing command: ${error.message}`);
    console.error(error.stdout);
    console.error(error.stderr);
    return false;
  }
}

// Install dependencies
console.log('📦 Installing dependencies...');
runCommand('npm install');

// Build the frontend
console.log('🏗️ Building frontend...');
runCommand('npm run build');

// Check if dist directory was created
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('✅ Frontend build successful! dist directory found.');
  
  // List contents of dist directory
  console.log('📁 Contents of dist directory:');
  const distContents = fs.readdirSync(distPath);
  console.log(distContents);
  
  // Check if index.html exists
  if (distContents.includes('index.html')) {
    console.log('✅ index.html found in dist directory.');
    
    // Create directory structure for Render
    const renderDistPath = '/opt/render/project/src/dist';
    console.log(`📂 Creating directory: ${renderDistPath}`);
    
    try {
      if (!fs.existsSync(renderDistPath)) {
        fs.mkdirSync(renderDistPath, { recursive: true });
        console.log('✅ Directory created successfully.');
      } else {
        console.log('📂 Directory already exists.');
      }
      
      // Copy files from dist to Render's dist directory
      console.log('📋 Copying files to Render dist directory...');
      for (const file of distContents) {
        const srcPath = path.join(distPath, file);
        const destPath = path.join(renderDistPath, file);
        
        const stats = fs.statSync(srcPath);
        if (stats.isDirectory()) {
          console.log(`📁 Copying directory: ${file}`);
          fs.mkdirSync(destPath, { recursive: true });
          const nestedFiles = fs.readdirSync(srcPath);
          for (const nestedFile of nestedFiles) {
            const nestedSrcPath = path.join(srcPath, nestedFile);
            const nestedDestPath = path.join(destPath, nestedFile);
            fs.copyFileSync(nestedSrcPath, nestedDestPath);
          }
        } else {
          console.log(`📄 Copying file: ${file}`);
          fs.copyFileSync(srcPath, destPath);
        }
      }
      
      console.log('✅ All files copied successfully!');
      
      // Verify files in Render's dist directory
      console.log(`📁 Contents of ${renderDistPath}:`);
      console.log(fs.readdirSync(renderDistPath));
      
    } catch (error) {
      console.error(`❌ Error during file operations: ${error.message}`);
      process.exit(1);
    }
    
  } else {
    console.error('❌ index.html not found in dist directory!');
    process.exit(1);
  }
} else {
  console.error('❌ Frontend build failed! dist directory not found.');
  console.log('📁 Current directory contents:');
  console.log(fs.readdirSync(process.cwd()));
  process.exit(1);
}

console.log('🎉 Build process completed successfully!');
