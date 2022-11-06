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
        DEFAULT: '#E9C46A',
        "50": "#FDFAF2",
        "100": "#FCF6E9",
        "200": "#F7EACA",
        "300": "#F3E0AF",
        "400": "#EED28B",
        "500": "#E9C46A",
        "600": "#E0AE2E",
        "700": "#C8981D",
        "800": "#A47D18",
        "900": "#7C5E12"
      },
      accent: {
        DEFAULT: '#E76F51',
        "50": "#FDF4F2",
        "100": "#FCECE9",
        "200": "#F8D6CE",
        "300": "#F3B9AA",
        "400": "#EE9B86",
        "500": "#E76F51",
        "600": "#E35431",
        "700": "#CE401C",
        "800": "#AF3618",
        "900": "#7E2711"
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
