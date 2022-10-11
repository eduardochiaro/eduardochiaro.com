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
      blue: colors.blue,
      red: colors.red,
      cyan: colors.cyan,
      indigo: colors.indigo,
      amber: colors.amber,
      zinc: colors.zinc,
      emerald: colors.emerald,
      primary: {
        "50": "#FEF8EB",
        "100": "#FDEED3",
        "200": "#FBE0AC",
        "300": "#FACF80",
        "400": "#F8C059",
        "500": "#F6AE2D",
        "600": "#E1960A",
        "700": "#A66F07",
        "800": "#704B05",
        "900": "#362402"
      },
      accent: {
        "50": "#FEEEEB",
        "100": "#FEDED7",
        "200": "#FDBDB0",
        "300": "#FB9B88",
        "400": "#FA7A61",
        "500": "#F95738",
        "600": "#EE2E07",
        "700": "#B22205",
        "800": "#771704",
        "900": "#3B0B02"
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
