# PR Review — State, Performance, Security, Testing & ESLint

## 1. State Management

- **Server state**: React Query — never duplicate into local state.
- **Auth**: `AuthProvider` / `useAuth()`.
- **Permissions**: CASL `useAbility()`.
- **Feature flags**: `useFeatureFlag()` / `<FeatureFlag>`.
- **UI-only**: `useState` (local) or URL search params (shared/persisted filters).
- Context only for truly global state. Context values in `useMemo`; updaters in `useCallback`.
- New contexts: three-file pattern (`context definition → Provider → consumer hook`). Consumer hook throws a descriptive error from `LABELS` when used outside provider.
- No Redux, MobX, Zustand unless explicitly approved.

**Flag if:**
- `const [data, setData] = useState(queryData)` — server data copied into local state.
- A new context introduced for component-local state.
- Context value not wrapped in `useMemo`.
- A new global state library introduced.

---

## 2. Performance

- `useMemo` / `useCallback` / `React.memo` — intentional, not blanket.
- `useEffect` dependency arrays: primitive values, not whole object references. Guard `setState` calls with value comparison.
- Route-level code splitting: `React.lazy` + `Suspense` with layout-stable fallbacks.
- Large lists: consider virtualization when dataset size justifies it.
- No new object/array literals passed as props in hot render paths.
- Debounce search inputs: `useDebounce(value, 300)`.

**Flag if:**
- `useMemo` applied to a trivial expression.
- `useEffect` depends on an object reference that could be a primitive.
- A search input dispatches on every keystroke without debounce.
- `setState` inside `useEffect` does not check previous vs. next value.

---

## 3. Security

- Shared API client only — never create per-module Axios instances.
- Never log tokens, credentials, or sensitive payloads.
- Never use `dangerouslySetInnerHTML` without content sanitization.
- Untrusted values must not be injected into scriptable attributes or URLs.
- Auth state cleanup: clear on logout and 401.
- Route/UI guards via CASL ability checks (`<ProtectedRoute module={...} action={...} />`).
- Client-side guards are for UX — server-side enforcement is assumed.

**Flag if:**
- A new Axios instance created outside `src/services/api.ts`.
- Sensitive data in `console.log` or stored in localStorage beyond authorized `STORAGE_KEYS`.
- `dangerouslySetInnerHTML` used without sanitization.
- A protected page/action lacks a permission check.

---

## 4. Testing

- Use `renderWithProviders` (or `renderWithDataRouterProviders`) from `src/test/utils.tsx` — never mount without providers.
- Mock **services** at module level (`jest.mock('@/services/...')`) — not hook internals.
- Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText`.
- Test both success and error paths, loading and empty states.
- No `any` in test files unless strictly necessary.
- Tests co-located: `fileName.test.ts` next to `fileName.ts`.

**Flag if:**
- A component test renders without `renderWithProviders`.
- Hooks or internal state mocked instead of service functions.
- Only the happy path tested — error and edge cases missing.
- `getByTestId` used when an accessible query would work.

---

## 5. ESLint & Formatting

| Rule | Level | Note |
|---|---|---|
| `@typescript-eslint/no-explicit-any` | error | Use `unknown` + narrowing |
| `no-console` | error | Use Sentry / Sonner |
| `max-lines` | error (300) | Excludes blanks + comments |
| `complexity` | warn @ 15 | |
| `max-depth` | warn @ 4 | |
| `max-params` | warn @ 4 | |
| `no-param-reassign` | error | Exceptions: `state`, `draft`, `config` |
| `prefer-const` | error | |
| `no-duplicate-imports` | error | |
| `no-nested-ternary` | warn | |
| `@typescript-eslint/naming-convention` | error | PascalCase for types/interfaces |

Prettier: 4-space indent, single quotes, 140 print width, trailing commas, bracket spacing, arrow parens always, LF line endings.

---

## 6. Git & PR Hygiene

- Commit messages follow Conventional Commits (enforced by `commitlint`).
- One logical change per commit when practical.
- New features: behind `<FeatureFlag>` / `useFeatureFlag` gates when not fully rolled out.
- Dev-only code: gated with `IS_DEV` from `@/lib/env`.
- Security-related dependency changes: include risk notes in PR description.
