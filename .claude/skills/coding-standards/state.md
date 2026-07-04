# State Management — Detailed Guide

## 1. State Types & Where They Live

| State type | Tool | Location |
|---|---|---|
| Server / remote data | TanStack React Query | `src/hooks/<module>/` |
| Auth | `AuthProvider` / `useAuth()` | `src/contexts/AuthContext.tsx` |
| Permissions | CASL `useAbility()` | `src/components/common/ability-provider/` + `src/hooks/permissions/` |
| Feature flags | `useFeatureFlag()` / `<FeatureFlag>` | `src/lib/feature-flags/` |
| Ephemeral UI | `useState` | local to component |
| Shared/persisted filters | URL search params | component + router |

## 2. React Query Key Management

- Centralize all keys in `src/constants/queryKeys.ts`.

  ```ts
  import { EMPLOYEE_QUERY_KEYS } from '@/constants/queryKeys';
  useQuery({ queryKey: EMPLOYEE_QUERY_KEYS.EMPLOYEES, queryFn: fetchEmployees });
  ```

- Invalidate via `useQueryClient()` in mutation `onSuccess`:

  ```ts
  void queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.EMPLOYEES });
  ```

## 3. Context Guidelines

- Use context only for truly cross-cutting state (auth, permissions, feature flags, app-level config).
- Context values must be wrapped in `useMemo`; updater functions in `useCallback`.
- New contexts follow the three-file pattern: `context definition → Provider → consumer hook`.
- Consumer hooks throw a descriptive error (from `LABELS`) when used outside the provider.
- Co-locate provider setup near app composition boundaries.
- If state is needed by only a small subtree, use props or local hooks first.

## 4. Rules & Best Practices

- Never fetch data directly in component bodies or `useEffect`. Always use hooks.
- Never copy server state into `useState` (`const [data, setData] = useState(queryData)`).
- Never use context for local/component state.
- Keep state as close to where it is used as possible; lift only when multiple components share it.
- No Redux, MobX, Zustand, or other global state libraries unless explicitly approved.

## 5. Anti-Patterns

- `const [data, setData] = useState(queryData)` — duplicating server state.
- New context introduced for component-local state.
- Context value not wrapped in `useMemo`.
- `useEffect` with server data instead of React Query.
- Mutating React Query cache directly.
