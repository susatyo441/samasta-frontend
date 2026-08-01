import { useQuery, useQueryCache } from '@pinia/colada'
import {
  createInvitationTheme,
  deleteInvitationTheme,
  themeListQueryOptions,
  updateInvitationTheme,
} from '~/queries/themes'
import type {
  InvitationTheme,
  InvitationThemeFilters,
  InvitationThemePayload,
} from '~/types'
import { THEME_QUERY_KEYS } from '~/queries/themes'

export function useInvitationThemes(filters: MaybeRefOrGetter<InvitationThemeFilters> = {}) {
  const resolvedFilters = computed(() => toValue(filters))

  const listQuery = useQuery(() => themeListQueryOptions(resolvedFilters.value))

  const themes = computed(() => listQuery.data.value?.data ?? [])
  const meta = computed(() => listQuery.data.value?.meta)

  return {
    themes,
    meta,
    listQuery,
  }
}

export function useInvitationThemeMutations() {
  const queryCache = useQueryCache()

  async function invalidateThemes() {
    await queryCache.invalidateQueries({ key: THEME_QUERY_KEYS.root })
  }

  async function createTheme(payload: InvitationThemePayload) {
    const result = await createInvitationTheme(payload)
    await invalidateThemes()
    return result
  }

  async function updateTheme(slug: string, payload: Partial<InvitationThemePayload>) {
    const result = await updateInvitationTheme(slug, payload)
    await invalidateThemes()
    return result
  }

  async function removeTheme(slug: string) {
    const result = await deleteInvitationTheme(slug)
    await invalidateThemes()
    return result
  }

  return {
    createTheme,
    updateTheme,
    removeTheme,
    invalidateThemes,
  }
}

export type { InvitationTheme, InvitationThemePayload }
