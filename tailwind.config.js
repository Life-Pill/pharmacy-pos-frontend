/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      poppins: ['poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        blueLightest: '#9ADBF7',
        blueLighter: '#32BDF9',
        blueLight: '#31B5F8',
        blue: '#2FABF7',
        blueDark: '#2A8DF5',
        blueDarker: '#277CF4', //button
        black: '#19191C',
        grayLight: '#828487',
        gray: '#C2C2C2',
        red: '#D70015',
      },
      fontFamily: {
        poppins: ['poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
