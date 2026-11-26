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
        muted: 'rgba(237, 237, 232, 0.7)',
        line: 'rgba(237, 237, 232, 0.14)',
        surface: '#0D0D12',
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.18em' }],
        lead: ['1.125rem', { lineHeight: '1.65' }],
        statement: ['clamp(1.75rem, 5.2vw + 0.25rem, 3.75rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        title: ['clamp(2.25rem, 7vw + 0.5rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        display: ['clamp(2.75rem, 11vw, 7rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
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
