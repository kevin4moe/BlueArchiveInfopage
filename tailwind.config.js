module.exports = {
  purge: ["./public/*.html", "./src/components/*.vue"],
  safelist: [
    "from-yellow-400",
    "from-red-400",
    "from-blue-400",
    "to-yellow-700",
    "to-red-700",
    "to-blue-700",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
