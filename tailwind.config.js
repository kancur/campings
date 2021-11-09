const colors = require('tailwindcss/colors');
const headerHeight = '80px'

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.emerald[600],
      },
      maxWidth: {
        searchBar: '600px',
        logo: '200px',
      },
      minHeight: {
        header: headerHeight,
      },
      inset: {
        header: headerHeight,
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      keyframes: {
        loaderBounce: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(25%)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        loaderBounce: 'loaderBounce 1s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
