import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0a0a0b',
          50: '#0f0f10',
          100: '#151516',
          200: '#1d1d1f',
          300: '#262628',
          400: '#2e2e30',
          500: '#3a3a3c',
          600: '#4a4a4c',
          700: '#5a5a5c',
          800: '#6a6a6c',
          900: '#7a7a7c',
        },
        ink: {
          DEFAULT: '#f7f5f2',
          dim: '#c9c7c2',
          muted: '#9a9892',
          subtle: '#6b6963',
        },
        bone: {
          DEFAULT: '#ece8e1',
          dim: '#cdc9c1',
          muted: '#a39e95',
          subtle: '#7a756b',
        },
        voxel: {
          DEFAULT: '#ffb000',
          50: '#fff4d9',
          100: '#ffe7ad',
          200: '#ffd97a',
          300: '#ffca47',
          400: '#ffb614',
          500: '#ffb000',
          600: '#e59b00',
          700: '#b87d00',
          800: '#8c5f00',
          900: '#644700',
        },
        steel: {
          DEFAULT: '#d8d8dc',
          dim: '#a8a8b0',
          muted: '#7a7a82',
          subtle: '#5a5a62',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.04em',
        tighter: '-0.06em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.14em',
      },
      lineHeight: {
        breath: '1.5',
        stanza: '1.7',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        hairline: '0 1px 0 rgba(255,255,255,0.04)',
        hairlineInset: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
        shimmer: 'shimmer 2s linear infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
