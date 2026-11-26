import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        bg: '#07070A',
        ink: '#EDEDE8',
        accent: '#FF5A1F',
        muted: 'rgba(237, 237, 232, 0.62)',
        line: 'rgba(237, 237, 232, 0.14)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        transition: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      },
      transitionDuration: {
        fast: '300ms',
        base: '600ms',
        slow: '1200ms',
      },
    },
  },
  plugins: [],
} satisfies Config
