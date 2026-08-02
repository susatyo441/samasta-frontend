import { useQuery } from '@pinia/colada'
import {
  editorModulesQueryOptions,
  invitationByIdQueryOptions,
  invitationListQueryOptions,
  invitationTransactionsQueryOptions,
  publicInvitationBySlugQueryOptions,
} from '~/queries/invitations'
import type { Invitation, InvitationTransaction } from '~/types'
import { unwrapResource } from '~/utils/unwrapResource'

export function useInvitations() {
  const listQuery = useQuery(invitationListQueryOptions())
  const transactionsQuery = useQuery(invitationTransactionsQueryOptions())
  const modulesQuery = useQuery(editorModulesQueryOptions())

  const invitations = computed(() => listQuery.data.value?.data ?? [])

  const transactions = computed(() => unwrapResource(transactionsQuery.data.value) ?? [])

  const editorModules = computed(() => modulesQuery.data.value?.editorModules ?? [])

  return {
    invitations,
    transactions,
    editorModules,
    listQuery,
    transactionsQuery,
    modulesQuery,
  }
}

export function useInvitationById(id: MaybeRefOrGetter<string | number>) {
  const invitationId = computed(() => toValue(id))

  const query = useQuery(() => ({
    ...invitationByIdQueryOptions(invitationId.value),
    enabled: Boolean(invitationId.value),
  }))

  const invitation = computed(() => unwrapResource(query.data.value))

  return { query, invitation }
}

export function usePublicInvitation(slug: MaybeRefOrGetter<string>) {
  const route = useRoute()
  const invitationSlug = computed(() => toValue(slug))
  const accessCode = ref('')
  const guestId = computed(() => {
    const raw = route.query.guestId ?? route.query.guest
    return raw ? String(raw) : undefined
  })

  onMounted(() => {
    if (!import.meta.client) return
    accessCode.value = sessionStorage.getItem(`samasta-unlock:${invitationSlug.value}`) || ''
  })

  watch(invitationSlug, (next) => {
    if (!import.meta.client) return
    accessCode.value = sessionStorage.getItem(`samasta-unlock:${next}`) || ''
  })

  const query = useQuery(() => ({
    ...publicInvitationBySlugQueryOptions(
      invitationSlug.value,
      accessCode.value || undefined,
      guestId.value,
    ),
    enabled: Boolean(invitationSlug.value),
  }))

  const invitation = computed(() => unwrapResource(query.data.value))

  function rememberAccessCode(code: string) {
    accessCode.value = code
    if (import.meta.client) {
      sessionStorage.setItem(`samasta-unlock:${invitationSlug.value}`, code)
    }
  }

  return { query, invitation, accessCode, rememberAccessCode }
}

export type { Invitation, InvitationTransaction }
