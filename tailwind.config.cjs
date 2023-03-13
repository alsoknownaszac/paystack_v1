/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: ".5rem",
        sm: "1.8rem",
        lg: "10.5rem",
      },
    },
  },
  plugins: [],
};
