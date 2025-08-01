const path = require('path');
    
module.exports = {
  plugins: [],
  root: process.cwd(),
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
  },
};
