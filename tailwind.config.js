const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/elements/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", 
  theme: {
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
        "50": "#FDFDFC",
        "100": "#FDFDFC",
        "200": "#F8F8F6",
        "300": "#F6F6F3",
        "400": "#F2F1EE",
        "500": "#F0EFEB",
        "600": "#C6C2B3",
        "700": "#9F987F",
        "800": "#6C6651",
        "900": "#37352A"
      },
      accent: {
        "50": "#FCF1EE",
        "100": "#F9E6E1",
        "200": "#F3CABF",
        "300": "#EDB1A1",
        "400": "#E7957E",
        "500": "#E17C60",
        "600": "#D74E28",
        "700": "#A33B1F",
        "800": "#6B2714",
        "900": "#38140B"
      }
    },
    fontFamily: {
      'header': ['Rajdhani', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
