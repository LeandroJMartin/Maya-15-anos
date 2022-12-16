ColorConfig = require('./src/config/color.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xlg: '1440px'
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      fontFamily: {
        MayaBoldExpanded: 'Maya-bold-expanded',
        MayaBoldItalic: 'Maya-bold-italic',
        MayaBold: 'Maya-bold',
        MayaExpanded: 'Maya-expanded',
        MayaExpandedItalic: 'Maya-expanded-italic',
        MayaRegular: 'Maya-Regular',
        MayaRegularItalic: 'Maya-Regular-Italic'
      },
      colors: {
        greenMaya: ColorConfig.color
      }
    }
  },
  plugins: [],
  important: true
};
