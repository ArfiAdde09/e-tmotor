/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E11D48', // Merah
          dark: '#BE123C',
        },
        dark: {
          900: '#0A0A0A',
          800: '#111827',
          700: '#1F2937',
          600: '#374151',
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      }
    },
  },
  plugins: [],
};