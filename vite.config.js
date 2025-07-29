import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        // This helps ensure Tailwind directives are properly recognized
        javascriptEnabled: true,
      },
    },
    devSourcemap: true, // Enable sourcemaps for easier debugging
  },
  server: {
    hmr: {
      overlay: false, // Disable the error overlay if needed
    },
  },
})
