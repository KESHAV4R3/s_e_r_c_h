/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "screen1": "450px",
      "screen2": "600px",
      "screen3": "1058px",
      "screen4": "1300px",
      "screen5": "843px",
    },
    extend: {},
  },
  plugins: [],
}

