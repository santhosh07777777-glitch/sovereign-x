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
        sov: {
          darker: '#06080d',
          dark: '#0a0d14',
          card: '#0f141f',
          surface: '#141b29',
          border: '#1e293b',
          accent: '#06b6d4',
          cyan: '#22d3ee',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'glow-amber': '0 0 20px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
