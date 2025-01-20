/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins'],
        roboto:['Roboto']
      },
      animation: {
        fadeIn : 'fadeIn 2s ease-in-out',
        typing: 'typing 4s steps(30, end), blink 0.5s step-end infinite',
      },
      keyframes: {
        fadeIn : {
          '0%': {opacity : 0},
          '100%': {opacity : 1},
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
      }
    },
  },
  plugins: [],
}

