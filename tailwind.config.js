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
        '50': '#FFFFFF',
        '100': '#FEFCF8',
        '200': '#F9EED5',
        '300': '#F3E0B1',
        '400': '#EED28E',
        '500': '#E9C46A',
        '600': '#E2B139',
        '700': '#C6951D',
        '800': '#957016',
        '900': '#644B0F'
      },
      accent: {
        DEFAULT: '#E76F51',
        '50': '#FDF5F2',
        '100': '#FBE6E0',
        '200': '#F6C8BD',
        '300': '#F1AA99',
        '400': '#EC8D75',
        '500': '#E76F51',
        '600': '#E04620',
        '700': '#B03618',
        '800': '#7E2711',
        '900': '#4D180B'
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
