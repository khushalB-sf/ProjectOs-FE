# Component Architecture — Detailed Guide

## 1. Folder & File Structure

- **Pages**: all route-level components in `src/pages/<feature>/<Feature>Page.tsx`. Handle page-level layout, data wiring, and error boundaries.
- **Common Components**: shared, reusable components (e.g., `ProtectedRoute`, `ErrorBoundary`) in `src/components/common/`. Must be generic — no feature-specific logic.
- **Feature Modules**: module-specific UI in `src/components/<module>/` (e.g., `src/components/employee/`). Organize by feature, not by type.
- **UI Primitives**: shadcn/ui primitives in `src/components/ui/`. Treat as vendor code — do not refactor unless extending for the whole app.

## 2. Component Design Principles

- **Single Responsibility**: each component does one thing. Split at ~200 lines or when multiple responsibilities emerge.
- **Composability**: build small, focused components that compose together.

  ```tsx
  <Card>
    <CardHeader>...</CardHeader>
    <CardContent>...</CardContent>
  </Card>
  ```

- **Splitting**: extract hooks (e.g., `useEmployeeFilters`) when a component grows large.

## 3. Data Flow & Props

- Pass data and callbacks via props. Presentational components should not import context or hooks that fetch data.

  ```tsx
  // Good — container wires data, presentational renders it
  <EmployeeList employees={employees} onSelect={handleSelect} />

  // Bad — presentational component fetches its own data
  // inside EmployeeList: import { useEmployees } from '@/hooks/employee/queries'
  ```

- Use context only for truly global state (auth, theme, feature flags, permissions). Never for local state.

## 4. Side Effects & Hooks

- Keep all data fetching, mutations, and side effects in `src/hooks/**`.
- Presentational components: pure, props-only.

  ```tsx
  // Hook
  export function useFeatureItems() { ... }

  // Page (container)
  const { data } = useFeatureItems();
  return <FeatureList items={data ?? []} />;
  ```

## 5. Code Splitting & Lazy Loading

- Route-level code splitting with `React.lazy` + `Suspense`. See `src/routes/index.tsx`.

  ```tsx
  const EmployeePage = React.lazy(() => import('@/pages/employee/EmployeePage'));
  <Suspense fallback={<PageLoadingState />}>
    <EmployeePage />
  </Suspense>
  ```

## 6. Composition Patterns

- **Container + Presentational**: containers/pages handle data fetching; presentational components render props only.
- **Compound Components**: for structured UIs (cards, panels, drawers), expose subcomponents under the parent.
- **Variant-driven UI**: encode variants via typed prop contracts; do not branch on string literals at call sites.
- **Avoid premature abstraction**: introduce a generic component only after at least two concrete usages exist.

## 7. Anti-Patterns

- Never put business logic or API calls in presentational components.
- Never import feature-specific code into `common/` or `ui/` components.
- Never use context for local state.
- No new class components except React error boundaries.
- Prefer named exports for shared components. Default exports are acceptable for route-level pages.

## 8. Design System

- All design tokens (colors, spacing, radii) defined in `src/index.css` under `:root`. Never hardcode values.
- All UI elements use primitives from `src/components/ui/`.
- Compose className with `cn()` from `@/lib/utils`.
- Custom CSS: scoped to component, use `var(--token)`, placed next to component file.
- No `!important` except Sonner toast overrides.
- Icons: `lucide-react` only. Decorative: `aria-hidden="true"`. Icon-only buttons: `aria-label`.
