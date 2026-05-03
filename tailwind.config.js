/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FF8A8A',
          dark: '#E55555',
        },
        mint: {
          DEFAULT: '#4ECDC4',
          light: '#6ED9D2',
          dark: '#3BB5AD',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          dark: '#FFF0CC',
        },
        success: '#95E06C',
        failure: '#FF4D4D',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'confetti-fall': 'confettiFall 1.5s ease-in forwards',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 25px rgba(0,0,0,0.12)',
        'card-selected': '0 6px 20px rgba(78, 205, 196, 0.3)',
      },
    },
  },
  plugins: [],
}
