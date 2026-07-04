# React Patterns — Detailed Guide

Covers: code organization, routing, internationalization, documentation, type safety.

## 1. Code Organization

- Place code by responsibility: pages → components → hooks → services → schemas → types → constants.
- Module boundary: `services → hooks → components/pages` (strict layering — see architecture rules).
- Feature folders group all files for a domain. Follow existing folder patterns before introducing new structure.

### File Naming Conventions

| Artifact   | Convention              | Example                |
| ---------- | ----------------------- | ---------------------- |
| Components | PascalCase              | `EmployeeList.tsx`     |
| Hooks      | `use` prefix, camelCase | `useEmployeeList.ts`   |
| Services   | camelCase               | `employeeApi.ts`       |
| Schemas    | camelCase               | `employeeSchema.ts`    |
| Types      | PascalCase              | `Employee.ts`          |
| Constants  | camelCase               | `employeeConstants.ts` |

### Splitting Large Files

Split at ~200 lines or when a file becomes hard to navigate. Move hooks, types, or helpers to separate files. Each file should focus on a single concern.

### Index Files

`index.ts` only for re-exporting the public API of a folder/module. Do not put implementation logic in `index.ts` files.

## 2. Routing & Navigation

- Route changes must preserve existing access-control behavior (authentication, role-based permissions, feature flags).
- When modifying or adding routes:
  1. Review all auth and permission checks for affected routes.
  2. Ensure no route is exposed to unauthorized users.
  3. Add/update tests: authenticated vs. unauthenticated, different roles, edge cases (expired sessions).
  4. Include an access-control review note in your PR description.
- Navigation paths from `ROUTES` in `src/constants/routes.ts` — never hardcode paths in `navigate()` or `<Link>`.

## 3. Internationalization

- All user-visible strings in `src/constants/labels.ts` (or per-module label files). Group by domain; maintain consistent key naming.
- Never hardcode UI text in components. When adding new UI copy, update the label source first.
- Validation and toast messages must also come from centralized labels.
- Number/date formatting helpers centralized in `src/lib/` — no inline `toLocaleString` or manual date string building.

## 4. Documentation & Comments

- Comments only where logic is non-obvious: a hidden constraint, a subtle invariant, a workaround for a specific bug.
- Document shared utilities, hooks, and public component prop contracts.
- Keep comments aligned with current behavior — remove stale notes during refactors.
- Prefer clear naming over explanatory comments.
- Never write comments that restate what the code already says.

## 5. Type Safety

- `strict: true` enforced — all strict checks enabled.
- `verbatimModuleSyntax: true` — type-only imports must use `import type`.
- Never use `any`. Use `unknown` + narrowing instead.
- `@ts-ignore` or `@ts-expect-error`: only with a clear comment explaining why, and must be reviewed in PR.
- Path alias: always use `@/` over deep relative imports.
- No `enum` keyword — use `as const` with derived union types.
- `noUnusedLocals` / `noUnusedParameters` enabled — prefix unused params with `_`.
- Inline type definitions in components/hooks are a flag — types belong in `src/types/<module>/`.

### Recommended Import Order (auto-enforced by Prettier plugin)

```
react → third-party → @/constants → @/contexts → @/hooks → @/services → @/types → @/lib → @/components → relative
```
