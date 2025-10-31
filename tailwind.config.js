/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8fff7',
          100: '#c3fff0',
          200: '#96ffe6',
          300: '#5ef5d3',
          400: '#2ce3c1',
          500: '#00BFA5', // base neon-ish blue-green (you requested blue accent; this is cool-teal)
          600: '#00A88F',
          700: '#008A70',
          800: '#005E49',
          900: '#003428'
        },
        accent: '#1ecbe1',
        glass: 'rgba(255,255,255,0.04)',
        soft: '#9AA6B2'
      },
      boxShadow: {
        'soft-lg': '0 12px 40px rgba(2,6,10,0.6)'
      },
      borderRadius: {
        'xl': '14px'
      },
      backgroundImage: {
        'hero-grad': 'radial-gradient(800px 400px at 10% 10%, rgba(30,203,225,0.06), transparent 6%), linear-gradient(180deg,#02060a,#071016)'
      }
    },
  },
  plugins: [],
}
