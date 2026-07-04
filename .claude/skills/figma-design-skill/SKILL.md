---
name: figma-design-skill
description: Use when the user provides a Figma URL/frame and wants the UI built as React components for this repo — e.g. "build this Figma design", "implement the screen at <figma url>", "convert this frame to a component". Extracts design context via the Figma MCP and maps it to the project's design tokens, shadcn/ui primitives, and Tailwind, producing accessible, responsive components. Do NOT use without a Figma reference, for backend/logic work, or for editing existing components that aren't tied to a design.
---

## Overview

Convert Figma designs into production-ready React components for the ProjectOS project.
Uses the Figma MCP to extract design context and maps it to the project's design
system tokens, shadcn/ui primitives, and conventions.

---

## Workflow

### 1. Extract Figma Design

Parse the Figma URL and call the Figma MCP `get_design_context` tool.
The output is a **reference** — never copy it verbatim.

### 2. Load Project Design System

Read `src/index.css` for all design tokens (`--color-*`, `--radius`, `--shadow-*`).
Cross-reference with `.github/instructions/coding/components/design-system.instructions.md`.

### 3. Discover Existing Components

Search before creating:
- `src/components/ui/` — shadcn/ui primitives (Button, Card, Dialog, etc.)
- `src/components/common/` — shared components (PageState, SidePanel, DataTable)
- `src/components/<module>/` — feature components that can be reused

### 4. Map Figma Tokens to Project Tokens

| Figma Value | Project Token | Tailwind Class |
|-------------|---------------|----------------|
| `#ef5366` | `--primary` | `bg-primary`, `text-primary` |
| `#380d6f` | `--sidebar` | `bg-sidebar` |
| `#0f172a` | `--color-text-primary` | `text-foreground` |
| `#64748b` | `--color-text-secondary` | `text-muted-foreground` |
| `#f9fafb` | `--color-background` | `bg-background` |
| `#e2e8f0` | `--border` | `border-border` |
| `#22c55e` | `--color-success` | `bg-[var(--color-success)]`, `text-[var(--color-success)]` |
| `#d94c5d` | `--destructive` | `text-destructive` |

If a Figma colour has no matching token, use the closest one or add a new token
to `src/index.css` `:root` with a descriptive name.

### 5. Build the Component

**Structure:**
- Place in `src/components/<module>/`
- One component per file; split if >200 lines
- Props interface above the component; named export

---

## Styling Reference

### Rules (non-negotiable)

- `cn()` from `@/lib/utils` for className — never string concat
- Tailwind utilities only — no inline `style={{}}` for static values
- No arbitrary `[value]` syntax when a token or Tailwind utility exists
- No hardcoded hex colours — map to design tokens
- No `!important` (exception: Sonner toast overrides only)
- `cva()` for multi-variant components
- Custom CSS: scoped to component, use `var(--token)`, placed next to component file
- Tailwind v4 — uses `@import 'tailwindcss'`, not `@tailwind base/components/utilities`

### Design Tokens (from `src/index.css`)

**Brand / Semantic**

| Token | Value | Tailwind utility |
|---|---|---|
| `--primary` | `#ef5366` | `bg-primary` · `text-primary` |
| `--primary-foreground` | `#fdeef0` | `text-primary-foreground` |
| `--secondary` | `#ebe7f1` | `bg-secondary` |
| `--secondary-foreground` | `#380d6f` | `text-secondary-foreground` |
| `--destructive` | `#d94c5d` | `text-destructive` · `bg-destructive` |
| `--sidebar` | `#380d6f` | `bg-sidebar` |
| `--muted` | oklch(0.968) | `bg-muted` |
| `--muted-foreground` | `#8897ae` | `text-muted-foreground` |
| `--border` | `#e2e8f0` | `border-border` |
| `--background` | `#f9fafb` | `bg-background` |
| `--foreground` | `#101828` | `text-foreground` |
| `--card` | `#ffffff` | `bg-card` |
| `--radius` | `0.625rem` | `rounded-[var(--radius)]` |
| `--shadow-card` | `0px 1px 2px …` | `shadow-[var(--shadow-card)]` |

**Legacy alias tokens** (use via `var()` when no Tailwind utility maps):

| Token | Use case |
|---|---|
| `--color-text-primary` | Primary body text |
| `--color-text-secondary` | Secondary / muted text |
| `--color-success` | `#22c55e` — success states |
| `--color-warning` | `#f59e0b` — warning states |
| `--color-error` | `#d94c5d` — error states |
| `--color-background` | Page background |
| `--color-surface` | Card / surface background |
| `--color-border` | Dividers, input borders |

**Badge tokens** (use `bg-[var(--badge-*)]` pattern):

`--badge-green-bg/border/text` · `--badge-blue-bg/border/text` · `--badge-rose-bg/border/text` · `--badge-orange-bg/border/text` · `--badge-violet-bg/border/text` · `--badge-secondary-bg/text`

**Allocation / status colours:** `--allocation-recent` · `--allocation-growing` · `--allocation-mature` · `--allocation-old` · `--allocation-zero`

### Typography Mapping

| Figma spec | Tailwind |
|---|---|
| 12px / 400 | `text-xs font-normal` |
| 14px / 400 | `text-sm font-normal` |
| 14px / 500 | `text-sm font-medium` |
| 16px / 500 | `text-base font-medium` |
| 18px / 600 | `text-lg font-semibold` |
| 20px / 600 | `text-xl font-semibold` |
| 24px / 700 | `text-2xl font-bold` |

### Responsive Breakpoints (Tailwind v4 defaults)

| Prefix | Min-width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

Mobile-first. Apply base styles without prefix, override at larger breakpoints.

### Spacing

Use Tailwind spacing scale (`p-4` = 16px, `gap-6` = 24px). For pixel-exact Figma values not in the scale, use `var(--token)` if a token exists, otherwise `p-[Npx]` arbitrary is acceptable.

### Multi-variant Components (`cva`)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]',
        destructive: 'bg-[var(--badge-rose-bg)] text-[var(--badge-rose-text)] border border-[var(--badge-rose-border)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
```

### Animations

Use `tw-animate-css` utilities (already imported): `animate-fade-in`, `animate-slide-in-from-top`, etc. For custom animations, define keyframes in `src/index.css`.

### Icons

Use `lucide-react` exclusively. Decorative: `aria-hidden="true"`. Icon-only buttons: parent gets `aria-label`.

---

**Accessibility (Mandatory):**
- Semantic HTML (`<main>`, `<section>`, `<button>`, not `<div onClick>`)
- Logical heading order (h1 → h2 → h3)
- All inputs have labels; all interactive elements keyboard-accessible
- `role="status"` + `aria-live="polite"` on loading/empty states
- Focus outlines preserved; colour never sole state indicator

**Text Content:**
- All user-visible strings from `LABELS.*` — never hardcode text in JSX

### 6. Validate

1. Token audit — `grep -rn '#[0-9a-fA-F]' <file>` for hardcoded hex values
2. Type check — `npx tsc --noEmit --pretty`
3. Lint check — `npx eslint <file>`

---

## Rules

- Never copy Figma MCP output verbatim — adapt to project conventions
- Never introduce new UI libraries or CSS frameworks
- Never modify files in `src/components/ui/` (vendor code)
- Implement ALL states (hover, active, disabled, loading, empty, error)
- Split components >200 lines into subcomponents
