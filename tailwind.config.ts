import type { Config } from 'tailwindcss';

/** Design tokens live as CSS variables in app/globals.css (PRD 16.2). */
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-soft': 'var(--color-brand-soft)',
        cta: 'var(--color-cta)',
        'cta-dark': 'var(--color-cta-dark)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        surface: 'var(--color-surface)',
        line: 'var(--color-line)',
      },
      fontFamily: { sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      borderRadius: { xl: 'var(--radius)' },
      boxShadow: { card: 'var(--shadow-card)' },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
};
export default config;
