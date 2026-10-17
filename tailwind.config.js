/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        orange: '#F97316',
        slate: '#64748B',
        emerald: '#10B981',
        offwhite: '#F1F5F9',
        darkbg: '#0F1419',
        warmbg: '#FEF8F3',
      },
      fontFamily: {
        heading: ['"Sora"', '"Outfit"', 'system-ui', 'sans-serif'],
        body: ['"Lexend"', '"Open Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      borderRadius: {
        '8': '8px',
        '12': '12px',
        '16': '16px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
