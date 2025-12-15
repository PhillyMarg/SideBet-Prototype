/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'sb-orange': {
          DEFAULT: '#f37736',
          light: '#f6b086',
          dark: '#d35f20',
          muted: 'rgba(243, 119, 54, 0.1)',
        },
        'sb-purple': {
          DEFAULT: '#7b2cbf',
          light: '#9d4edd',
          dark: '#5a189a',
          muted: 'rgba(123, 44, 191, 0.1)',
        },
        'sb-success': {
          DEFAULT: '#63ba47',
          muted: 'rgba(99, 186, 71, 0.2)',
        },
        'sb-error': {
          DEFAULT: '#982E2E',
          muted: 'rgba(152, 46, 46, 0.2)',
        },
        'sb-bg': {
          primary: '#18181B',
          secondary: '#27272A',
          card: 'rgba(255, 255, 255, 0.03)',
          'card-hover': 'rgba(255, 255, 255, 0.05)',
          overlay: 'rgba(0, 0, 0, 0.85)',
        },
        'sb-border': {
          DEFAULT: '#444444',
          light: 'rgba(255, 255, 255, 0.1)',
          muted: 'rgba(255, 255, 255, 0.05)',
        },
        'sb-text': {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#666666',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'card': '8px',
        'card-lg': '12px',
        'button': '8px',
        'button-sm': '6px',
        'input': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'fab': '0 4px 12px rgba(243, 119, 54, 0.4)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'modal': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
