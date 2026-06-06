/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#030712',
        panel: 'rgba(9, 16, 32, 0.72)',
        cyanblue: '#00D8FF',
        electric: '#2F7DFF',
      },
      boxShadow: {
        glow: '0 0 42px rgba(0, 216, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
