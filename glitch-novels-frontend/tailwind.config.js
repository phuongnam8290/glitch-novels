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
        "gray-bg-1": "#343A40",
        "gray-bg-2": "#212529",
        "gray-selected-bg": "#1c2023",
      },
    },
  },
  plugins: [],
};
