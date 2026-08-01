import type {
  EditorModule,
  Invitation,
  InvitationMedia,
  InvitationTheme,
  InvitationTransaction,
  PaginatedInvitations,
} from '~/types'

export const INVITATION_QUERY_KEYS = {
  root: ['invitations'] as const,
  list: () => [...INVITATION_QUERY_KEYS.root, 'list'] as const,
  byId: (id: string | number) => [...INVITATION_QUERY_KEYS.root, 'by-id', String(id)] as const,
  bySlug: (slug: string) => [...INVITATION_QUERY_KEYS.root, 'by-slug', slug] as const,
  transactions: () => [...INVITATION_QUERY_KEYS.root, 'transactions'] as const,
  editorModules: () => [...INVITATION_QUERY_KEYS.root, 'editor-modules'] as const,
  catalogThemes: (eventType?: string) =>
    [...INVITATION_QUERY_KEYS.root, 'catalog-themes', eventType || 'all'] as const,
}

export function invitationListQueryOptions() {
  return {
    key: INVITATION_QUERY_KEYS.list(),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<PaginatedInvitations>('/api/invitations')
    },
  }
}

export function invitationByIdQueryOptions(id: string | number) {
  return {
    key: INVITATION_QUERY_KEYS.byId(id),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: Invitation }>(`/api/invitations/${id}`)
    },
  }
}

export function publicInvitationBySlugQueryOptions(slug: string) {
  return {
    key: INVITATION_QUERY_KEYS.bySlug(slug),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: Invitation }>(`/api/public/invitations/${slug}`)
    },
  }
}

export function invitationTransactionsQueryOptions() {
  return {
    key: INVITATION_QUERY_KEYS.transactions(),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: InvitationTransaction[] } | InvitationTransaction[]>(
        '/api/invitation-transactions',
      )
    },
  }
}

export function editorModulesQueryOptions() {
  return {
    key: INVITATION_QUERY_KEYS.editorModules(),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ editorModules: EditorModule[] }>('/api/invitations/meta/editor-modules')
    },
  }
}

export function catalogThemesQueryOptions(eventType?: string) {
  return {
    key: INVITATION_QUERY_KEYS.catalogThemes(eventType),
    query: () => {
      const $larafetch = useSanctumClient()
      const qs = eventType ? `?eventType=${encodeURIComponent(eventType)}` : ''
      return $larafetch<{ data: InvitationTheme[] }>(`/api/invitations/meta/themes${qs}`)
    },
  }
}

export async function updateInvitation(id: string | number, payload: Record<string, unknown>) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: Invitation }>(`/api/invitations/${id}`, {
    method: 'PUT',
    body: payload,
  })
}

export async function uploadInvitationMedia(
  id: string | number,
  file: File,
  type: 'cover' | 'gallery',
  label?: string,
) {
  const $larafetch = useSanctumClient()
  const body = new FormData()
  body.append('file', file)
  body.append('type', type)
  if (label) body.append('label', label)

  return $larafetch<{ data: InvitationMedia }>(`/api/invitations/${id}/media`, {
    method: 'POST',
    body,
  })
}

export async function deleteInvitationMedia(id: string | number, mediaId: string) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ message: string }>(`/api/invitations/${id}/media/${mediaId}`, {
    method: 'DELETE',
  })
}
