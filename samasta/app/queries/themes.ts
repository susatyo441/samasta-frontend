import type {
  InvitationTheme,
  InvitationThemeFilters,
  InvitationThemePayload,
  PaginatedInvitationThemes,
} from '~/types'

export const THEME_QUERY_KEYS = {
  root: ['invitation-themes'] as const,
  list: (filters: InvitationThemeFilters = {}) =>
    [...THEME_QUERY_KEYS.root, 'list', filters] as const,
  bySlug: (slug: string) => [...THEME_QUERY_KEYS.root, 'by-slug', slug] as const,
}

function buildThemeListQuery(filters: InvitationThemeFilters = {}) {
  const params = new URLSearchParams()

  if (filters.q?.trim()) params.set('q', filters.q.trim())
  if (filters.isActive === true || filters.isActive === false) {
    params.set('isActive', String(filters.isActive))
  }
  if (filters.eventType) params.set('eventType', filters.eventType)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))
  if (filters.perPage) params.set('per_page', String(filters.perPage))

  const qs = params.toString()
  return qs ? `/api/invitation-themes?${qs}` : '/api/invitation-themes'
}

export function themeListQueryOptions(filters: InvitationThemeFilters = {}) {
  return {
    key: THEME_QUERY_KEYS.list(filters),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<PaginatedInvitationThemes>(buildThemeListQuery(filters))
    },
  }
}

export function themeBySlugQueryOptions(slug: string) {
  return {
    key: THEME_QUERY_KEYS.bySlug(slug),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: InvitationTheme }>(`/api/invitation-themes/${slug}`)
    },
  }
}

export async function createInvitationTheme(payload: InvitationThemePayload) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: InvitationTheme }>('/api/invitation-themes', {
    method: 'POST',
    body: payload,
  })
}

export async function updateInvitationTheme(slug: string, payload: Partial<InvitationThemePayload>) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: InvitationTheme }>(`/api/invitation-themes/${slug}`, {
    method: 'PUT',
    body: payload,
  })
}

export async function deleteInvitationTheme(slug: string) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ message: string }>(`/api/invitation-themes/${slug}`, {
    method: 'DELETE',
  })
}
