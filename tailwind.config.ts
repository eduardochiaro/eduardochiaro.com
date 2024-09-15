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
      sky: colors.sky,
      rose: colors.rose,
      primary: colors.slate,
      secondary: {
        50: "#EEF3F6",
        100: "#DDE6EE",
        200: "#BFD0DF",
        300: "#9DB7CE",
        400: "#7EA1BE",
        500: "#5C89AD",
        600: "#486F8F",
        700: "#355269",
        800: "#243747",
        900: "#111A22",
        950: "#090D11"
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
      sans: ['ui-sans-serif', 'system-ui', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
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

