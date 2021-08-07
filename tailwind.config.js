module.exports = {
  mode: 'aot',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
