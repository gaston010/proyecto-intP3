/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true,
  theme: {
    extend: {},
  },
  plugins: [
    require("@designbycode/tailwindcss-text-shadow")
    ({
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: "3px",
        shadowOffsetX: "2px",
        shadowOffsetY: "2px",
    })
  ],
}

