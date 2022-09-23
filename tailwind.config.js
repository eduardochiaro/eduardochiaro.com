const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/utils/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '350px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      cyan: colors.cyan,
      indigo: colors.indigo,
      amber: colors.amber,
      zinc: colors.zinc,
      emerald: colors.emerald,
      primary: {
        50: '#FEEFC8',
        100: '#FEE8B4',
        200: '#FEDC8C',
        300: '#FDD064',
        400: '#FDC43B',
        500: '#FCB813',
        600: '#D49703',
        700: '#9D7002',
        800: '#654801',
        900: '#2E2101',
      },
      accent: {
        50: '#FCF1EE',
        100: '#F9E6E1',
        200: '#F3CABF',
        300: '#EDB1A1',
        400: '#E7957E',
        500: '#E17C60',
        600: '#D74E28',
        700: '#A33B1F',
        800: '#6B2714',
        900: '#38140B',
      },
    },
    fontFamily: {
      header: ['Rajdhani', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'],
      mono: ['Roboto Mono', 'Courier New', 'monospace'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
