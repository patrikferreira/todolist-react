/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstColor': '#1c1d1f',
        'accent': '#1c1d1f',
        'lightColor': '#ffffff',
        'baseLight': '#f0f0f0',
        'darkColor': '#000000',
        'baseDark': '#232627',
        'base': '#ebebeb',
        'redColor': '#de4848',
      },
      boxShadow: {
        'customShadow': '0px 0px 1px 1px rgba(0,0,0,0.2)'
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
      fontFamily: {
      },
    },
  },
  plugins: [],
}
