/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        text: '#1f2937',
        primary: '#2563eb',
        secondary: '#10b981',
        'border-muted': '#e5e7eb',
        card: '#ffffff',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
      },
      keyframes: {
        fadeInUp: {
          'to': {
            opacity: '1',
            transform: 'none',
          },
        },
      },
    },
  },
  plugins: [],
} 