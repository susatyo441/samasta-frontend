# Samasta

Nuxt 4 frontend for Samasta wedding/birthday invitation SaaS. Talks to the **gsj-store** Laravel Sanctum API.

## Setup

```bash
cd samasta
pnpm install
cp .env.example .env
```

Point `NUXT_PUBLIC_SANCTUM_BASE_URL` at gsj-store (default `http://localhost:8000`).

```bash
pnpm dev
```

Demo login: `demo@samasta.app` / `samasta123` (seeded in gsj-store).

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (`http://localhost:3000`) |
| `pnpm build` | Production build |
| `pnpm lint` | Oxlint (deny warnings) |
| `pnpm fmt` | Format with oxfmt |
| `pnpm fmt:check` | Check formatting |
| `pnpm typecheck` | `vue-tsc --noEmit` |
| `pnpm postinstall` | `nuxt prepare` |

## Agent / AI checklist

After any code change, always verify from this directory:

```bash
pnpm lint
pnpm fmt:check
pnpm typecheck
```

Fix failures before considering the task done. See also [../AGENTS.md](../AGENTS.md).

## Project layout

```
app/
├── components/   # ui/, auth/, dashboard/, invitation/, landing/
├── composables/
├── constants/
├── layouts/
├── pages/
├── queries/
├── types/
└── utils/
```

Patterns mirror **syncphony_frontend**: pure helpers in `utils/`, Vue-aware logic in `composables/`, Pinia Colada in `queries/`.
