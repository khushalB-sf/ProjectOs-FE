---
name: coding-standards
description: Load when writing or modifying source code in this repo and you need the full convention detail behind CLAUDE.md's summary — TypeScript rules, the 4-layer architecture, services/React Query, RHF+Zod forms, state/context, routing/i18n, styling, accessibility, testing, and security. Read the matching detail file before implementing in that area. Do NOT load for trivial edits already covered by CLAUDE.md, or for non-code tasks (docs, config, git, planning).
---

## Overview

CLAUDE.md carries the always-on summary of the project's conventions. This skill holds the **full detail** for each domain. Read the relevant file(s) below before writing code in that area.

| Area | File |
|---|---|
| Component architecture & layering, file placement | [components.md](components.md) |
| API, services & React Query (queries, mutations, infinite) | [api.md](api.md) |
| State management & context (auth, permissions, feature flags, URL state) | [state.md](state.md) |
| React patterns, routing, code-splitting & i18n | [react.md](react.md) |
| General conventions, forms, testing & security | [general.md](general.md) |

## How to use

1. Identify the domain of the change (UI component, API layer, form, state, routing).
2. Open the matching file above and follow its rules — they govern over the CLAUDE.md summary.
3. For multi-domain work (e.g. a new feature page), read `components.md` + `api.md` + `state.md`.
