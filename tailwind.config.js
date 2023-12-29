const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    colors: {
      ...colors,
      primaryBorderDark: "#a9afb8",
      primaryBorderSoft: "#ced4db",
      primaryBackgroundDark: "#dfe3e9",
      primaryBackgroundSoft: "#f2f3f5",
      primaryText: "#333",
      primaryBlue: "#2283db",
      primaryBlueShade: "#2e7ff9",
      primaryYellow: "#fbe2d5",
      primaryBlueSosft: "#d0f0fd",
    },
    extend: {},
  },
  purge: [
    "./components/**/*.js",
    "./components/**/*.jsx",
    "./pages/**/*.js",
    "./pages/**/*.jsx",
  ],
  variants: {},
  plugins: [],
};
