const { theme } = require('tailwindcss/defaultConfig');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./**/*.html"],
  darkMode:'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      margin: {
        "-72": "-18rem",
        "-80": "-20rem",
        "-84": "-21rem",
        "-88": "-22rem",
        "-96": "-24rem",
        "-120": "-30rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
