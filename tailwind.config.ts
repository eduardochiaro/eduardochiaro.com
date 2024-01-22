import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors'; 
import plugin from "tailwindcss/plugin";

export default {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/utils/**/*.{js,ts,jsx,tsx}'],
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
      primary: {
        50: "#F5F2F0",
        100: "#EBE5E0",
        200: "#D6CAC2",
        300: "#C2B0A3",
        400: "#AD9685",
        500: "#997B66",
        600: "#7A6352",
        700: "#5C4A3D",
        800: "#3D3129",
        900: "#1F1914",
        950: "#0F0C0A"
      },
      secondary: {
        50: "#F8F4ED",
        100: "#F2EADE",
        200: "#E3D3BA",
        300: "#D6BF99",
        400: "#C9AA79",
        500: "#BB9457",
        600: "#9C783F",
        700: "#745A2F",
        800: "#4C3B1F",
        900: "#281F10",
        950: "#120E07"
      },
      accent: {
        50: "#FAEBEA",
        100: "#F6DBDA",
        200: "#EDB6B5",
        300: "#E49290",
        400: "#DB6D6B",
        500: "#D14542",
        600: "#B92F2D",
        700: "#942624",
        800: "#6F1D1B",
        900: "#390F0E",
        950: "#1D0707"
      },
    },
    fontFamily: {
      header: ['var(--font-header)', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'],
      mono: ['var(--font-mono)', 'Courier New', 'monospace'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      textShadow: {
        sm: '0 0 2px var(--tw-shadow-color)',
        DEFAULT: '0 0 4px var(--tw-shadow-color)',
        lg: '0 0 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),

    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
} satisfies Config

