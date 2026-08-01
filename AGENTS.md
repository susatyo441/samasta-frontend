# Samasta Frontend — Agent Instructions

App lives in **`samasta/`**. Run all commands from that directory unless noted.

## Stack

Nuxt 4 + Vue 3 + TypeScript + Tailwind + Pinia Colada + nuxt-auth-sanctum. Backend API: **gsj-store** (Sanctum).

Follow the same structure as **syncphony_frontend**:
- `utils/` — pure helpers
- `composables/` — reactive Vue logic
- `queries/` — Pinia Colada query keys/options
- `constants/` — static config
- `components/ui|auth|dashboard|invitation/` — feature folders

## Required checks after every change

Before finishing a task, **always** run from `samasta/`:

```bash
pnpm lint
pnpm fmt:check
pnpm typecheck
```

If you changed CSS/layout or suspect a broken build:

```bash
pnpm postinstall   # nuxt prepare
```

Fix all failures before claiming the work is done. Do not skip lint/typecheck because “it looks fine.”

There is no automated test suite yet. When tests are added, run them the same way and fix failures.

## Local run

```bash
# Terminal 1 — gsj-store API
cd ../gsj-store && php artisan serve

# Terminal 2 — Samasta
cd samasta && pnpm install && pnpm dev
```

Copy `samasta/.env.example` → `samasta/.env`. Demo user: `demo@samasta.app` / `samasta123`.

Implementation phases: [../SAMASTA_ROADMAP.md](../SAMASTA_ROADMAP.md).
