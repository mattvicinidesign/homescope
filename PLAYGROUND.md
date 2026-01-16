# Design System Playground

## Overview

The Design System Playground is a comprehensive showcase page for tokens, components, and layout primitives. It serves as a regression surface for visual testing and a reference for designers and developers.

## Access

The Playground is accessible via navigation:
- Use the "Playground" link in the top navigation bar (available on both Landing and Playground pages)
- The page uses simple client-side routing via React state (no URL changes)

## Purpose

The Playground demonstrates:

1. **Theme Switching**: Light/dark theme toggle with localStorage persistence
2. **Token Previews**: Visual representation of all design tokens:
   - Colors (background, surface, text, primary, status colors)
   - Typography (font sizes, weights, line heights)
   - Spacing scale
   - Border radius values
3. **Layout Primitives**: Examples of container widths, section padding, and layout gaps
4. **Component Gallery**: All variants of StatusPill and DealSummaryCard

## Adding New Components to the Playground

To add a new component to the showcase:

1. Import the component in `src/pages/PlaygroundPage.tsx`:
   ```tsx
   import YourComponent from '../components/YourComponent';
   ```

2. Add a new section in the "Components" area:
   ```tsx
   <div>
     <h3 className="font-sans text-lg font-semibold text-text mb-4">YourComponent</h3>
     <div className="flex flex-wrap gap-layout">
       <YourComponent prop1="value1" />
       <YourComponent prop2="value2" />
     </div>
   </div>
   ```

3. Use token-backed Tailwind utilities for layout (no arbitrary values)

## Adding New Tokens to the Playground

To showcase a new token:

1. **Colors**: Add a new `<ColorSwatch>` in the "Tokens: Colors" section:
   ```tsx
   <ColorSwatch 
     tokenName="--color-your-token" 
     label="Your Label" 
     textToken="--color-text" 
   />
   ```

2. **Spacing**: Add to the spacing scale array in "Tokens: Spacing + Radius":
   ```tsx
   { token: '--space-X', value: 'Ypx' }
   ```

3. **Typography**: Add example text using the appropriate Tailwind font size utilities

4. **Radius**: Add to the radius array in "Tokens: Spacing + Radius" section

## Styling Guidelines

- **Use token-backed Tailwind utilities** for all layout (no arbitrary values like `[200px]`)
- **No hard-coded values** outside `tokens.css`
- **Component internals remain CSS-based** - don't migrate component styling to Tailwind
- **Layout scaffolding** uses primitives: `max-w-container`, `px-container-x`, `py-section-lg`, `gap-layout`

## Theme Persistence

Theme preference is saved to `localStorage` with key `"theme"` and persists across page refreshes. The theme toggle sets `data-theme="dark"` on `<html>` element, which triggers CSS variable overrides in `tokens.css`.

## File Structure

- `src/pages/PlaygroundPage.tsx` - Main playground page component
- `src/styles.css` - Grid utilities for playground-specific layouts (token-backed)
- `src/tokens.css` - All design tokens (add new tokens here)
