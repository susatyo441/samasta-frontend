import { useQuery } from '@pinia/colada'
import {
  editorModulesQueryOptions,
  invitationByIdQueryOptions,
  invitationListQueryOptions,
  invitationTransactionsQueryOptions,
  publicInvitationBySlugQueryOptions,
} from '~/queries/invitations'
import { unwrapResource } from '~/utils/unwrapResource'

export function useInvitationList() {
  const query = useQuery(invitationListQueryOptions())
  const invitations = computed(() => query.data.value?.data ?? [])

  return { query, invitations }
}

export function useInvitationTransactions() {
  const query = useQuery(invitationTransactionsQueryOptions())
  const transactions = computed(() => unwrapResource(query.data.value) ?? [])

  return { query, transactions }
}

export function useEditorModules() {
  const query = useQuery(editorModulesQueryOptions())
  const editorModules = computed(() => query.data.value?.editorModules ?? [])

  return { query, editorModules }
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
