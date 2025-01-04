/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",  //for all html files in the root directory
    "./src/**/*.{html,js,ts,jsx,tsx}", //for all js/ts files in the src directory
  ],
  theme: {
    extend: {
      colors:{
          bg: "rgba(var(--bg))",
          card: "rgba(var(--card))",
          text: "rgba(var(--text))",
          button: "rgba(var(--button))",
          buttonText: "rgba(var(--buttonText))",
          input: "rgba(var(--input))",
          taskText: "rgba(var(--taskText))",
          icon: "rgba(var(--icon))",

        }
      }
    },
  };
  plugins: [];  


