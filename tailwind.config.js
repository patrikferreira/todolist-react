/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#4b90e8',
        'lightColor': '#fff',
        'darkColor': '#141718',
        'base': '#7c7a7a',
        'baseDark': '#232627',
        'baseLight': '#f0f0f0',
        'redColor': '#de4848',
      },
      boxShadow: {
        'customShadow': '0px 0px 2px 1px rgba(0,0,0,0.14)'
      },
      animation: {
        'fade-in-left': 'fadeInLeft 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
