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
        slideIn: 'slideIn 1s ease-out',
      },
      keyframes: {
        fadeIn : {
          '0%': {opacity : 0},
          '100%': {opacity : 1},
        },
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': {transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
      }
    },
  },
  plugins: [],
}

