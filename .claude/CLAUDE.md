# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ProjectOS frontend — React 19 + TypeScript SPA for an enterprise resource planning system. Vite 7 build, Tailwind v4 + shadcn/ui, React Router v7, React Query v5, CASL for permissions, Axios. Node 22.18 / Yarn 1.22 pinned via Volta.

## Commands

```bash
yarn dev                      # Vite dev server
yarn build                    # tsc -b (app + node) then vite build — type errors fail the build
yarn lint                     # ESLint (type-aware)
yarn lint:fix                 # ESLint --fix
yarn prettier:fix             # Prettier --write
yarn test                     # Jest (jsdom)
yarn test:watch               # Jest watch mode
yarn test:coverage            # Jest with coverage (70% global threshold enforced)

# Run a single test file or pattern:
yarn test src/components/team/team-form/TeamForm.test.tsx
yarn test -t "renders empty state"
```

There is no separate `typecheck` script — `yarn build` is the type-check gate.

## Architecture

### Folder structure
```
src/
├── pages/[module]/[Module]Page.tsx     # route-level page components (one per route, lazy-loaded)
├── components/
│   ├── ui/                             # shadcn/ui primitives — generated, do not hand-edit
│   ├── common/                         # cross-module shared components (ProtectedRoute, data-table, page-state, …)
│   └── [module]/                       # feature components, kebab-case subfolders
├── hooks/[module]/
│   ├── queries.ts                      # useQuery wrappers
│   └── mutations.ts                    # useMutation wrappers
├── services/
│   ├── api.ts                          # the single Axios instance
│   └── [module]/[module]Api.ts         # the ONLY place HTTP calls live
├── contexts/                           # React Context providers + their hooks (auth, …)
├── schemas/[module]/index.ts           # Zod validation schemas
├── types/[module]/index.ts             # TypeScript types (common types in types/common)
├── constants/
│   ├── labels.ts                       # aggregates per-module */labels.ts (all UI strings)
│   ├── endpoints.ts · routes.ts        # API paths · client route paths
│   ├── queryKeys.ts                    # React Query key factories
│   └── [module]/                       # module constants + labels.ts
├── lib/                                # framework-agnostic setup/utils (sentry, env, feature-flags, utils)
├── layouts/  ·  routes/                # layout wrappers · createBrowserRouter config
└── test/                               # setup.ts + renderWithProviders (utils.tsx)
```
A feature module spans the parallel `[module]/` folders above, all keyed by the same module name (e.g. `weekly-updates`). When adding a feature, mirror this layout.

### State management — NO Redux
Despite some mentions in README/constitution, **this app does not use Redux**. There is no `src/store/`. State is split:
- **Server state** → React Query (`@tanstack/react-query`). All data fetching lives in `src/hooks/[module]/queries.ts` and `mutations.ts`.
- **App-level state** → React Context providers, composed in `src/App.tsx`: `ErrorBoundary` → `FeatureFlagProvider` → `AbilityProvider` → `RouterProvider`.

### Auth — cookie-based session (not Bearer token)
- Microsoft SSO via session cookies. The Axios instance (`src/services/api.ts`) sets `withCredentials: true`; there is no Authorization/Bearer header.
- Client-side auth state is a `localStorage` flag (`STORAGE_KEYS.IS_AUTHENTICATED`) managed by `AuthProvider` (`src/contexts/AuthContext.tsx`), readable via `useAuth()` (`src/contexts/useAuth.ts`).
- A single response interceptor redirects to `ROUTES.LOGIN` on 401 and reports all errors to Sentry. `setUnauthorizedHandler` wires the interceptor to `clearAuth`.
- A dev-only credential login (`ROUTES.DEV_LOGIN`, `DevLoginPage`) is registered only when `IS_DEV`.

### Permissions — CASL
- `AbilityProvider` (`src/components/common/ability-provider/`) builds a CASL `PureAbility` from rules fetched via `usePermissionsQuery` (only when authenticated); resets to an empty ability on logout/failure.
- `ProtectedRoute` gates routes by `module`/`action` (e.g. `<ProtectedRoute module={APP_SUBJECT.PROFILE} action={APP_ACTION.READ} />`). `APP_ACTION`/`APP_SUBJECT` live in `src/constants/common.ts`.

### Routing
`src/routes/index.tsx` uses `createBrowserRouter` with lazy-loaded pages wrapped in `Suspense` + `ErrorBoundary`. Nested `ProtectedRoute` elements enforce auth then per-route permissions. Routes carry breadcrumb metadata via `handle`.

### Data layer flow
A component calls a hook in `hooks/[module]/{queries,mutations}.ts`, which calls a function on the `[module]Api` object in `services/[module]/`, which is the only layer that touches the Axios instance. Query keys are centralized in `src/constants/queryKeys.ts` (key-factory functions like `WEEKLY_UPDATE_QUERY_KEYS.LIST(paramsKey)`). Never inline query-key arrays in hooks.

### Feature flags
`FeatureFlagProvider` (`src/lib/feature-flags/`) fetches flags; gate UI with the `<FeatureFlag>` component or `useFeatureFlag(FLAG_KEYS.X)`. Flag keys are in `src/constants/featureFlags.ts`.

## Conventions (enforced — see constitution & ESLint)

These are hard rules; violating them fails lint or breaks the codebase's single-source-of-truth pattern:

- **No hardcoded strings** — all UI text goes in `src/constants/labels.ts` (aggregated from per-module `*/labels.ts`). Reference as `LABELS.MODULE.KEY`. Tests must also use `LABELS`, never raw strings.
- **No hardcoded endpoints/routes** — use `ENDPOINTS.*` (`src/constants/endpoints.ts`) and `ROUTES.*` (`src/constants/routes.ts`).
- **All HTTP in `src/services/`** — never call Axios from components or hooks directly.
- **No `any`** (ESLint error). Use `import type` for type-only imports (`verbatimModuleSyntax` is on).
- **Interfaces/types/enums must be PascalCase, no `I` prefix** (ESLint `naming-convention`).
- **`max-lines: 300`** per file (ESLint error; relaxed nowhere meaningful). Split large components into sub-components/hooks.
- **No `console`** (ESLint error) — report via `src/lib/sentry.ts` instead. **No `eslint-disable`** — refactor.
- Data-fetching components must handle **loading / error / empty** states.
- Path alias `@/` → `src/`. Prettier: **4-space indent**, single quotes, semicolons, 140 width, import order auto-sorted by `@ianvs/prettier-plugin-sort-imports` (built-ins → react → third-party → `@/` → relative).

`src/components/ui/**` is shadcn/ui generated — excluded from lint/coverage; do not hand-edit.

## Testing

- Tests are colocated (`Component.tsx` + `Component.test.tsx`), Jest + ts-jest + React Testing Library.
- Use `renderWithProviders(ui, { preloadedState, initialEntries })` from `src/test/utils.tsx` — it wraps QueryClient + Router (NOT Redux).
- Global setup in `src/test/setup.ts` (jest-dom, localStorage mock, browser polyfills).
- `jest.config.ts` maps several modules to manual mocks (`@/services/api`, `@/lib/sentry`, `@/lib/env`, `@/services/auth/authApi`) and handles SVG/CSS — keep the ordering of `moduleNameMapper` entries (specific before the generic `@/*` alias).

> **Stale docs:** the README and `.specify/memory/constitution.md` state `max-lines: 150` and mention Redux/Bearer-token auth — these are **outdated**. Trust the code and ESLint config (300 lines, Context-based state, cookie auth) over those statements.

## Commits

Husky hooks run on commit: lint-staged (ESLint --fix + Prettier on staged `*.{ts,tsx}`) and commitlint. Messages **must** match:

```
SI<sprint>-T<ticket> type: description       # e.g. SI4-T455 feat: weekly listing
```
Valid types: `feat fix docs style refactor test chore perf revert ci`. Non-matching messages are rejected.
