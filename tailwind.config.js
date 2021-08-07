module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./component/*.tsx", "./pages/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightblack: "#181818",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
