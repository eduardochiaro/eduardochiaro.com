const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      'green-sheen': {
        50: 'hsla(151, 24%, 60%, 0.1)',
        100: 'hsla(151, 24%, 60%, 0.2)',
        200: 'hsla(151, 24%, 60%, 0.3)',
        300: 'hsla(151, 24%, 60%, 0.4)',
        400: 'hsla(151, 24%, 60%, 0.5)',
        500: 'hsla(151, 24%, 60%, 0.6)',
        600: 'hsla(151, 24%, 60%, 0.7)',
        700: 'hsla(151, 24%, 60%, 0.8)',
        800: 'hsla(151, 24%, 60%, 0.9)',
        900: 'hsla(151, 24%, 60%, 1)',
      },
      'terra-cotta': {
        50: 'hsla(13, 68%, 63%, 0.1)',
        100: 'hsla(13, 68%, 63%, 0.2)',
        200: 'hsla(13, 68%, 63%, 0.3)',
        300: 'hsla(13, 68%, 63%, 0.4)',
        400: 'hsla(13, 68%, 63%, 0.5)',
        500: 'hsla(13, 68%, 63%, 0.6)',
        600: 'hsla(13, 68%, 63%, 0.7)',
        700: 'hsla(13, 68%, 63%, 0.8)',
        800: 'hsla(13, 68%, 63%, 0.9)',
        900: 'hsla(13, 68%, 63%, 1)',
      },
    },
    extend: {},
  },
  plugins: [],
}
