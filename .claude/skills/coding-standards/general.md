# General Conventions — Detailed Guide

Covers: project conventions, testing, performance, security.

## 1. Project Conventions

- `no-console` is an error. Use `Sentry.captureException(error)` for errors, Sonner `toast` for user-facing messages.
- Max file length: 300 lines (ESLint `max-lines`; excludes blanks + comments).
- Prettier config: 4-space indent, single quotes, 140 print width, trailing commas, bracket spacing, arrow parens always, LF line endings. Imports auto-sorted.
- Commit messages follow Conventional Commits (enforced by `commitlint`).
- New features behind `<FeatureFlag>` / `useFeatureFlag` gates when not yet fully rolled out.
- Dev-only routes/code gated with `IS_DEV` from `@/lib/env`.

### ESLint Rules (Key)

| Rule                                   | Level       | Note                                   |
| -------------------------------------- | ----------- | -------------------------------------- |
| `@typescript-eslint/no-explicit-any`   | error       | Use `unknown` + narrowing              |
| `no-console`                           | error       | Sentry / Sonner instead                |
| `max-lines`                            | error (300) | Excludes blanks + comments             |
| `complexity`                           | warn @ 15   |                                        |
| `max-depth`                            | warn @ 4    |                                        |
| `max-params`                           | warn @ 4    |                                        |
| `no-param-reassign`                    | error       | Exceptions: `state`, `draft`, `config` |
| `prefer-const`                         | error       |                                        |
| `no-duplicate-imports`                 | error       |                                        |
| `no-nested-ternary`                    | warn        |                                        |
| `@typescript-eslint/naming-convention` | error       | PascalCase for types/interfaces        |

## 2. Testing

### Setup

- Runner: Jest + ts-jest (see `jest.config.ts`).
- UI: React Testing Library.
- Always wrap with `renderWithProviders` (or `renderWithDataRouterProviders`) from `src/test/utils.tsx`.
- Manual mocks under `src/**/__mocks__/**` for `import.meta.env`, browser APIs.

### What to Test

- User-visible behavior: rendered output, visible text, ARIA roles, states.
- User interactions: click, type, keyboard navigation.
- Side effects: API calls, navigation, toasts.
- Edge cases: empty states, loading, error, boundary conditions.
- Both success and error paths.

### Mocking

- Mock **services** at module level: `jest.mock('@/services/...')` — never mock hook internals.
- Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText` over `getByTestId`.
- Co-locate tests: `fileName.test.ts` next to `fileName.ts`.

### Anti-Patterns

- Rendering without `renderWithProviders`.
- Mocking hooks or internal state instead of service functions.
- Testing only the happy path — error/edge cases missing.
- `getByTestId` when an accessible query would work.
- `any` in test files unless strictly necessary.

## 3. Performance

- Optimize based on profiling and measurable bottlenecks — not assumptions.
- `useMemo` only for expensive derived values / large list transforms.
- `useCallback` only when stable function identity matters (memoized children, deep props).
- `React.memo` for pure presentational components with stable props.
- `useEffect` dependency arrays: use primitive values, not whole object references.
- Debounce search inputs: `useDebounce(value, 300)`.
- No new object/array literals as props in hot render paths.
- Route-level lazy loading (`React.lazy` + `Suspense`) with layout-stable fallbacks.
- Virtualize large lists only when dataset size justifies the complexity.
- Prefer tree-shakeable imports; avoid large dependencies for small utilities.

## 4. Security

- Treat all user input and remote data as untrusted.
- Never `dangerouslySetInnerHTML` without sanitizing content first.
- Never log tokens, credentials, or sensitive payloads (`console.log` or otherwise).
- Auth headers via interceptors in `src/services/api.ts` — no per-call auth branching.
- Handle 401/403 centrally.
- Route/UI guards via `<ProtectedRoute module={...} action={...} />` (CASL). Client-side guards are UX — server-side enforcement is assumed.
- Clear auth state on logout and on session expiry.
- Only `STORAGE_KEYS` constants stored in localStorage — nothing else sensitive.
- Never build HTML strings manually; keep user-provided text as plain text.
- Never inject untrusted values into scriptable attributes or URLs.
- Prefer well-maintained packages; pin and review dependency upgrades; remove unused packages promptly.

## 5. Validation (Zod)

- All schemas in `src/schemas/<module>/index.ts`. Export inferred types: `export type CreateXFormData = z.infer<typeof createXSchema>`.
- All validation messages from `LABELS.*.VALIDATION.*` — never inline strings.
- String fields: always add `.max()` constraints.
- Cross-field validation: `.superRefine()`.
- Date strings (`YYYY-MM-DD`): append `T00:00:00` to parse as local time, not UTC.
- Shared refinement logic: extract as a named function if used in multiple schemas.
- Field names must align with API payload keys.
- Server field errors: `applyServerErrors(error, form.setError)` from `@/lib/form-utils.ts`.
