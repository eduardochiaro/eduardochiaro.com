const colors = require('tailwindcss/colors');

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
      emerald: colors.emerald,
      primary: colors.gray,
      secondary: {
        "50": "#FEF9F0",
        "100": "#FEF2DD",
        "200": "#FCE5BB",
        "300": "#FAD58F",
        "400": "#F8C462",
        "500": "#F6AE2D",
        "600": "#E6990A",
        "700": "#C98509",
        "800": "#A66F07",
        "900": "#7A5105"
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
