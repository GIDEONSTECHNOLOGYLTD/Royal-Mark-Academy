import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
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
        input: 'index.html',
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
