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
        'base': '#6f7072',
        'primaryDark': '#15161a',
        'secondaryDark': '#1e1f23',
        'accent': '#563d7c',
        'borderColor': '#7d7d7d0f',
        'redColor': '#dc3545',
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
