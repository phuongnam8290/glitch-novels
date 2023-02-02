/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Metropolis", fontFamily.sans],
      },
      colors: {
        "white-ink-1": "#EBE5DE",
        "gold-brand-1": "#C9A882",
        "gold-brand-2": "#8E6E48",
        "gray-bg-1": "#191A1C",
      },
    },
  },
  plugins: [],
};
