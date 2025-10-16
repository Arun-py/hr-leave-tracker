/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Yellow-Orange gradient theme (from images)
        primary: {
          50: '#FEF9E7',
          100: '#FEF3CD',
          200: '#FCE79B',
          300: '#FBDB69',
          400: '#FACC15', // Yellow
          500: '#F59E0B', // Amber/Orange
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        secondary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        accent: {
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E', // Green
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
          },
          orange: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316', // Orange
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          }
        },
        // Dark mode colors
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          hover: '#475569',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #FACC15 0%, #F59E0B 50%, #F97316 100%)',
        'gradient-yellow-orange': 'linear-gradient(to right, #FACC15, #F97316)',
        'gradient-amber': 'linear-gradient(to right, #F59E0B, #EA580C)',
        'gradient-warm': 'linear-gradient(135deg, #FEF3CD, #FDBA74, #FB923C)',
      },
    },
  },
  plugins: [],
}
