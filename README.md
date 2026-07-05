# ProjectOS — AI-Powered Project Lifecycle Operating System

ProjectOS turns the messy, manual work of running a software project into one guided,
AI-assisted workflow. It takes a project from a raw client **RFP / requirements document**
all the way to a **planned, staffed, risk-monitored delivery** — extracting requirements,
drafting proposals, generating sprints, summarising meetings, predicting risk and
recommending a team, with an AI assistant available on every screen.

> **The idea:** most teams stitch this together across Word docs, spreadsheets, Jira, and
> meeting notes. ProjectOS makes it a single, connected operating system where each stage
> feeds the next.

---

## 🔗 Live demo

**https://project-os-fe.vercel.app/login**

|              |                     |
| ------------ | ------------------- |
| **Email**    | `admin@simform.com` |
| **Password** | `demo1234`          |

> Sign in, then use the **project switcher** in the sidebar to explore different demo
> projects. Every module is populated with real data from the live backend.

---

## 🎬 The end-to-end flow (what to look at, in order)

ProjectOS mirrors the real lifecycle of a delivery project. Each module builds on the output of the one before it:

| #   | Module                       | What it does                                                                                                                                                                       | AI does the heavy lifting                                                       |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | **Projects**                 | Create and manage projects; connect an external ERP as the source of truth.                                                                                                        | —                                                                               |
| 2   | **Requirement Intelligence** | Drop in an RFP / requirements doc (PDF, DOCX, TXT). It reads the document, asks smart **clarification questions**, then produces structured **requirements** and **user stories**. | ✅ Document understanding, clarifying questions, requirement & story extraction |
| 3   | **Proposal & Estimation**    | Generates a full client-ready **proposal** from the approved requirements — editable inline, with AI-assisted edits.                                                               | ✅ Proposal drafting & AI edit                                                  |
| 4   | **AI Project Planner**       | Decomposes approved user stories into **sprints and tasks**, laid out on a **Kanban board** with a sprint summary.                                                                 | ✅ Sprint & task generation                                                     |
| 5   | **Dashboard**                | Live project health: stat cards, **burndown** and **velocity** charts, project overview.                                                                                           | —                                                                               |
| 6   | **Meeting Intelligence**     | Paste a meeting transcript and get **action items, decisions, and minutes (MOM)** back automatically.                                                                              | ✅ Transcript summarisation                                                     |
| 7   | **Risk Prediction**          | Scores project risk on a gauge, breaks down contributing **risk factors**, tracks a **history trend**, and suggests **recommended actions**.                                       | ✅ Risk scoring & narrative analysis                                            |
| 8   | **Resource Allocation**      | Recommends an ideal **team composition** for the backlog and shows a **utilisation heatmap** across weeks.                                                                         | ✅ Team suggestion                                                              |
| ⭐  | **AI Assistant**             | A floating chat, scoped to the current project, that answers questions in **real time** (streamed) and remembers your conversation.                                                | ✅ Project-aware chat                                                           |

Suggested demo path for a jury: **Requirements → Proposal → Planner → Dashboard → Risk → Resources**, then open the **AI Assistant** and ask it about the project.

---

## 🧠 Where the AI shows up

- **Reads documents** and asks clarifying questions before extracting requirements.
- **Writes** proposals and lets you refine them with natural-language edits.
- **Plans** the work — sprints and tasks — from those requirements.
- **Summarises** meetings into action items, decisions and minutes.
- **Predicts** risk with an explainable breakdown and recommended mitigations.
- **Staffs** the project by suggesting a team from the backlog.
- **Answers** anything about the project via a streaming, context-aware chat assistant.

Long-running AI jobs (document processing, sprint generation, risk compute) run as
**async tasks** — the UI kicks off the job and polls for completion, so the app stays
responsive while the model works.

---

## 🛠 Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** build tooling
- **Tailwind CSS v4** (CSS-first design tokens) + **shadcn/ui** (Radix primitives)
- **React Router v7** for routing
- **React Query v5** for all server state (fetching, caching, polling)
- **React Context** for app-level state (auth + active project)
- **React Hook Form** + **Zod** for forms and validation
- **Recharts** for dashboards, **Mermaid** + **react-markdown** for rich content
- **Axios** API client with token-refresh handling
- **Sentry** for error monitoring
- Deployed on **Vercel**

---

## 🏗 Architecture at a glance

A clean, one-directional data flow keeps the codebase predictable:

```
Component  →  hook (React Query)  →  service (Axios)  →  Backend API
  UI            queries.ts /            the ONLY layer
               mutations.ts             that makes HTTP calls
```

- **Feature modules** are self-contained and mirrored across parallel folders
  (`pages/`, `components/`, `hooks/`, `services/`, `types/`, `schemas/`, `constants/`),
  all keyed by module name — e.g. `requirements`, `planner`, `risk`.
- **All UI strings, routes and endpoints are centralised** (`constants/labels.ts`,
  `routes.ts`, `endpoints.ts`) — a single source of truth, no hardcoded strings.
- **Auth** uses access/refresh tokens with a single-flight refresh interceptor;
  a 401 redirects to login and reports to Sentry.
- **Design system**: every colour, size, radius and shadow is a token in
  `src/index.css` — components consume them via Tailwind utilities, never raw hex.

```
src/
├── pages/[module]/          # route-level screens (lazy-loaded)
├── components/[module]/      # feature components
│   ├── ui/                   # shadcn/ui primitives
│   └── common/               # cross-module shared components
├── hooks/[module]/           # queries.ts + mutations.ts (React Query)
├── services/[module]/        # Axios calls (only place HTTP lives)
├── contexts/                 # Auth + Project providers
├── types/ · schemas/         # TypeScript types + Zod schemas
├── constants/                # labels, routes, endpoints, query keys
└── lib/                      # env, sentry, utils
```

---

## 🚀 Run it locally

Requires **Node 22** and **Yarn 1.22** (pinned via Volta).

```bash
yarn install

# point the app at your backend
cp .env.example .env          # VITE_API_BASE_URL=http://localhost:8000/api/v1

yarn dev                      # start the dev server
```

Other scripts:

```bash
yarn build        # type-check (tsc) + production build — type errors fail the build
yarn lint         # ESLint (type-aware)
yarn prettier     # format check
```

---

## ✨ Engineering highlights

- **Strict conventions, enforced by tooling** — no `any`, no `console`, no hardcoded
  strings/URLs, PascalCase types, 300-line file cap. Lint and the type-checker are the gate.
- **Every data screen handles loading / error / empty states** deliberately.
- **Streaming AI chat** over Server-Sent Events with persisted per-project history.
- **Token-safe API layer** — automatic refresh, single-flight, replay of in-flight requests.
- **Accessible by default** — Radix primitives, ARIA labels, keyboard-friendly dialogs.
