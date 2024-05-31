/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      inputBox: {
        DEFAULT: {
          base: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          dark: 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        },
      },
      fontFamily: {
        poppins: ['poppins', 'sans-serif'],
      },
      colors: {
        blueLightest: '#9ADBF7',
        blueLighter: '#32BDF9',
        blueLight: '#31B5F8',
        blue: '#2FABF7',
        blueDark: '#2A8DF5',
        blueDarker: '#277CF4', //button
        black: '#19191C',
        grayLight: '#828487',
        red: '#D70015',
        numberpadbutton: '#F8F9FD',
        'blue-700': '#1D4ED8', // Add the hex value or modify as needed
        'blue-800': '#1E40AF', // Add the hex value or modify as needed
        'blue-300': '#93C5FD', // Add the hex value or modify as needed
        'blue-600': '#2563EB', // Add the hex value or modify as needed
        'blue-700': '#1D4ED8', // Add the hex value or modify as needed
        'blue-800': '#1E3A8A', // Add the hex value or modify as needed

        'red-700': '#B91C1C', // Add the hex value or modify as needed
        'red-800': '#991B1B', // Add the hex value or modify as needed
        'red-300': '#FCA5A5', // Add the hex value or modify as needed
        'red-600': '#DC2626', // Add the hex value or modify as needed
        'red-900': '#7F1D1D', // Add the hex value or modify as needed

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.input-box': {
          '@apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white':
            {},
        },
        '.label-text': {
          '@apply block mb-2 text-sm font-medium text-white dark:text-white':
            {},
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
};
