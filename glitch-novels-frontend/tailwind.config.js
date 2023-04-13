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
        "gray-divider": "#676767",
        "red-danger-1": "#f63432",
        "red-danger-2": "#d3302e",
        "orange-danger-1": "#FFE8D9",
        "orange-danger-2": "#F55627",
        "blue-success-1": "#0073bd",
        "blue-success-2": "#024e7c",
      },
    },
  },
  safelist: [
    {
      // Include classes built with string interpolation & concatenation
      pattern: /(bg|border)-(red-danger-1|red-danger-2|gold-brand-1|gold-brand-2)/,
      variants: ["hover"],
    },
  ],
  plugins: [],
};
