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
      inherit: colors.inherit, 
      transparent: 'transparent',
      current: 'currentColor',
      blue: colors.blue,
      red: colors.red,
      cyan: colors.cyan,
      indigo: colors.indigo,
      amber: colors.amber,
      emerald: colors.emerald,
      primary: colors.stone,
      secondary: {
        DEFAULT: '#81B29A',
        50: "#F2F7F5",
        100: "#E6F0EB",
        200: "#CCE0D7",
        300: "#B3D1C2",
        400: "#9AC1AE",
        500: "#81B29A",
        600: "#5D987B",
        700: "#46725D",
        800: "#2E4C3E",
        900: "#17261F"
      },
      accent: {
        DEFAULT: '#E07A5F',
        50: "#FCF1EE",
        100: "#F9E6E1",
        200: "#F3CABF",
        300: "#EDB1A1",
        400: "#E6957F",
        500: "#E07A5F",
        600: "#D64F29",
        700: "#A23C1F",
        800: "#6B2715",
        900: "#38140B"
      },
    },
    fontFamily: {
      header: ['Titillium Web', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'],
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
