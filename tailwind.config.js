/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
