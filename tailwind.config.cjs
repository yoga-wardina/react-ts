/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            blue: {
                primary: "#5865F2",
            },
            dark: {
                primary: "#313338",
                one: "#2B2D31",
                two: "#232428",
                three: "#1E1F22",
                input: "#111214",
            },
            grey: {
                primary: "#B5BAC1",
                secondary: "#949BA4",
                hover: "#777c88",
            },
        },
    },
},
  variants: {
    extend: {},
  },
  plugins: [],
}
