/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#2680ee',
        'lightColor': '#fefefe',
        'darkColor': '#101214',
        'secondaryDark': '#1d1f21',
        'base': '#7c7a7a',
        'baseDark': '#000000',
        'baseLight': '#f0f0f0',
        'borderLight': 'rgba(0, 0, 0, 0.1)',
        'borderDark': 'rgba(255, 255, 255, 0.1)',
        'redColor': '#de4848',
      },
      boxShadow: {
        'customShadow': '0px 0px 1px 1px rgba(0,0,0,0.11)'
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
