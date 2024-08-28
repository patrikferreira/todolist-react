/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#f8f8f8',
        'secondaryColor': '#d1d3d3',
        'darkColor': '#101010',
        'activeColor': '#33bf58',
        'base': '#6f7072',
      }
    },
  },
  plugins: [],
}