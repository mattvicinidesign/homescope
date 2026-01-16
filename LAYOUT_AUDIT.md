# Layout Usage Audit

## STEP 1: Current Layout Patterns

### File: `src/pages/LandingPage.tsx`

1. **Header** (line 22):
   - `className="p-4 ..."`
   - Current: `p-4` = 16px (all sides)
   - Maps to: Container padding (header typically uses container padding-x)

2. **Hero Section** (line 32):
   - `className="py-12 px-4 ..."`
   - Current: `py-12` = 48px (vertical), `px-4` = 16px (horizontal)
   - Maps to: Section padding-y-lg, container padding-x

3. **Cards Section** (line 41):
   - `className="p-4 grid ... gap-4 max-w-container mx-auto w-full"`
   - Current: `p-4` = 16px (all sides), `gap-4` = 16px (grid gap), `max-w-container` = 1200px
   - Maps to: Container padding, layout gap, container max-width

4. **CTA Section** (line 64):
   - `className="py-12 px-4 ..."`
   - Current: `py-12` = 48px (vertical), `px-4` = 16px (horizontal)
   - Maps to: Section padding-y-lg, container padding-x

### Current Token Mapping (Before Refactor):
- `p-4`, `px-4` → `--space-4` (16px) - Used for container padding
- `py-12` → `--space-12` (48px) - Used for section vertical padding
- `gap-4` → `--space-4` (16px) - Used for layout gaps
- `max-w-container` → `--container-max` (1200px) - Container max width

### After Refactor - Layout Primitives:
- `px-container-x` → `--container-padding-x` (16px) - Container horizontal padding
- `py-container-y` → `--container-padding-y` (16px) - Container vertical padding
- `py-section-lg` → `--section-padding-y-lg` (48px) - Section vertical padding
- `gap-layout` → `--layout-gap` (16px) - Layout grid gap
- `max-w-container` → `--container-max-width` (1200px) - Container max width

### Layout Primitive Requirements:

1. **Container:**
   - Max width: `--container-max-width` (already exists as `--container-max`)
   - Horizontal padding: `--container-padding-x` (currently 16px = `--space-4`)

2. **Sections:**
   - Vertical padding large: `--section-padding-y-lg` (currently 48px = `--space-12`)
   - Can reuse existing `--space-12` or create semantic token

3. **Layout Gaps:**
   - Default gap: `--layout-gap` (currently 16px = `--space-4`)
   - Can reuse existing `--space-4` or create semantic token

### Decision:
Since we want semantic layout primitives that are separate from generic spacing, we should:
- Create semantic layout tokens that reference the underlying spacing tokens OR
- Create semantic layout tokens with explicit values that match current usage

Given the requirement for semantic primitives, I'll create explicit layout tokens that match current values, allowing for independent evolution of layout vs. component spacing.
