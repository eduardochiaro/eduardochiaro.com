const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/elements/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      independence: {
        "50": "#EAEAF1",
        "100": "#D4D6E3",
        "200": "#A9ACC6",
        "300": "#7E83AA",
        "400": "#595E87",
        "500": "#3D405C",
        "600": "#31334A",
        "700": "#252637",
        "800": "#181A25",
        "900": "#0C0D12"
      },
      'green-sheen': {
        "50": "#F2F7F5",
        "100": "#E6EFEB",
        "200": "#CDE0D7",
        "300": "#B3D0C2",
        "400": "#9AC1AE",
        "500": "#81B19A",
        "600": "#5E977B",
        "700": "#46715D",
        "800": "#2F4C3E",
        "900": "#17261F"
      },
      'terra-cotta': {
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
      },
      isabelline: {
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
      'egg-shell': {
        "50": "#FEFDFB",
        "100": "#FDFCF7",
        "200": "#FAF8F0",
        "300": "#F9F7EC",
        "400": "#F6F3E4",
        "500": "#F4F0DD",
        "600": "#DDD297",
        "700": "#C7B352",
        "800": "#8B7B2D",
        "900": "#453E16"
      },
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
