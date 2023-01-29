/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Proxima Nova", fontFamily.serif],
      },
    },
  },
  plugins: [],
};
