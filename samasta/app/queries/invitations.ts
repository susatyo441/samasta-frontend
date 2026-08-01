import type {
  EditorModule,
  Invitation,
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
