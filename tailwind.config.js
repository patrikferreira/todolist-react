/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstColor': '#010101',
        'secondColor': '#f0f0f0',
        'lightColor': '#ffffff',
        'baseColor': '#919191',
        'accentColor': '#ffc107',
        'hoverColor': '#f2f2f2',
      },
      boxShadow: {
        'customShadow': '0px 0px 1px 1px rgba(0,0,0,0.1)'
      },
      animation: {
        'fade-in-left': 'fadeInLeft 0.3s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.3s ease-out forwards', // Nova animação
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
        fadeInDown: { // Nova keyframe
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)', // Inicia de cima
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)', // Termina na posição original
          },
        },
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}
