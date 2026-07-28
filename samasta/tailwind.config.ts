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
          burgundy: '#4F46E5',
          'burgundy-dark': '#3730A3',
          cream: '#F8FAFC',
          'cream-dark': '#EEF2FF',
          sage: '#7DD3FC',
          gold: '#FB7185',
          charcoal: '#1F2937',
          muted: '#64748B',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(circle at 20% 20%, rgba(251,113,133,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 0%, rgba(79,70,229,0.14) 0%, transparent 45%)',
        'section-gradient': 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
