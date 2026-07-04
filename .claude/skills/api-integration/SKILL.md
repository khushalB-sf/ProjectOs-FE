---
name: api-integration
description: Use when adding or changing a REST API integration in this repo — creating a service in src/services/<module>/, its React Query hooks (queries.ts/mutations.ts), request/response types, and ENDPOINTS/QUERY_KEYS constants. Triggers on requests like "integrate the X API", "add an endpoint for X", "wire up the <module> service/hooks", "fetch/mutate <resource>". Builds the Axios + React Query v5 layer with strict 4-layer separation and standardized error handling. Do NOT use for pure UI/styling work, writing tests, or backend/API design.
---

> Rules and layer responsibilities are in `.claude/skills/coding-standards/api.md`. This skill provides full code templates and a submission checklist.

---

## 🗂️ File Placement

| Artifact | Location |
|---|---|
| Service functions | `src/services/[module]/[module]Api.ts` |
| Query hooks | `src/hooks/[module]/queries.ts` |
| Mutation hooks | `src/hooks/[module]/mutations.ts` |
| API endpoints | `src/constants/endpoints.ts` — add to `ENDPOINTS`, never a new file |
| Query keys | `src/constants/queryKeys.ts` — new `MODULE_QUERY_KEYS` export, never inline |
| API types | `src/types/[module]/index.ts` |
| Form schemas | `src/schemas/[module]/index.ts` — Zod only, form validation only |

---

## 🔗 Endpoints Template

```ts
EMPLOYEES: {
    LIST: '/employees',
    DETAIL: (publicId: string) => `/employees/${publicId}`,
}
```

---

## 🗃️ Service Template (full CRUD)

```ts
// src/services/[module]/[module]Api.ts
import api from '@/services/api';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { MyItem, MyItemFilters, CreateMyItemDto } from '@/types/[module]';

export const myModuleApi = {
    getItems: async (filters?: MyItemFilters): Promise<PaginatedResponse<MyItem>> => {
        const response = await api.get<ApiResponse<PaginatedResponse<MyItem>>>(
            ENDPOINTS.MY_MODULE.LIST,
            { params: filters },
        );
        return response.data.data;
    },

    getItemById: async (publicId: string): Promise<MyItem> => {
        const response = await api.get<ApiResponse<MyItem>>(
            ENDPOINTS.MY_MODULE.DETAIL(publicId),
        );
        return response.data.data;
    },

    createItem: async (data: CreateMyItemDto): Promise<MyItem> => {
        const response = await api.post<ApiResponse<MyItem>>(ENDPOINTS.MY_MODULE.LIST, data);
        return response.data.data;
    },

    updateItem: async (publicId: string, data: Partial<CreateMyItemDto>): Promise<MyItem> => {
        const response = await api.patch<ApiResponse<MyItem>>(
            ENDPOINTS.MY_MODULE.DETAIL(publicId),
            data,
        );
        return response.data.data;
    },

    deleteItem: async (publicId: string): Promise<void> => {
        await api.delete(ENDPOINTS.MY_MODULE.DETAIL(publicId));
    },
};
```

---

## 🔑 Query Keys Template

```ts
export const MY_MODULE_QUERY_KEYS = {
    ITEMS: 'my-module-items',                                                    // simple string — collection (partial-match invalidation)
    ITEMS_WITH_DETAILS: ['my-module', 'items-with-details'] as const,            // tuple — namespaced sub-key
    ITEM_DETAIL: (publicId: string) => ['my-module', 'item', publicId] as const, // factory — entity-specific
    ITEMS_BY_DEPT: (deptId?: string) => ['my-module', 'items', deptId ?? 'all'] as const,
} as const;
```

---

## ⚡ Hook Templates

### `useQuery`
```ts
export const useItems = (filters?: MyItemFilters) =>
    useQuery({
        queryKey: [MY_MODULE_QUERY_KEYS.ITEMS, filters],
        queryFn: () => myModuleApi.getItems(filters),
    });
```

### Conditional query (wait for ID)
```ts
export const useItemDetail = (publicId?: string) =>
    useQuery({
        queryKey: MY_MODULE_QUERY_KEYS.ITEM_DETAIL(publicId ?? ''),
        queryFn: () => myModuleApi.getItemById(publicId!),
        enabled: Boolean(publicId),
    });
```

### `select` (transform at read time)
```ts
export const useItemsTransformed = (departmentId?: string) =>
    useQuery<RawItem[], Error, TransformedItem[]>({
        queryKey: MY_MODULE_QUERY_KEYS.ITEMS_BY_DEPT(departmentId),
        queryFn: () => myModuleApi.getItems(departmentId),
        select: transformItems,
    });
```

### `useInfiniteQuery`
```ts
export const useInfiniteItems = (filters?: MyItemFilters) =>
    useInfiniteQuery({
        queryKey: ['my-module-items', 'infinite', filters],
        queryFn: ({ pageParam }) => myModuleApi.getItems({ ...filters, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });
```

### Mutations (create / update / delete)
```ts
// src/hooks/[module]/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils'; // never redefine locally
import { myModuleApi } from '@/services/[module]/[module]Api';
import { MY_MODULE_QUERY_KEYS } from '@/constants/queryKeys';
import { LABELS } from '@/constants/labels';

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: myModuleApi.createItem,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [MY_MODULE_QUERY_KEYS.ITEMS] });
            toast.success(LABELS.MY_MODULE.CREATE_SUCCESS);
        },
        onError: (error) => { toast.error(getErrorMessage(error, LABELS.MY_MODULE.CREATE_ERROR)); },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ publicId, data }: { publicId: string; data: Partial<CreateMyItemDto> }) =>
            myModuleApi.updateItem(publicId, data),
        onSuccess: (_result, { publicId }) => {
            void queryClient.invalidateQueries({ queryKey: [MY_MODULE_QUERY_KEYS.ITEMS] });
            void queryClient.invalidateQueries({ queryKey: MY_MODULE_QUERY_KEYS.ITEM_DETAIL(publicId) });
            toast.success(LABELS.MY_MODULE.UPDATE_SUCCESS);
        },
        onError: (error) => { toast.error(getErrorMessage(error, LABELS.MY_MODULE.UPDATE_ERROR)); },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: myModuleApi.deleteItem,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [MY_MODULE_QUERY_KEYS.ITEMS] });
            toast.success(LABELS.MY_MODULE.DELETE_SUCCESS);
        },
        onError: (error) => { toast.error(getErrorMessage(error, LABELS.MY_MODULE.DELETE_ERROR)); },
    });
};
```

---

## 📦 Types Template

```ts
export interface MyItem {
    publicId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface MyItemFilters {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: SortOrder; // from src/types/common/index.ts
}

export interface CreateMyItemDto {
    name: string;
    description?: string;
}

export type UpdateMyItemDto = Partial<CreateMyItemDto>;
```

---

## 📋 Labels Template

```ts
MY_MODULE: {
    CREATE_SUCCESS: 'Item created successfully.',
    CREATE_ERROR:   'Failed to create item.',
    UPDATE_SUCCESS: 'Item updated successfully.',
    UPDATE_ERROR:   'Failed to update item.',
    DELETE_SUCCESS: 'Item deleted successfully.',
    DELETE_ERROR:   'Failed to delete item.',
},
```

---

## 🏗️ Caching Reference

| Setting | Value |
|---|---|
| Global `staleTime` | `300_000` ms (`STALE_TIME.FIVE_MINUTES`) |
| Global `gcTime` | `300_000` ms |
| Global `retry` | `1` |
| `refetchOnWindowFocus` | `true` |

Override `staleTime` per query only when freshness requirements differ significantly.

**Invalidation rules:**
- After create / delete → invalidate collection `[MY_MODULE_QUERY_KEYS.ITEMS]`
- After update → invalidate collection + entity `ITEM_DETAIL(publicId)`
- After logout → `queryClient.clear()`

---

## ✅ Checklist Before Submitting

- [ ] All URL strings in `ENDPOINTS` — none hardcoded in service files
- [ ] All query keys in `*_QUERY_KEYS` constants — none inline in hooks
- [ ] All UI strings and error messages in `LABELS`
- [ ] Service functions do not catch errors and do not import React
- [ ] Mutations use `getErrorMessage` from `@/lib/utils` — not redefined locally
- [ ] `void queryClient.invalidateQueries(...)` on all invalidation calls
- [ ] `enabled: Boolean(id)` guard on queries that depend on an ID
- [ ] TypeScript interfaces defined for all request/response shapes
- [ ] Zod schemas only in `src/schemas/[module]/` and only for forms
- [ ] `select` used for data transformation — raw shape cached, UI shape returned
- [ ] No `any` — use `ApiResponse<T>` / `PaginatedResponse<T>`
- [ ] `import type` for all type-only imports
