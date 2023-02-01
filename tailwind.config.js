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
      primary: colors.gray,
      secondary: {
        DEFAULT: '#09BC8A',
        50: "#E2FEF6",
        100: "#C5FCEC",
        200: "#85F9D8",
        300: "#4BF6C6",
        400: "#10F4B3",
        500: "#09BC8A",
        600: "#07976E",
        700: "#057052",
        800: "#034935",
        900: "#02271C"
      },
      accent: {
        DEFAULT: '#FF8552',
        50: "#FFF4F0",
        100: "#FFE6DB",
        200: "#FFCDB8",
        300: "#FFB899",
        400: "#FF9F75",
        500: "#FF8552",
        600: "#FF570F",
        700: "#CC3D00",
        800: "#852800",
        900: "#421400"
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
