/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Mark Academy brand colors
        'blue': {
          900: '#1a365d', // Deep blue for headers
          800: '#2a4365', // Secondary blue
          700: '#2c5282', // Accent blue
          100: '#ebf8ff', // Light blue for backgrounds
        },
        'yellow': {
          500: '#ecc94b', // Gold accent
        }
      },
    },
  },
  plugins: [],
}
