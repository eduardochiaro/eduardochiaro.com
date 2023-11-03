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
				50: "#F7F7F8",
				100: "#ECECEE",
				200: "#D5D5D8",
				300: "#BDBDC2",
				400: "#A0A0A7",
				500: "#76767F",
				600: "#27272A",
				700: "#27272A",
				800: "#19191A",
				900: "#19191A",
				950: "#000000"
			},
      secondary: {
				50: "#FEF9F0",
				100: "#FEF2DD",
				200: "#FCE5BB",
				300: "#FAD58F",
				400: "#F8C462",
				500: "#F6AE2D",
				600: "#E6990A",
				700: "#C98509",
				800: "#A66F07",
				900: "#7A5105",
				950: "#583B04"
      },
      accent: {
				50: "#FFF3F0",
				100: "#FEEAE6",
				200: "#FDD1C9",
				300: "#FCB4A6",
				400: "#FB8F79",
				500: "#F95738",
				600: "#F73008",
				700: "#D52906",
				800: "#B72306",
				900: "#7C1804",
				950: "#631303"
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

