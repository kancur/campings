const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.emerald[500]
      },
      maxWidth: {
        'searchBar': '500px'
      },
      fontFamily: {
        'sans': ['Poppins'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
