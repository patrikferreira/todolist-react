/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#f5f5f5',
        'secondaryColor': '#ebebeb',
        'lightColor': '#ffff',
        'darkColor': '#101010',
        'activeColor': '#33bf58',
        'base': '#6f7072',
        'primaryDark': '#15161a',
        'secondaryDark': '#1e1f23',
        'accent': '#8777fe',
      }
    },
  },
  plugins: [],
}