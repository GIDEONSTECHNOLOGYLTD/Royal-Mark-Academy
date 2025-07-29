#!/usr/bin/env node

// CommonJS build script for Royal Mark Academy with resilient fallback
// This script ensures that static content is always available

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get project root directory
const projectDir = process.cwd();
let buildSuccess = false;

console.log('=============== Royal Mark Academy CommonJS Build ===============');
console.log(`Build running in ${projectDir}`);

// Ensure static placeholder files are available
const staticPlaceholderDir = path.join(projectDir, 'static-placeholder');
const renderDistDir = '/opt/render/project/src/dist';

// First ensure the Render dist directory exists and has static files
console.log('📁 Setting up static files first to ensure site availability');
try {
  // Create Render dist directory
  execSync(`mkdir -p ${renderDistDir}`, { stdio: 'inherit' });
  
  // Copy static placeholder files
  console.log(`📋 Copying placeholder files to ${renderDistDir}...`);
  execSync(`cp -r ${staticPlaceholderDir}/* ${renderDistDir}`, { stdio: 'inherit' });
  console.log('✅ Placeholder files copied successfully');
} catch (error) {
  console.error(`⚠️ Error setting up static files: ${error.message}`);
  console.log('Continuing with build attempt...');
}

// Create .env.production file
console.log('🔑 Creating .env.production file...');
fs.writeFileSync(
  path.join(projectDir, '.env.production'),
  'VITE_API_URL=https://royal-mark-academy.onrender.com/api\n'
);
console.log('✅ Created .env.production with API URL');

// Ensure all required build dependencies are available
console.log('📦 Installing build dependencies...');
const dependencies = [
  'vite@4.3.9',
  '@vitejs/plugin-react@4.0.0',
  'react',
  'react-dom',
  'tailwindcss',
  'postcss',
  'autoprefixer'
];

try {
  execSync(`npm install ${dependencies.join(' ')} --no-save --legacy-peer-deps`, {
    cwd: projectDir,
    stdio: 'inherit'
  });
  console.log('✅ Build dependencies installed');
} catch (error) {
  console.error(`❌ Failed to install dependencies: ${error.message}`);
  process.exit(1);
}

// Create a CommonJS Vite config file since the ESM one is having issues
const commonJSConfigPath = path.join(projectDir, 'vite.config.cjs');
console.log('📝 Creating CommonJS Vite config...');
fs.writeFileSync(
  commonJSConfigPath,
  `const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  root: process.cwd(),
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    target: 'es2018',
  },
  css: {
    preprocessorOptions: {
      css: {
        javascriptEnabled: true,
      },
    },
    devSourcemap: false,
  },
});
`
);
console.log('✅ Created CommonJS Vite config');

// Run the build using the CommonJS config
console.log('🏗️ Building frontend with Vite using CommonJS config...');
try {
  execSync('npx vite build --config vite.config.cjs', {
    cwd: projectDir,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✅ Frontend build successful!');
} catch (error) {
  console.error(`❌ Build failed: ${error.message}`);
  process.exit(1);
}

// Copy files to Render location if on Render
const distDir = path.join(projectDir, 'dist');
if (fs.existsSync(distDir)) {
  console.log('📁 Contents of dist directory:');
  console.log(fs.readdirSync(distDir));
  
  const renderDistPath = '/opt/render/project/src/dist';
  try {
    execSync(`mkdir -p ${renderDistPath}`, { stdio: 'inherit' });
    console.log(`📋 Copying files to ${renderDistPath}...`);
    execSync(`cp -r ${path.join(distDir, '*')} ${renderDistPath}`, { stdio: 'inherit' });
    console.log('✅ Files copied successfully');
  } catch (copyError) {
    console.log(`⚠️ Could not copy to Render path: ${copyError.message}`);
    console.log('⚠️ This is normal if not running on Render');
  }
} else {
  console.error('❌ Build failed - dist directory not found!');
  process.exit(1);
}

console.log('✅✅✅ Build process completed successfully!');
