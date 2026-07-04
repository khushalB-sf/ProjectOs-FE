---
name: test-generation
description: Use when authoring Jest + React Testing Library tests for this repo's components, hooks, or utilities — e.g. "add tests for X", "write a test file for <component>", "increase coverage on <module>". Generates colocated *.test.tsx/*.test.ts using renderWithProviders and module-level service mocks, covering success/error/loading/empty paths. Do NOT use for non-test source code, end-to-end/Playwright tests, or debugging existing tests unrelated to writing new specs.
---

## Overview

Generate production-ready test suites that follow the ProjectOS testing strategy:

- **Components** → React Testing Library (user behavior, accessibility)
- **Hooks** → `renderHook` wrapper with context providers
- **Utilities** → Unit tests with edge cases
- **Mocking** → Manual mocks per jest.config patterns
- **Coverage** → 70% threshold (branches, lines, functions, statements)

All tests colocate with source as `*.test.ts(x)` or `*.spec.ts(x)`.

---

## 🗂️ Test Structure Rules

### **Components** (`src/components/**/*.test.tsx`)

**Setup:**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils"; // ← use for app context
import { LABELS } from "@/constants/labels"; // ← strings from constants
```

**File Structure:**

```tsx
describe('ComponentName', () => {
  // Use describe blocks to group related tests

  // UI & rendering tests
  it('renders with correct content', () => { ... });
  it('renders accessible attributes (aria-label, role)', () => { ... });

  // User interaction tests
  it('calls onClick when clicked', async () => { ... });

  // State & conditional rendering
  it('shows loading state', () => { ... });
  it('shows error state', () => { ... });
  it('shows empty state', () => { ... });

  // Props validation
  it('applies custom className', () => { ... });
  it('respects disabled prop', () => { ... });
});
```

**When to use `renderWithProviders`:**

- Component needs routing (MemoryRouter)
- Component needs auth context (AuthProvider)
- Component needs React Query (QueryClientProvider)
- Component needs tooltips or other global providers
- **Default choice for page/feature components**

**When to use plain `render`:**

- Pure UI components (Button, Card, Input primitives)
- Components with no dependencies on context/providers
- **shadcn/ui primitives (they're vendor code)**

### **Hooks** (`src/hooks/**/*.test.ts(x)`)

**Setup:**

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { useMyHook } from "./useMyHook";
```

**For hooks with providers:**

```tsx
const wrapper = ({ children }: { children: ReactNode }) => (
  <FeatureFlagProvider>{children}</FeatureFlagProvider>
);

const { result } = renderHook(() => useMyHook(), { wrapper });
```

**File Structure:**

```tsx
describe('useHookName', () => {
  // Initial state/value tests
  it('returns initial value', () => { ... });

  // State update tests
  it('updates state when condition changes', async () => { ... });

  // API/Query tests (if applicable)
  it('fetches data on mount', async () => { ... });
  it('handles API error', async () => { ... });

  // Context dependency tests
  it('throws when used outside Provider', () => { ... });

  // Cleanup tests
  it('cleans up on unmount', () => { ... });
});
```

### **Utilities** (`src/lib/**/*.test.ts`)

**Setup:**

```tsx
import { myUtilFunction } from "./myUtil";
```

**File Structure:**

```tsx
describe('utilFunctionName', () => {
  // Happy path
  it('returns correct output for valid input', () => {
    expect(myUtilFunction('input')).toBe('expected');
  });

  // Edge cases & boundaries
  it('handles empty string', () => { ... });
  it('handles null', () => { ... });
  it('handles very large numbers', () => { ... });

  // Error cases
  it('throws on invalid input', () => {
    expect(() => myUtilFunction(null)).toThrow();
  });
});
```

---

## 🎯 What to Test

### ✅ DO TEST

**Components:**

- Rendered output (text, elements, structure)
- ARIA attributes (role, aria-label, aria-pressed, aria-live)
- User interactions (click, type, keyboard, focus)
- Conditional rendering (loading, error, empty states)
- Props affect rendering (className, disabled, children)
- Callbacks are triggered correctly
- Form validation & submission

**Hooks:**

- Initial return value
- State updates (via `waitFor`)
- API calls and responses
- Error handling
- Context dependencies
- Cleanup (ResizeObserver, event listeners, timers)

**Utilities:**

- Happy path (valid inputs → correct output)
- Edge cases (empty, null, undefined, boundary values)
- Error conditions (invalid input → throws or error return)
- Type constraints

### ❌ DO NOT TEST

- Implementation details (internal hook state, useEffect logic)
- Styling/CSS classes (test via `toHaveClass` only if business-critical)
- Third-party libraries (assume they're tested upstream)
- Constants or type definitions
- Routes or layout configuration

---

## 📋 Test Data & Mocking

### **Use realistic, minimal test data:**

```tsx
// ✅ Good
const mockUser = { id: "1", name: "John", email: "john@example.com" };
const mockGoal = { id: "G1", title: "Q1 Goal", status: "in-progress" };

// ❌ Bad
const mockData = { a: 1, b: 2, c: 3 };
```

### **Mock API calls:**

```tsx
// Services export a named object (e.g. goalsApi), not standalone functions.
// Use jest.Mocked<typeof goalsApi> for full type safety.

import { goalsApi } from "@/services/goals/goalsApi";

jest.mock("@/services/goals/goalsApi");

const mockGoalsApi = goalsApi as jest.Mocked<typeof goalsApi>;

it("fetches goals on mount", async () => {
  mockGoalsApi.getGoals.mockResolvedValueOnce([{ id: "1", title: "Goal 1" }]);

  const { result } = renderHook(() => useFetchGoals());

  await waitFor(() => {
    expect(result.current.data).toEqual([{ id: "1", title: "Goal 1" }]);
  });
});
```

### **Mock context providers:**

```tsx
// For testing hooks that use context
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn().mockReturnValue({
    user: { id: "1", name: "Test User" },
    isAuthenticated: true,
  }),
}));
```

---

## 🧪 Common Test Patterns

### **Pattern 1: User Interaction**

```tsx
it("submits form on Enter key", async () => {
  const handleSubmit = jest.fn();
  render(<SearchInput onSubmit={handleSubmit} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "search term");
  await userEvent.keyboard("{Enter}");

  expect(handleSubmit).toHaveBeenCalledWith("search term");
});
```

### **Pattern 2: Loading State**

```tsx
it("shows loading state while fetching", async () => {
  renderWithProviders(<GoalTable />);

  // Loading state is shown
  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  // Wait for data to load
  await waitFor(() => {
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  // Data is rendered
  expect(screen.getByText("Goal 1")).toBeInTheDocument();
});
```

### **Pattern 3: Error State**

```tsx
it("displays error message on API failure", async () => {
  const error = new Error("Failed to fetch");
  (goalsApi.getGoals as jest.Mock).mockRejectedValueOnce(error);

  renderWithProviders(<GoalTable />);

  await waitFor(() => {
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });
});
```

### **Pattern 4: Hook with Context**

```tsx
it("throws when used outside Provider", () => {
  expect(() => renderHook(() => useFeatureFlag("flag"))).toThrow(
    LABELS.FEATURE_FLAGS.USE_PROVIDER_ERROR,
  );
});

it("returns flag value from context", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FeatureFlagContext.Provider
      value={{ flags: { "test.flag": true }, isLoading: false }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );

  const { result } = renderHook(() => useFeatureFlag("test.flag"), { wrapper });

  expect(result.current).toBe(true);
});
```

### **Pattern 5: Async Hook Update**

```tsx
it("updates data when dependency changes", async () => {
  const { result, rerender } = renderHook(
    ({ id }: { id: string }) => useFetchGoal(id),
    { initialProps: { id: "1" } },
  );

  // Initial fetch
  await waitFor(() => {
    expect(result.current.data?.id).toBe("1");
  });

  // Re-render with new dependency
  rerender({ id: "2" });

  // Should fetch new data
  await waitFor(() => {
    expect(result.current.data?.id).toBe("2");
  });
});
```

---

## 🔍 Accessibility Testing

**Always use accessible queries:**

```tsx
// ✅ DO use accessible queries
screen.getByRole("button", { name: /click me/i });
screen.getByLabelText("Email");
screen.getByText("Form title");

// ❌ AVOID implementation-detail queries
screen.getByTestId("submit-btn");
screen.getByClassName("form-input");
screen.getByRole("div"); // DIV has no semantic role
```

**Test ARIA attributes:**

```tsx
it("has correct aria-label and aria-pressed", () => {
  render(<AnnouncementIcon onClick={jest.fn()} isOpen={false} />);

  const button = screen.getByRole("button", {
    name: LABELS.ANNOUNCEMENT_MODAL.HEADER_ICON_ARIA_LABEL,
  });

  expect(button).toHaveAttribute("aria-pressed", "false");
});
```

---

## ⚠️ Anti-Patterns & Common Mistakes

❌ **DO NOT:**

- Test state/hooks directly — test user-visible behavior
- Use `getByTestId` (breaks if UI changes; not accessible)
- Import component internals for testing
- Skip error state tests
- Use `act()` manually (React Testing Library handles it)
- Make flaky async tests — use `waitFor` with proper conditions
- Test implementation details (e.g., `expect(component.state).toBe(...)`)

❌ **Avoid over-mocking:**

- Mock only external APIs, not React components
- Use real `renderWithProviders` instead of mocking every provider
- Keep mocks minimal — test real behavior when possible

---

## 📊 Coverage Requirements

**Current project thresholds (`jest.config.ts`):**

```
branches: 70%
lines: 70%
functions: 70%
statements: 70%
```

**Check coverage:**

```bash
yarn test:coverage
```

**Excluded from coverage** (see `jest.config.ts` for the complete, authoritative exclusion list):

- `src/test/**` — test utilities
- `src/components/ui/**` — shadcn/ui (vendor code)
- `src/i18n/**` — internationalization configuration
- `src/routes/**` — route definitions
- `src/layouts/**` — layout components
- `src/lib/sentry.ts`, `src/lib/utils.ts` — vendor setup
- `src/services/api.ts` — API client wrapper
- `src/store/index.ts` — store configuration
- `src/constants/**` — constants
- `src/types/**` — TypeScript type definitions
- `src/**/*.d.ts` — type declarations
- `src/main.tsx` — application entry
- `src/App.tsx` — root component

---

## 🚀 Test Generation Workflow

### **For a Component:**

1. **Identify component type:**
   - Pure UI (Button) → use `render`
   - Feature/Page (GoalTable) → use `renderWithProviders`

2. **List test scenarios:**
   - Renders with props
   - Renders loading/error/empty states
   - User interactions (click, type, submit)
   - ARIA attributes

3. **Write tests:**
   - One test per behavior
   - Use accessible queries
   - Assert on user-visible output

4. **Check accessibility:**
   - All buttons/inputs have labels
   - Form has proper ARIA
   - States are announced

5. **Run & verify:**
   ```bash
   yarn test ComponentName.test.tsx
   yarn test:coverage ComponentName.test.tsx
   ```

### **For a Hook:**

1. **Determine dependencies:**
   - Needs context? Create wrapper
   - Needs API mocking? Mock service
   - Standalone? No wrapper needed

2. **List test scenarios:**
   - Initial return value
   - State/value updates
   - API success/error
   - Context dependency

3. **Write tests:**
   - Use `renderHook`
   - Use `waitFor` for async updates
   - Test error cases

4. **Run & verify:**
   ```bash
   yarn test useHookName.test.tsx
   ```

### **For a Utility:**

1. **Identify input/output:**
   - What does it take?
   - What should it return?

2. **List test cases:**
   - Happy path
   - Edge cases (empty, null, boundary)
   - Error cases

3. **Write tests:**
   - Test pure function behavior
   - No mocks needed

4. **Run & verify:**
   ```bash
   yarn test utilName.test.ts
   ```

---

## 🔗 References

- **Jest Config:** `jest.config.ts` — setup, mocks, coverage rules
- **Test Utils:** `src/test/utils.tsx` — `renderWithProviders`, `renderWithDataRouterProviders`
- **Test Setup:** `src/test/setup.ts` — global mocks (localStorage, ResizeObserver, etc.)
- **Testing Instructions:** `.github/instructions/coding/general/testing.instructions.md`
- **Existing Tests:** `src/**/*.test.tsx` — patterns & examples
