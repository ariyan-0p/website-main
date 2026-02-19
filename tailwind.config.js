/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D2D2D', // Custom primary color (e.g., bg-gray-800)
        secondary: '#4B4B4B', // Secondary color for buttons or highlights
      },
      fontFamily: {
        // This forces Tailwind to use our new friendly font everywhere by default
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};