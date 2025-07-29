import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Replicate CommonJS __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Ensure we properly resolve directories
    root: dirname(__dirname),
    base: './',
    // Optimize build settings
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
      minify: 'terser',
      target: 'es2018',
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
      },
    },
    css: {
      preprocessorOptions: {
        css: {
          // This helps ensure Tailwind directives are properly recognized
          javascriptEnabled: true,
        },
      },
      devSourcemap: mode !== 'production', // Only in dev mode
    },
    server: {
      hmr: {
        overlay: true,
      },
      port: 5173,
    },
  };
});
