import type {
  CreateInvitationPayload,
  EditorModule,
  GuestPayload,
  Invitation,
  InvitationGuest,
  InvitationMedia,
  InvitationPlan,
  InvitationTheme,
  InvitationTransaction,
  InvitationUpdatePayload,
  InvitationAnalytics,
  PaginatedInvitations,
  PublicRsvpPayload,
  PublicWishPayload,
  PublishInvitationResult,
} from '~/types'
import { unwrapResource } from '~/utils/unwrapResource'

export const INVITATION_QUERY_KEYS = {
  root: ['invitations'] as const,
  list: () => [...INVITATION_QUERY_KEYS.root, 'list'] as const,
  byId: (id: string | number) => [...INVITATION_QUERY_KEYS.root, 'by-id', String(id)] as const,
  bySlug: (slug: string) => [...INVITATION_QUERY_KEYS.root, 'by-slug', slug] as const,
  transactions: () => [...INVITATION_QUERY_KEYS.root, 'transactions'] as const,
  editorModules: () => [...INVITATION_QUERY_KEYS.root, 'editor-modules'] as const,
  catalogThemes: (eventType?: string) =>
    [...INVITATION_QUERY_KEYS.root, 'catalog-themes', eventType || 'all'] as const,
  plans: () => [...INVITATION_QUERY_KEYS.root, 'plans'] as const,
  guests: (invitationId: string | number) =>
    [...INVITATION_QUERY_KEYS.byId(invitationId), 'guests'] as const,
  analytics: (invitationId: string | number) =>
    [...INVITATION_QUERY_KEYS.byId(invitationId), 'analytics'] as const,
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

export function publicInvitationBySlugQueryOptions(slug: string, accessCode?: string) {
  return {
    key: [...INVITATION_QUERY_KEYS.bySlug(slug), accessCode || ''] as const,
    query: () => {
      const $larafetch = useSanctumClient()
      const qs = accessCode ? `?accessCode=${encodeURIComponent(accessCode)}` : ''
      return $larafetch<{ data: Invitation }>(`/api/public/invitations/${slug}${qs}`)
    },
  }
}

export async function unlockPublicInvitation(slug: string, accessCode: string) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: Invitation }>(`/api/public/invitations/${slug}/unlock`, {
    method: 'POST',
    body: { accessCode },
  })
}

export async function submitPublicRsvp(slug: string, payload: PublicRsvpPayload) {
  const $larafetch = useSanctumClient()
  const accessCode = import.meta.client
    ? sessionStorage.getItem(`samasta-unlock:${slug}`) || undefined
    : undefined
  return $larafetch<{ data: InvitationGuest; message: string }>(
    `/api/public/invitations/${slug}/rsvp`,
    {
      method: 'POST',
      body: { ...payload, ...(accessCode ? { accessCode } : {}) },
    },
  )
}

export async function submitPublicWish(slug: string, payload: PublicWishPayload) {
  const $larafetch = useSanctumClient()
  const accessCode = import.meta.client
    ? sessionStorage.getItem(`samasta-unlock:${slug}`) || undefined
    : undefined
  return $larafetch<{ data: InvitationGuest; message: string }>(
    `/api/public/invitations/${slug}/wishes`,
    {
      method: 'POST',
      body: { ...payload, ...(accessCode ? { accessCode } : {}) },
    },
  )
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

export function invitationPlansQueryOptions() {
  return {
    key: INVITATION_QUERY_KEYS.plans(),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ plans: InvitationPlan[] }>('/api/invitations/meta/plans')
    },
  }
}

export function invitationGuestsQueryOptions(invitationId: string | number) {
  return {
    key: INVITATION_QUERY_KEYS.guests(invitationId),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: InvitationGuest[] }>(`/api/invitations/${invitationId}/guests`)
    },
  }
}

export function invitationAnalyticsQueryOptions(invitationId: string | number) {
  return {
    key: INVITATION_QUERY_KEYS.analytics(invitationId),
    query: () => {
      const $larafetch = useSanctumClient()
      return $larafetch<{ data: InvitationAnalytics }>(
        `/api/invitations/${invitationId}/analytics`,
      )
    },
  }
}

export async function blastInvitationWhatsapp(
  invitationId: string | number,
  payload?: { guestIds?: string[]; skipSent?: boolean },
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{
    message: string
    data: {
      sent: number
      failed: number
      skipped: number
      results: Array<{ guestId: string; name: string; status: string; reason?: string }>
    }
  }>(`/api/invitations/${invitationId}/guests/wa-blast`, {
    method: 'POST',
    body: payload ?? { skipSent: true },
  })
}

export async function sendInvitationGuestWhatsapp(
  invitationId: string | number,
  guestId: string | number,
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: InvitationGuest; message: string }>(
    `/api/invitations/${invitationId}/guests/${guestId}/wa-send`,
    { method: 'POST' },
  )
}

export async function createInvitation(payload: CreateInvitationPayload) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: Invitation }>('/api/invitations', {
    method: 'POST',
    body: payload,
  })
}

export async function updateInvitation(
  id: string | number,
  payload: InvitationUpdatePayload | Record<string, unknown>,
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: Invitation }>(`/api/invitations/${id}`, {
    method: 'PUT',
    body: payload,
  })
}

export async function uploadInvitationMedia(
  invitationId: string | number,
  file: File,
  type: 'cover' | 'gallery' | 'qris',
  label?: string,
) {
  const $larafetch = useSanctumClient()
  const body = new FormData()
  body.append('file', file)
  body.append('type', type)
  if (label) body.append('label', label)

  return $larafetch<{ data: InvitationMedia }>(`/api/invitations/${invitationId}/media`, {
    method: 'POST',
    body,
  })
}

export async function deleteInvitationMedia(invitationId: string | number, mediaId: string) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ message: string }>(`/api/invitations/${invitationId}/media/${mediaId}`, {
    method: 'DELETE',
  })
}

export async function publishInvitation(invitationId: string | number, planId: string) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: PublishInvitationResult }>(`/api/invitations/${invitationId}/publish`, {
    method: 'POST',
    body: { planId },
  })
}

export async function fetchPublishStatus(
  invitationId: string | number,
  transactionId: string | number,
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: PublishInvitationResult }>(
    `/api/invitations/${invitationId}/publish/${transactionId}`,
  )
}

export async function createInvitationGuest(invitationId: string | number, payload: GuestPayload) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: InvitationGuest }>(`/api/invitations/${invitationId}/guests`, {
    method: 'POST',
    body: payload,
  })
}

export async function updateInvitationGuest(
  invitationId: string | number,
  guestId: string | number,
  payload: GuestPayload,
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ data: InvitationGuest }>(
    `/api/invitations/${invitationId}/guests/${guestId}`,
    {
      method: 'PUT',
      body: payload,
    },
  )
}

export async function deleteInvitationGuest(
  invitationId: string | number,
  guestId: string | number,
) {
  const $larafetch = useSanctumClient()
  return $larafetch<{ message: string }>(`/api/invitations/${invitationId}/guests/${guestId}`, {
    method: 'DELETE',
  })
}

export async function importInvitationGuests(invitationId: string | number, file: File) {
  const $larafetch = useSanctumClient()
  const body = new FormData()
  body.append('file', file)

  return $larafetch<{
    message: string
    data: { imported: number; skipped: number; errors: Record<string, string> }
  }>(`/api/invitations/${invitationId}/guests/import`, { method: 'POST', body })
}

export function downloadGuestImportTemplate() {
  const config = useRuntimeConfig()
  const base = config.public.sanctum.baseUrl as string
  return `${base}/api/invitations/guests/import-template`
}

export function unwrapInvitation<T extends { data: Invitation } | Invitation | null | undefined>(
  payload: T,
) {
  return unwrapResource(payload as { data: Invitation } | Invitation | null | undefined)
}
