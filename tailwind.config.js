/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#ede8f5",
        primary: "#16161A",
        secondary: "#46158f",
        accent: "#701dee",
        backgroundPrimary: "#100F0F",
        backgroundSecondary: "#222222",
        aside: "#16161A",
      },
      boxShadow: {
        main: "inset 0px -80px 30px -10px rgba(112, 29, 238, 0.1)",
      },
      backgroundImage: {
        body: "url('https://www.transparenttextures.com/patterns/batthern.png')",
      },
    },
    fontFamily: {
      title: "Montserrat",
      paragraph: "Inter",
    },
  },
  plugins: [],
};
