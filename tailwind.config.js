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
      blue: colors.sky,
      red: colors.red,
      cyan: colors.cyan,
      indigo: colors.indigo,
      amber: colors.amber,
      emerald: colors.emerald,
      primary: colors.neutral,
      secondary: {
        DEFAULT: '#EE964B',
        50: "#FEF7F1",
        100: "#FCEFE3",
        200: "#F9DCC2",
        300: "#F6C9A2",
        400: "#F2B178",
        500: "#EE964B",
        600: "#E97B1B",
        700: "#D26C14",
        800: "#AC5910",
        900: "#7E410C"
      },
      accent: {
        DEFAULT: '#FC5130',
        50: "#FFF7F5",
        100: "#FFEAE6",
        200: "#FED1C8",
        300: "#FEB3A5",
        400: "#FD8E77",
        500: "#FC5130",
        600: "#F62C04",
        700: "#D82703",
        800: "#B52003",
        900: "#7E1602"
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
