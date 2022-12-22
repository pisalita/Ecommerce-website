module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      //refac name and colors
      colors: {
        blue: {
          light: "#3e557b",
          DEFAULT: "#293851",
        },
        green: {
          dark: "#53ba88",
          DEFAULT: "#65dca2",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
