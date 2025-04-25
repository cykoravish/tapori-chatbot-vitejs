// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#60a5fa',
            DEFAULT: '#3b82f6',
            dark: '#2563eb',
          },
          secondary: {
            light: '#34d399',
            DEFAULT: '#10b981',
            dark: '#059669',
          },
        },
        animation: {
          'bounce-slow': 'bounce 3s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spin-slow': 'spin 3s linear infinite',
        },
        boxShadow: {
          'inner-lg': 'inset 0 2px 15px 0 rgba(0, 0, 0, 0.1)',
          'neumorph': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
          'neumorph-dark': '5px 5px 10px #151515, -5px -5px 10px #292929',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        }
      },
    },
    plugins: [],
  }