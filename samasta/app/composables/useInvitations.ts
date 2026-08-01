import { useQuery } from '@pinia/colada'
import {
  editorModulesQueryOptions,
  invitationByIdQueryOptions,
  invitationListQueryOptions,
  invitationTransactionsQueryOptions,
  publicInvitationBySlugQueryOptions,
} from '~/queries/invitations'
import type { Invitation, InvitationTransaction } from '~/types'

function unwrapResource<T>(payload: T | { data: T } | null | undefined): T | null {
  if (!payload) return null
  if (typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }
  return payload
}

export function useInvitations() {
  const listQuery = useQuery(invitationListQueryOptions())
  const transactionsQuery = useQuery(invitationTransactionsQueryOptions())
  const modulesQuery = useQuery(editorModulesQueryOptions())

  const invitations = computed(() => listQuery.data.value?.data ?? [])

  const transactions = computed(() => {
    const payload = transactionsQuery.data.value
    return unwrapResource(payload) ?? []
  })

  const editorModules = computed(() => modulesQuery.data.value?.editorModules ?? [])

  function getById(id: string | number) {
    return invitations.value.find((item) => String(item.id) === String(id)) || null
  }

  function publicPath(slug: string) {
    return `/u/${slug}`
  }

  return {
    invitations,
    transactions,
    editorModules,
    listQuery,
    transactionsQuery,
    modulesQuery,
    getById,
    publicPath,
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
  const invitationSlug = computed(() => toValue(slug))

  const query = useQuery(() => ({
    ...publicInvitationBySlugQueryOptions(invitationSlug.value),
    enabled: Boolean(invitationSlug.value),
  }))

  const invitation = computed(() => unwrapResource(query.data.value))

  return { query, invitation }
}

export type { Invitation, InvitationTransaction }
