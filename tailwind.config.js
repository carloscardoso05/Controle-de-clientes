const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs' : '426px',
        ...defaultTheme.screens,
      },  
      maxWidth: {
        '2xs' : '14rem',
        ...defaultTheme.maxWidth,
      }
    },
  },
  plugins: [],
}
