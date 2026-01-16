# Testing Guardrails

To verify guardrails work, temporarily introduce violations:

## Test Tailwind Arbitrary Values

Add to any `.tsx` file:
```tsx
<div className="w-[200px]">Test</div>
```

Run `npm run check:tokens` - should fail with error about Tailwind arbitrary value.

## Test Hard-Coded Values

Add to any `.tsx` or `.css` file (not `tokens.css`):
```tsx
<div style={{ width: '200px' }}>Test</div>
```

Or in CSS:
```css
.test { color: #ff0000; }
```

Run `npm run check:tokens` - should fail with error about hard-coded value.

## Clean Up

Remove test violations before committing.
