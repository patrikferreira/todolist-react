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
        'lightColor': '#ffff',
        'darkColor': '#101010',
        'activeColor': '#33bf58',
        'base': '#6f7072',
        'primaryDark': '#15161a',
        'secondaryDark': '#1e1f23',
      }
    },
  },
  plugins: [],
}