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
        dtc: {
          bg: '#05070B',
          card: '#0B0F17',
          surface: '#101726',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-glow': 'rgba(0, 240, 255, 0.25)',
          cyan: '#00F0FF',
          'cyan-dim': 'rgba(0, 240, 255, 0.15)',
          blue: '#2563EB',
          hot: '#FF3B30',
          'hot-dim': 'rgba(255, 59, 48, 0.15)',
          warm: '#FF9500',
          'warm-dim': 'rgba(255, 149, 0, 0.15)',
          green: '#10B981',
          gold: '#FBBF24',
          copper: '#B87333',
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
