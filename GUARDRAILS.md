# Design System Guardrails

## Rules

### 1. tokens.css is the single source of truth
- **Only** `src/tokens.css` may contain raw visual values (hex colors, px/rem units)
- All other files must use CSS variables (`var(--token-name)`) or token-backed Tailwind utilities

### 2. No Tailwind arbitrary values
- **Forbidden**: `className="w-[200px]"`, `className="bg-[#ff0000]"`
- **Allowed**: `className="w-container"`, `className="bg-primary"` (token-backed utilities)

### 3. New visual decisions require tokens
- Don't add hard-coded values in components or pages
- Add new tokens to `tokens.css` first
- Map tokens to Tailwind in `tailwind.config.js` if needed

### 4. Layout primitives for scaffolding
- Use `max-w-container`, `px-container-x`, `py-section-lg`, `gap-layout` for page layout
- Don't use generic spacing utilities for layout scaffolding

### 5. Component internals remain CSS-based
- Components use CSS classes in `styles.css`
- Component styles reference tokens via `var(--token-name)`
- Don't migrate component internals to Tailwind

## Enforcement

### Automated Checks

Run token compliance checks:
```bash
npm run check:tokens
```

This script flags:
- Tailwind arbitrary values (`[...]` in className)
- Hard-coded visual values (hex, rgb, hsl, px, rem) outside `tokens.css`

### ESLint

ESLint will flag Tailwind arbitrary values in className attributes during development.

### Before Committing

The guardrails are lightweight but will catch most violations. If you see a false positive:
1. Ensure it's actually a violation (not documentation/display)
2. Consider if the value should be a token
3. If intentionally bypassing, document why in code comments

## Exceptions

- **Documentation files** (`.md`): May contain examples with hard-coded values
- **tokens.css**: The only file allowed raw visual literals
- **Inline styles with CSS variables**: `style={{ width: 'var(--space-4)' }}` is allowed

## Adding New Tokens

1. Add token to `src/tokens.css` (with dark theme override if needed)
2. Map to Tailwind in `tailwind.config.js` if creating a utility
3. Use the new token-backed utility in components/pages
