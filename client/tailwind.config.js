/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': {
          950: '#220709',
          900: '#3e0c10',
          850: '#521015',
          800: '#6b141b',
          700: '#8e1923',
          600: '#b01c27',
          500: '#cf222e',
          400: '#e53e3e',
        },
        'chinese-gold': {
          950: '#332405',
          900: '#523a08',
          800: '#7a570c',
          700: '#9e7010',
          600: '#c58c14',
          500: '#d4af37', // Imperial Gold
          400: '#e6c35c',
          300: '#f3d987',
          200: '#faebb8',
          100: '#fef7e0',
        },
        'chinese-dark': {
          950: '#0c0506',
          900: '#140809',
          850: '#1a0b0d',
          800: '#220e11',
          750: '#2a1215',
          700: '#33161a',
        },
        'chinese-cream': '#fff8ee',
      },
      fontFamily: {
        body: ['"Be Vietnam Pro"', 'sans-serif'],
        calligraphy: ['"Ma Shan Zheng"', 'cursive'],
        serif: ['"Noto Serif SC"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45), 0 0 50px rgba(200, 16, 46, 0.25)',
        'red-glow': '0 0 25px rgba(200, 16, 46, 0.5), 0 0 50px rgba(110, 19, 27, 0.4)',
        'lantern': '0 0 20px rgba(220, 38, 38, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.4)',
        'card-hover': '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.2)',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '108': '1.08',
      }
    },
  },
  plugins: [],
}
