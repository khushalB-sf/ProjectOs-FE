---
name: projectos-code-review
description: Load when reviewing a diff or pull request for this repo, or right before opening one — applies the full review criteria: architecture & TypeScript, React Query/services/forms, components/styling/accessibility, and state/security/testing/ESLint. Used by the task-review and pr-review-fixer agents. Do NOT load for writing new features (use coding-standards instead) or for non-code review.
---

## Overview

The review criteria for this codebase, grouped by domain. Apply them in the priority order below (correctness → security → architecture → type safety → a11y → performance → conventions → readability) and report findings with severity (🔴 must fix / 🟡 should fix / 🟢 nit).

| Area                                                        | File                               |
| ----------------------------------------------------------- | ---------------------------------- |
| Architecture & TypeScript (layering, types, generics)       | [code-quality.md](code-quality.md) |
| React Query, services & forms (keys, invalidation, RHF/Zod) | [data-layer.md](data-layer.md)     |
| Components, styling & accessibility                         | [ui-a11y.md](ui-a11y.md)           |
| State, security, testing & ESLint                           | [ops-testing.md](ops-testing.md)   |

## How to use

1. Get the changed files (`git diff --name-only main...HEAD`), skipping `src/components/ui/` (vendor).
2. Review each file against the relevant criteria files above.
3. Cross-check with the **PR Review Checklist** in CLAUDE.md, then run the automated checks (`yarn build`, `yarn lint`, `yarn prettier`, `yarn test`).
