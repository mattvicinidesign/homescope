# Layout Tokens Documentation

## Overview

Layout primitives are semantic tokens for page scaffolding (containers, sections, gaps) that are separate from component-level spacing. They provide a consistent layout system while allowing layout values to evolve independently from component spacing tokens.

## Layout Primitives

All layout tokens are defined in `src/tokens.css` under the "Layout Primitives" section. Layout tokens reference the spacing scale where values match exactly, maintaining semantic naming while avoiding duplication.

### Container Tokens

#### `--container-max-width`
- **Value**: `1200px`
- **Usage**: Maximum width for content containers
- **Tailwind Utility**: `max-w-container`
- **Example**: `<div className="max-w-container mx-auto">`

#### `--container-padding-x`
- **Value**: `16px`
- **Usage**: Horizontal padding for container content
- **Tailwind Utility**: `px-container-x`
- **Example**: `<section className="px-container-x">`

#### `--container-padding-y`
- **Value**: `16px`
- **Usage**: Vertical padding for container content (used in headers, card sections)
- **Tailwind Utility**: `py-container-y`
- **Example**: `<header className="py-container-y">`

### Section Tokens

#### `--section-padding-y-lg`
- **Value**: `48px`
- **Usage**: Large vertical padding for major sections (hero, CTA sections)
- **Tailwind Utility**: `py-section-lg`
- **Example**: `<section className="py-section-lg">`

### Layout Gap Tokens

#### `--layout-gap`
- **Value**: `16px`
- **Usage**: Default gap for layout grids (card grids, layout containers)
- **Tailwind Utility**: `gap-layout`
- **Example**: `<div className="grid gap-layout">`

## Common Patterns

### Page Wrapper
```tsx
<div className="min-h-screen flex flex-col">
  {/* Page content */}
</div>
```

### Header with Container Padding
```tsx
<header className="px-container-x py-container-y border-b border-border">
  {/* Header content */}
</header>
```

### Hero/CTA Section
```tsx
<section className="py-section-lg px-container-x text-center">
  {/* Section content */}
</section>
```

### Container with Grid
```tsx
<section className="px-container-x py-container-y grid gap-layout max-w-container mx-auto w-full">
  {/* Grid items */}
</section>
```

### Full-Width Container with Max-Width
```tsx
<section className="max-w-container mx-auto w-full px-container-x">
  {/* Content */}
</section>
```

## Token Philosophy

### Layout vs. Component Spacing

- **Layout tokens** (`--container-*`, `--section-*`, `--layout-gap`): Used for page scaffolding, containers, sections, and layout-level gaps
- **Spacing tokens** (`--space-*`): Used for component-internal spacing (margins between elements, padding within components)

### When to Use What

| Use Case | Token Type | Example |
|----------|-----------|---------|
| Page/section horizontal padding | Layout | `px-container-x` |
| Section vertical spacing | Layout | `py-section-lg` |
| Layout grid gaps | Layout | `gap-layout` |
| Container max-width | Layout | `max-w-container` |
| Component internal spacing | Spacing | `mb-4`, `p-2`, `gap-4` (when used in components) |
| Button padding | Spacing | `px-6 py-3` |

## Intentional Exceptions

1. **Component-internal spacing**: Buttons, cards, and other components use spacing tokens (`--space-*`) for internal padding/margins, not layout tokens. This keeps component spacing independent from layout scaffolding.

2. **Semantic element spacing**: Margin between heading and paragraph (`mb-4`) uses spacing tokens, as this is content-level spacing rather than layout scaffolding.

## Future Considerations

If additional layout variants are needed:
- `--section-padding-y-sm` / `--section-padding-y-md` for smaller sections
- `--layout-gap-sm` / `--layout-gap-lg` for different gap sizes
- `--container-padding-x-lg` for wider containers

These should be added as needed based on design requirements, maintaining the semantic naming convention.
