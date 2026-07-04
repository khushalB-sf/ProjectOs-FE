# PR Review — React Query, Services & Forms

## 1. React Query Patterns

### Queries

- `useQuery` for single/list fetches; `useInfiniteQuery` for paginated lists.
- `queryFn` must call a service function — never `fetch()` / `axios` directly.
- `enabled` must guard queries on optional params: `enabled: !!publicId`.
- `staleTime` should use `STALE_TIME` constants from `src/constants/common.ts`.

### Infinite Queries

- `initialPageParam: 1`.
- `getNextPageParam` must return `undefined` (not `null`, not `false`) at the last page.

### Mutations

- `useMutation<ReturnType, Error, InputType>` with explicit generics.
- `onSuccess`: `void queryClient.invalidateQueries(...)` + `toast.success(LABELS.MODULE.ACTION_SUCCESS)`.
- `onError`: `toast.error(getErrorMessage(error, LABELS.MODULE.ACTION_ERROR))` + `applyServerErrors(error, form.setError)` for forms.
- `getErrorMessage` imported from `@/lib/utils` — never redefined locally.

**Flag if:**
- `invalidateQueries` called without `void` prefix (floating promise).
- A mutation does not invalidate any query on success.
- Toast messages are hardcoded strings instead of `LABELS.*`.
- `getErrorMessage` is duplicated locally.
- `getNextPageParam` returns `null` or `false` instead of `undefined`.

---

## 2. Service Layer

- Import the shared Axios instance from `@/services/api`.
- Unwrap responses: `response.data.data`. Response type parameterised: `api.get<ApiResponse<T>>(...)`.
- Methods must have explicit return types.
- No business logic — just HTTP calls and response unwrapping.
- File naming: `src/services/<module>/<module>Api.ts`.

**Flag if:**
- A new Axios instance is created per module.
- `fetch()` or `XMLHttpRequest` is used.
- A service function transforms/filters/conditionally processes data beyond unwrapping.
- Return types are implicit.

---

## 3. Zod Schemas & Validation

- Schemas in `src/schemas/<module>/index.ts`.
- All validation messages: `LABELS.*.VALIDATION.*`.
- Inferred form types exported: `export type CreateXFormData = z.infer<typeof createXSchema>`.
- Update schemas derive from create schemas via `.partial()` where possible.
- String fields must have `.max()` constraints.
- Cross-field validation: `.superRefine()`.
- Date strings (`YYYY-MM-DD`): append `T00:00:00` to parse as local time, not UTC.
- Shared date refinement logic extracted as a named function if used in multiple schemas.

**Flag if:**
- A schema uses inline string messages instead of `LABELS.*`.
- An inferred type is missing for a schema.
- String fields lack a `.max()` constraint.
- A date field parsed with `new Date('YYYY-MM-DD')` without `T00:00:00` (timezone bug).

---

## 4. Form Handling

- All forms use `react-hook-form` + `@hookform/resolvers/zod`.
- Field rendering: shadcn/ui `Form*` components (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`).
- Default values in a named `DEFAULTS` constant, not inline objects.
- External submit buttons wired via `form="form-id"` + `id` on the `<form>`.
- Server field errors via `applyServerErrors()` from `@/lib/form-utils.ts`.

**Flag if:**
- Uncontrolled inputs or `useState` manage form field values.
- `FormMessage` is missing for a field.
- Default values are inline object literals inside the component.
- `FormLabel` is missing for a visible field (accessibility violation).
