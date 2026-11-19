import { join } from 'path';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mm-black': '#06070B',
        'mm-navy': '#0F111A',
        'mm-card': '#181B26',
        'mm-cyan': '#00F0FF',
        'mm-magenta': '#FF007A',
        'mm-yellow': '#FFE600',
        'mm-purple': '#9D00FF',
        'mm-green': '#00FF66',
        'mm-text-primary': '#F4F6FF',
        'mm-text-secondary': '#94A3B8',
      },
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient-shift': 'mm-gradient-shift 4s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'mm-gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};