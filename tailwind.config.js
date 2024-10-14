/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstColor': '#f5f5f5',
        'secondColor': '#515151',
        'accent': '#dc4c3e',
        'lightColor': '#ffffff',
        'hoverColor': '#ebebeb',
        'focusColor': '#f8cac5',
        'errorMsg': '#dc4c3e',
      },
      boxShadow: {
        'customShadow': '0px 0px 2px 0px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in-left': 'fadeInLeft 0.2s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.2s ease-out forwards',
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
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}
