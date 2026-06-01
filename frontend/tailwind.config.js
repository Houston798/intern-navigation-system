/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
        background: '#0F172A',
        surface: '#1E293B',
        border: '#334155',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
}
