import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        samasta: {
          burgundy: '#E85D75',
          'burgundy-dark': '#C4475C',
          cream: '#FFF7F2',
          'cream-dark': '#FFE8DC',
          sage: '#7BA38A',
          gold: '#E8A87C',
          charcoal: '#2D2426',
          muted: '#7A6E70',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(circle at 18% 18%, rgba(232,168,124,0.22) 0%, transparent 48%), radial-gradient(circle at 85% 8%, rgba(232,93,117,0.16) 0%, transparent 42%)',
        'section-gradient': 'linear-gradient(180deg, #FFF7F2 0%, #FFE8DC 100%)',
        'dash-warm':
          'linear-gradient(160deg, #FFF7F2 0%, #FFEDE6 45%, #FFF5F7 100%)',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(196, 71, 92, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config
