# API Integration — Detailed Guide

Related:
- Form field errors + Zod validation: `general.md` (validation section)
- State management: `state.md`

## 1. Service Layer (Axios)

- Use the shared Axios instance from `@/services/api` for all HTTP requests. The base URL is `VITE_API_BASE_URL`; 401s are handled globally (redirect to login, Sentry capture).
- **Never** create a new Axios instance in a module.

  ```ts
  import api from '@/services/api';
  api.get<ApiResponse<Employee[]>>(ENDPOINTS.EMPLOYEES.LIST);
  ```

- Module APIs live under `src/services/<module>/<module>Api.ts`. Keep them thin — request/response + `response.data.data` unwrap only.

  ```ts
  // src/services/employee/employeeApi.ts
  import api from '@/services/api';
  import { ENDPOINTS } from '@/constants/endpoints';
  export function fetchEmployees(): Promise<Employee[]> {
    return api.get<ApiResponse<Employee[]>>(ENDPOINTS.EMPLOYEES.LIST)
      .then(r => r.data.data);
  }
  ```

- All endpoint paths from `src/constants/endpoints.ts` — never hardcode URL strings.
- DTOs/types in `src/types/<module>/index.ts`.
- Methods must have explicit return types.
- No `fetch()` or `XMLHttpRequest`.

## 2. Hooks Layer (React Query)

- All API usage exposed through hooks in `src/hooks/<module>/{queries.ts,mutations.ts}`.

  ```ts
  // src/hooks/employee/queries.ts
  import { useQuery } from '@tanstack/react-query';
  import { fetchEmployees } from '@/services/employee/employeeApi';
  import { EMPLOYEE_QUERY_KEYS } from '@/constants/queryKeys';

  export function useEmployees() {
    return useQuery({
      queryKey: EMPLOYEE_QUERY_KEYS.EMPLOYEES,
      queryFn: fetchEmployees,
    });
  }
  ```

- Query keys from `src/constants/queryKeys.ts` — always arrays, never bare strings.
- Guard queries on optional params: `enabled: !!publicId`.
- Use `STALE_TIME` constants from `src/constants/common.ts` when applicable.

## 3. Mutations

- Explicit generics: `useMutation<ReturnType, Error, InputType>`.
- `onSuccess`: invalidate queries + success toast.
- `onError`: error toast + apply server field errors for forms.

  ```ts
  // src/hooks/employee/mutations.ts
  export function useCreateEmployee() {
    const queryClient = useQueryClient();
    return useMutation<Employee, Error, CreateEmployeeDto>({
      mutationFn: createEmployee,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.EMPLOYEES });
        toast.success(LABELS.EMPLOYEE.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, LABELS.EMPLOYEE.CREATE_ERROR));
      },
    });
  }
  ```

- `void` prefix on all fire-and-forget promises (e.g., `void queryClient.invalidateQueries(...)`).
- Import `getErrorMessage` from `@/lib/utils` — never redefine locally.

## 4. Infinite Queries

- `initialPageParam: 1`.
- `getNextPageParam` must return `undefined` (not `null`, not `false`) when the last page is reached.

## 5. Error Handling

- User-facing errors: Sonner toasts preserving server message when safe.
- Form field errors: `applyServerErrors(error, form.setError)` from `@/lib/form-utils.ts`.

## 6. Anti-Patterns

- Never call APIs directly from components.
- Never hardcode endpoint paths or query keys.
- Never put business logic in the service layer.
- Never mutate React Query cache directly.
- Never create a new Axios instance per module.
- Never use `fetch()` or `XMLHttpRequest`.
