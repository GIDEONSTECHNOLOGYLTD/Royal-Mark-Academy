import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=============== Royal Mark Academy Safe Build ===============');

// Create .env.production file
console.log('🔑 Creating .env.production file...');
fs.writeFileSync(
  path.join(__dirname, '.env.production'),
  'VITE_API_URL=https://royal-mark-academy.onrender.com/api\n'
);
console.log('✅ Created .env.production with API URL');

// Run the build with explicit config to avoid filesystem permission issues
console.log('🏗️ Building frontend with simplified Vite config...');
exec('npx vite build --config vite.simple.js', { 
  cwd: __dirname,
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Build error: ${error.message}`);
    console.error(stderr);
    process.exit(1);
  }
  if (stderr) {
    console.log(`⚠️ Build warnings (non-fatal): ${stderr}`);
  }
  console.log('✅ Frontend build completed successfully!');
  console.log(stdout);
  
  // Check if dist directory was created
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    console.log('📁 Contents of dist directory:');
    const files = fs.readdirSync(distDir);
    console.log(files);
    
    if (files.length === 0) {
      console.error('❌ Dist directory is empty!');
      process.exit(1);
    }
    
    console.log('✅✅✅ Build process completed successfully!');
  } else {
    console.error('❌ Dist directory was not created!');
    process.exit(1);
  }
});
