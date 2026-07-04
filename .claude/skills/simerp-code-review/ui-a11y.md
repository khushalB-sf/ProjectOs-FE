# PR Review — Components, Styling & Accessibility

## 1. Component Design

- Single responsibility: max ~200 lines; split into subcomponents or hooks when exceeded.
- Data fetching belongs in hooks or pages — presentational components receive data via props only.
- Class composition: `cn()` from `@/lib/utils` for all className composition — never string concatenation or template literals.
- `src/components/ui/` files are vendor code — do not modify unless fixing a bug or extending for the whole app.
- Named exports for shared components; default exports acceptable for route-level pages.

**Flag if:**

- A presentational component calls a hook that fetches data.
- New code composes `className` via string concatenation/template literals instead of `cn()`.
- Files in `src/components/ui/` are modified.
- A component exceeds ~300 lines.

---

## 2. Styling

- Tailwind CSS only — no inline styles (except truly dynamic values), no CSS-in-JS, no external CSS frameworks.
- Design tokens from `src/index.css` `:root` — never hardcode hex colors.
- Conditional classes: `cn()` + boolean expressions; never ternary in template literals.
- Variants: `cva()` (class-variance-authority) for multi-variant components.
- No `!important` except Sonner toast overrides.
- No arbitrary Tailwind values (`[value]` syntax) when a design token exists.

**Flag if:**

- `style={{}}` used for a static value.
- A hardcoded hex color appears outside `src/index.css`.
- `className` uses string interpolation instead of `cn()`.
- `!important` used outside the Sonner exception.

---

## 3. Accessibility

- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<button>`, `<form>` — never `<div onClick>`.
- Heading levels follow logical order (h1 → h2 → h3), never skip.
- Every `<input>` must have a visible `<label>` (via `FormLabel`) or `aria-label`.
- Decorative icons: `aria-hidden="true"`.
- Icon-only buttons: `aria-label` describing the action.
- Loading/empty/error states: `role="status"` + `aria-live="polite"`.
- Dialogs, sheets, popovers: use Radix/shadcn primitives for built-in focus traps — never custom focus management.
- Focus outlines must not be removed without a visible alternative.
- Color must not be the sole indicator of state — pair with icon or text.

**Flag if:**

- `<div>` or `<span>` has an `onClick` handler.
- An icon in a button is missing `aria-hidden="true"`.
- An icon-only button is missing `aria-label`.
- A form field is missing a label.
- Heading levels are skipped.
- `dangerouslySetInnerHTML` is used without sanitization.
