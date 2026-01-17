/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        primary: 'var(--color-primary)',
        button: {
          'primary-bg': 'var(--color-button-primary-bg)',
        },
        status: {
          ready: 'var(--color-status-ready)',
          verified: 'var(--color-status-verified)',
          pending: 'var(--color-status-pending)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        pill: 'var(--radius-pill)',
      },
      spacing: {
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        12: 'var(--space-12)',
        /* Layout Primitives */
        'container-x': 'var(--container-padding-x)',
        'container-y': 'var(--container-padding-y)',
        'section-lg': 'var(--section-padding-y-lg)',
        'layout': 'var(--layout-gap)',
        /* Component-specific spacing */
        'pill-py': 'var(--status-pill-padding-y)',
        'pill-px': 'var(--status-pill-padding-x)',
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      fontSize: {
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
      },
      maxWidth: {
        container: 'var(--container-max-width)',
      },
    },
  },
  plugins: [],
}
