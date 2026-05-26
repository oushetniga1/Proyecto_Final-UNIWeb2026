/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c8',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        accent: '#22d3ee',
        dark: '#0f172a',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px -5px rgb(14 165 233)' },
          'to': { boxShadow: '0 0 30px 5px rgb(14 165 233)' },
        }
      }
    },
  },
  plugins: [],
}