# Invitation Themes — Frontend POV

How **Samasta (Nuxt)** implements theme layouts and ties them to the gsj-store catalog.

Companion doc (backend): `gsj-store/docs/INVITATION_THEMES.md`

---

## Responsibility

| Frontend owns | Backend owns |
|---------------|--------------|
| Vue code per theme (`app/themes/{key}/`) | Catalog rows + `invitation.themeId` |
| Registry: `componentKey` → async component | Active/inactive, premium, sort, preview |
| Shared RSVP / wishes / gift helpers | Content JSON, guests, publish |
| Fallback when key is missing | Validating `themeId` on save |

**Do not** invent theme ids in the UI. Only implement keys that exist (or will exist) in the API.

**Do not** put full theme source in the API. Different themes = different frontend packages.

---

## Folder structure

```text
app/
  themes/
    registry.ts                 # map componentKey → () => import(...)
    types.ts                    # ThemeProps = { invitation: Invitation }
    _shared/                    # cross-theme behavior
      sections/
        RsvpForm.vue
        WishList.vue
        GiftAccounts.vue
        MusicToggle.vue
      composables/
        useInvitationSections.ts

    aurora-pastel/              # == API componentKey / slug
      index.vue                 # entry: full public invitation
      Cover.vue
      Content.vue
      theme.css                 # optional

    confetti-pop/
      index.vue
      Cover.vue
      Content.vue

  components/invitation/        # dashboard + editor (content), NOT public themes
    public/                     # temporary generic layout until themes land
    editor/
```

| Area | Purpose |
|------|---------|
| `app/themes/*` | Public invitation **look** (per design) |
| `app/components/invitation/*` | Creator dashboard, editor modules, cards |
| `app/pages/u/[slug].vue` | Loads invitation → resolves theme → renders package |

---

## Contract with the API

### Catalog item

```ts
interface InvitationTheme {
  id: string            // slug, e.g. "aurora-pastel"
  name: string
  tag?: string
  coverGradient?: string
  previewImage?: string | null
  eventTypes: string[]
  componentKey: string  // Vue folder key — use this to resolve
  isPremium: boolean
  isActive: boolean
  sortOrder: number
}
```

### Invitation

```ts
invitation.themeId      // slug stored on invitation
invitation.coverGradient
// + hosts, events, gallery, gift, ...
```

Resolve order:

1. Prefer `componentKey` from catalog when available  
2. Else use `invitation.themeId`  
3. Else `defaultThemeKey` (`confetti-pop`)

Implemented Vue packages today: `confetti-pop`, `aurora-pastel`.

### Endpoints

| Use | Path |
|-----|------|
| Landing / picker | `GET /api/public/invitations/meta/themes` |
| Authenticated picker | `GET /api/invitations/meta/themes` |
| Public invitation | `GET /api/public/invitations/{slug}` |
| Set theme | `PUT /api/invitations/{id}` with `{ themeId }` |

Admin theme CRUD lives on the separate admin frontend (`/api/invitation-themes`). Creator app only consumes the catalog + assignment.

---

## Registry pattern

```ts
// app/themes/registry.ts
import type { Component } from 'vue'

export const themeRegistry: Record<string, () => Promise<{ default: Component }>> = {
  'aurora-pastel': () => import('~/themes/aurora-pastel/index.vue'),
  'confetti-pop': () => import('~/themes/confetti-pop/index.vue'),
}

export const defaultThemeKey = 'aurora-pastel'

export function resolveTheme(themeId?: string | null) {
  const key = themeId && themeRegistry[themeId] ? themeId : defaultThemeKey
  return { key, loader: themeRegistry[key] }
}
```

Public page sketch:

```vue
<script setup lang="ts">
const { invitation } = usePublicInvitation(slug)
const ThemeView = shallowRef(null)

watchEffect(async () => {
  if (!invitation.value) return
  const { loader } = resolveTheme(invitation.value.themeId)
  ThemeView.value = markRaw((await loader()).default)
})
</script>

<template>
  <component
    :is="ThemeView"
    v-if="ThemeView && invitation"
    :invitation="invitation"
  />
</template>
```

Every theme `index.vue` receives the **same** props: `{ invitation }`. Layout and styling may differ; content schema must not.

---

## Shared vs theme-specific

**Shared (`themes/_shared/`)** — keep API behavior identical:

- RSVP submit
- Wishes / guestbook
- Copy rekening, maps link
- Music unlock after first tap (browser autoplay rules)

**Theme-specific (`themes/{key}/`)** — visual only:

- Cover animation, fonts, colors
- Section order and chrome
- Gallery as grid vs carousel
- Optional `theme.css`

---

## Adding a new theme (frontend checklist)

1. Backend (or admin) creates catalog row with matching `slug` / `componentKey`
2. Add `app/themes/{componentKey}/index.vue` (+ Cover/Content as needed)
3. Register in `themeRegistry`
4. Deploy frontend **before** (or together with) setting `is_active: true`
5. If the registry entry is missing, `resolveTheme` falls back to default — public links keep working

---

## What to avoid

- One giant `PublicContent.vue` with `v-if="themeId === '...'"` for every design
- Hardcoding marketing theme lists that diverge from `/api/.../meta/themes`
- Theme packages that invent their own content fields (stick to `Invitation` type)
- Storing Vue SFCs or HTML blobs in the API

---

## Mental model

```text
GET /api/public/invitations/{slug}
        │
{ themeId: "aurora-pastel", hosts, events, ... }
        │
resolveTheme(themeId) → themes/aurora-pastel/index.vue
        │
renders content + shared RSVP/wish sections
```

**Catalog = backend. Code = frontend package per `componentKey`.**
