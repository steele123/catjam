module.exports = {
  mode: 'aot',
  purge: ['./pages/**/*.tsx', './components/*.tsx', './pages/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightblack: "#181818"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
