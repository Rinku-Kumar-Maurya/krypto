module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "color-spiner": {
          '0%': { transform: 'rotate(0deg)', 'border-color': 'red' },
          '25%': { transform: 'rotate(90deg)', 'border-color': 'yellow' },
          '50%': { transform: 'rotate(180deg)', 'border-color': 'blue' },
          '75%': { transform: 'rotate(270deg)', 'border-color': 'green' },
          '100%': { transform: 'rotate(360deg)', 'border-color': 'red' },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "color-spiner": 'color-spiner 1s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};