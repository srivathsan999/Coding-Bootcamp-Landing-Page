/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Light Mode
        light: {
          bg: '#F9FAFB',
          surface: '#FFFFFF',
          text: '#111827',
          accent: '#2563EB',
          success: '#16A34A',
          border: '#E5E7EB',
        },
        // Dark Mode
        dark: {
          bg: '#0B0F19',
          surface: '#111827',
          text: '#E5E7EB',
          accent: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      }
    },
  },
  plugins: [],
}
