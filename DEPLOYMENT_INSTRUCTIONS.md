# Deployment Instructions — ProjectOS Frontend

This document describes how to build and deploy the ProjectOS frontend, a Vite-built
React 19 + TypeScript single-page application (SPA), to **Vercel**.

---

## 1. Prerequisites

| Tool    | Version                  | Notes                              |
| ------- | ------------------------ | ---------------------------------- |
| Node.js | `22.x` (tested on 22.19) | LTS recommended                    |
| Yarn    | `1.22.x` (Classic)       | `yarn.lock` is the source of truth |
| Git     | any recent               | to fetch the source                |

> The project pins Node 22.18 / Yarn 1.22 via Volta. If you use Volta, the correct
> versions are selected automatically. Otherwise install them manually and confirm
> with `node -v` and `yarn -v`.

---

## 2. Environment Variables

All build-time configuration is exposed through Vite's `import.meta.env` and **must**
be prefixed with `VITE_`. Variables are inlined into the bundle **at build time**, not
read at runtime — you must redeploy whenever a value changes.

| Variable            | Required | Description                             | Example                                    |
| ------------------- | -------- | --------------------------------------- | ------------------------------------------ |
| `VITE_API_BASE_URL` | Yes      | Base URL of the backend API (`/api/v1`) | `https://api.projectos.example.com/api/v1` |

Set this in Vercel under _Project → Settings → Environment Variables_ (see Section 4).
For local builds, create a `.env` file — see `.env.example`:

```bash
VITE_API_BASE_URL=https://api.projectos.example.com/api/v1
```

> `.env` is git-ignored — never commit it. Configure the value in Vercel instead.

### Backend / CORS note

Auth is **cookie-based** (Microsoft SSO session cookies); the app sends requests with
`withCredentials: true` and no Bearer token. The backend at `VITE_API_BASE_URL` must
therefore:

- serve the API over **HTTPS** in production,
- set `Access-Control-Allow-Credentials: true`,
- allow the frontend's exact origin in `Access-Control-Allow-Origin` (wildcard `*` is
  not permitted with credentials),
- issue session cookies with `Secure` and an appropriate `SameSite` policy for the
  frontend/backend domain relationship.

---

## 3. Build Output

`yarn build` runs `tsc -b` (app + node configs) and then `vite build`.
**Type errors fail the build** — there is no separate typecheck step. The optimized
static output is written to the **`dist/`** directory:

```
dist/
├── index.html
├── favicon.svg
└── assets/        # hashed JS/CSS chunks (vendor-react, vendor-query, …)
```

SPA routing is handled by `vercel.json`, which rewrites all unknown paths to
`/index.html` so deep links and hard refreshes (e.g. `/projects/123`) work:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Optional local verification before deploying

```bash
yarn install --frozen-lockfile
yarn build            # type-check + production build
yarn preview          # serve dist/ locally at http://localhost:4173 to smoke-test
```

---

## 4. Deploy to Vercel

The repo ships with `vercel.json`, so Vercel needs almost no setup.

1. Import the Git repository into Vercel (or use the `vercel` CLI).
2. Framework preset: **Vite**.
3. Build settings (auto-detected, override if needed):
   - Install command: `yarn install --frozen-lockfile`
   - Build command: `yarn build`
   - Output directory: `dist`
4. Add the environment variable **`VITE_API_BASE_URL`** under
   _Project → Settings → Environment Variables_ for the target environments
   (Production / Preview).
5. Deploy. Pushes to the production branch trigger automatic production builds;
   other branches/PRs get preview deployments.

> Because env vars are baked in at build time, changing `VITE_API_BASE_URL` in Vercel
> requires a **redeploy** to take effect.

---

## 5. Post-Deployment Verification

- [ ] App loads at the root URL with no console errors.
- [ ] Deep-linking / hard refresh on a nested route (e.g. `/projects`) works (SPA
      fallback is correct).
- [ ] Network requests hit the expected `VITE_API_BASE_URL`.
- [ ] Login via Microsoft SSO succeeds and the session cookie is set (check
      Application → Cookies) — confirms CORS + credentials are configured.

---

## 6. Rollback

Promote a previous deployment from the Vercel _Deployments_ tab (_Instant Rollback_).
Because each build is fully static and content-hashed, rolling back is simply
re-serving the prior deployment.

---

## 7. Troubleshooting

| Symptom                                        | Likely cause                              | Fix                                                                                 |
| ---------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| 404 on refresh of a nested route               | Missing SPA fallback                      | Ensure `vercel.json` rewrites are present (Section 3).                              |
| API calls go to `localhost:8000` in production | `VITE_API_BASE_URL` not set at build time | Set the env var in Vercel and **redeploy**.                                         |
| Logged out immediately / 401 loop              | Cookie/CORS misconfig on backend          | Ensure HTTPS, `Allow-Credentials: true`, exact origin, `Secure`/`SameSite` cookies. |
| Build fails on type errors                     | `tsc -b` gate                             | Fix the reported TypeScript errors; `yarn build` will not skip them.                |
