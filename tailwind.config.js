const { theme } = require('tailwindcss/defaultConfig')

module.exports = {
  content: ["./**/*.html"],
  darkMode:'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "text-gray-600",
            a: {
              color: "text-gray-600",
              "&:hover": {
                color: "text-indigo-500",
              },
            },
            h1: {
              color: "text-gray-700",
            },
            h2: {
              color: "text-indigo-500",
            },
            h3: {
              color: "text-indigo-500",
            },
            h4: {
              color: "text-indigo-500",
            },
            blockquote: {
              color: "text-gray-600",
            },
            strong: {
              color: "text-gray-600",
            },
            blockquote: {
              borderLeftWidth: "0.25rem",
              borderLeftColor: "text-indigo-500",
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
            code: {
              color: "text-gray-600",
              fontWeight: "500",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
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
