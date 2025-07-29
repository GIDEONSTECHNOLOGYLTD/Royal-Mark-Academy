import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: './',
  optimizeDeps: {
    // Exclude system directories that might cause permission issues
    exclude: ['.git', '.github', 'node_modules', '.DS_Store'],
  },
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
