# PR Review — Architecture, Constants & TypeScript

## 1. Architecture & Layering

### 4-layer rule: `constants → services → hooks → components/pages`

- Components must not import from `src/services/` directly — all data access goes through hooks.
- Services must not contain business logic — thin request/response layer only.
- Hooks encapsulate React Query logic and expose domain data to components.
- Pages orchestrate layout and hook wiring; presentational components only receive data via props.

**Flag if:**
- A component imports from `@/services/` directly.
- A service function contains conditional logic, state, or UI concerns.
- A page component grows beyond layout orchestration into data transformation.

### File placement

| Artifact | Location |
|---|---|
| Route-level pages | `src/pages/<module>/` |
| Feature UI | `src/components/<module>/` |
| Shared/common components | `src/components/common/` |
| shadcn/ui primitives | `src/components/ui/` (vendor — do not modify) |
| Query hooks | `src/hooks/<module>/queries.ts` |
| Mutation hooks | `src/hooks/<module>/mutations.ts` |
| Services | `src/services/<module>/<module>Api.ts` |
| Types / DTOs | `src/types/<module>/index.ts` |
| Zod schemas | `src/schemas/<module>/index.ts` |
| Constants | `src/constants/` |
| Utilities | `src/lib/` |
| Contexts | `src/contexts/` |

**Flag if:**
- New files placed outside the established structure.
- Feature-specific code added to `src/components/common/` or `src/components/ui/`.
- Types/DTOs defined inline in a component, hook, or service.

---

## 2. Constants — No Hardcoding

- **Endpoints**: all API paths from `ENDPOINTS` in `src/constants/endpoints.ts`. Never hardcode URL strings.
- **Query keys**: module factory objects from `src/constants/queryKeys.ts`. Must be arrays — never bare strings at call site.
- **Labels**: all user-visible strings (UI text, toast messages, ARIA labels, validation messages) from `LABELS` in `src/constants/labels.ts`.
- **Routes**: navigation paths from `ROUTES` in `src/constants/routes.ts`. Never hardcode `'/dashboard'` etc.

**Flag if:**
- A service function uses a string literal URL instead of `ENDPOINTS.*`.
- A hook creates an ad-hoc query key string/array.
- A component renders a hardcoded user-facing string.
- A Zod schema uses an inline validation message instead of `LABELS.*.VALIDATION.*`.
- A `navigate()` or `<Link>` uses a hardcoded path.

---

## 3. TypeScript Strictness

- `strict: true` — all strict checks enabled.
- `verbatimModuleSyntax: true` — type-only imports must use `import type`.
- Path alias: always `@/` over `../../` relative imports.
- `noUnusedLocals` / `noUnusedParameters` — prefix intentionally unused params with `_`.

### Naming conventions (ESLint-enforced)

- Interfaces & types: PascalCase (`EmployeeDetail`, `CreateGoalDto`).
- No `enum` keyword — use `as const` objects with derived union types.
- DTOs: `Create*Dto`, `Update*Dto`.
- `interface` for object shapes; `type` for unions/aliases.

### Import order (auto-enforced by Prettier plugin)

`react` → third-party → `@/constants` → `@/contexts` → `@/hooks` → `@/services` → `@/types` → `@/lib` → `@/components` → relative.

**Flag if:**
- `any` is used in production code.
- `@ts-ignore` / `@ts-expect-error` added without an explanatory comment.
- `import { Foo }` used for a type never used at runtime (should be `import type`).
- Raw `enum` keyword used instead of `as const`.
- Inline type definitions appear in a component or hook instead of `src/types/<module>/`.
