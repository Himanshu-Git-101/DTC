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
        slate: {
          50: 'rgb(var(--slate-50) / <alpha-value>)',
          100: 'rgb(var(--slate-100) / <alpha-value>)',
          200: 'rgb(var(--slate-200) / <alpha-value>)',
          300: 'rgb(var(--slate-300) / <alpha-value>)',
          400: 'rgb(var(--slate-400) / <alpha-value>)',
          500: 'rgb(var(--slate-500) / <alpha-value>)',
          600: 'rgb(var(--slate-600) / <alpha-value>)',
          700: 'rgb(var(--slate-700) / <alpha-value>)',
          800: 'rgb(var(--slate-800) / <alpha-value>)',
          900: 'rgb(var(--slate-900) / <alpha-value>)',
          950: 'rgb(var(--slate-950) / <alpha-value>)',
        },
        dtc: {
          bg: 'rgb(var(--dtc-bg) / <alpha-value>)',
          card: 'rgb(var(--dtc-card) / <alpha-value>)',
          surface: 'rgb(var(--dtc-surface) / <alpha-value>)',
          border: 'var(--dtc-border)',
          'border-glow': 'var(--dtc-border-glow)',
          cyan: 'rgb(var(--dtc-cyan) / <alpha-value>)',
          'cyan-dim': 'var(--dtc-cyan-dim)',
          blue: 'rgb(var(--dtc-blue) / <alpha-value>)',
          hot: 'rgb(var(--dtc-hot) / <alpha-value>)',
          'hot-dim': 'var(--dtc-hot-dim)',
          warm: 'rgb(var(--dtc-warm) / <alpha-value>)',
          'warm-dim': 'var(--dtc-warm-dim)',
          green: 'rgb(var(--dtc-green) / <alpha-value>)',
          gold: 'rgb(var(--dtc-gold) / <alpha-value>)',
          copper: 'rgb(var(--dtc-copper) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'glow-cyan-lg': '0 0 40px -5px rgba(0, 240, 255, 0.5)',
        'glow-hot': '0 0 25px -5px rgba(255, 59, 48, 0.4)',
        'glow-warm': '0 0 25px -5px rgba(255, 149, 0, 0.4)',
        'hud': 'inset 0 0 20px rgba(0, 240, 255, 0.05), 0 0 15px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-stream': 'flowStream 2s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flowStream: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
        'radial-thermal': 'radial-gradient(circle at 50% 50%, rgba(255, 59, 48, 0.12) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
