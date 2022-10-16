const { theme } = require('tailwindcss/defaultConfig')

module.exports = {
  content: ["./**/*.html"],
  darkMode:'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      fontFamily: {
        primary: ["'Inter'", ...theme.fontFamily.sans],
        secondary: ["'Noto Sans'", ...theme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
