<script setup lang="ts">
import type { Component } from 'vue'
import { useMutation, useQueryCache } from '@pinia/colada'
import { resolveTheme } from '~/themes/registry'
import { INVITATION_QUERY_KEYS, unlockPublicInvitation } from '~/queries/invitations'
import { handleMutationError } from '~/utils/handleMutationError'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { invitation, query, rememberAccessCode } = usePublicInvitation(slug)
const isLoading = useQueryLoading(query)
const queryCache = useQueryCache()

const ThemeView = shallowRef<Component | null>(null)
const unlockError = ref('')

const loadError = computed(() => {
  if (query.error.value) return 'Undangan tidak ditemukan atau belum dipublikasikan.'
  return ''
})

const showNotFound = computed(() => !isLoading.value && (Boolean(loadError.value) || !invitation.value))
const isLocked = computed(() => Boolean(invitation.value?.locked))

watch(
  invitation,
  async (value) => {
    if (!value || value.locked) {
      ThemeView.value = null
      return
    }
    const { loader } = resolveTheme(value.themeId)
    const mod = await loader()
    ThemeView.value = markRaw(mod.default)
  },
  { immediate: true },
)

const { mutate: unlock, isLoading: unlocking } = useMutation({
  mutation: async (code: string) => unlockPublicInvitation(slug.value, code),
  onSuccess: async (result, code) => {
    unlockError.value = ''
    rememberAccessCode(code)
    queryCache.setQueryData([...INVITATION_QUERY_KEYS.bySlug(slug.value), code], result)
    await query.refetch()
  },
  onError: (err) => {
    unlockError.value = 'Kode akses salah. Coba lagi.'
    handleMutationError(err)
  },
})

useSeoMeta({
  title: computed(() => (invitation.value ? `${invitation.value.title} – Samasta` : 'Undangan tidak ditemukan')),
  description: computed(() => invitation.value?.greeting || 'Undangan digital Samasta'),
})
</script>

<template>
  <div v-if="isLoading" class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 text-center">
    <p class="text-samasta-muted">Memuat undangan...</p>
  </div>

  <div v-else-if="showNotFound" class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 text-center">
    <div>
      <p class="font-display text-3xl text-samasta-burgundy">{{ loadError || 'Undangan tidak ditemukan' }}</p>
      <NuxtLink to="/" class="btn-primary mt-6 inline-flex">Kembali ke Beranda</NuxtLink>
    </div>
  </div>

  <InvitationPublicAccessGate
    v-else-if="isLocked && invitation"
    :title="invitation.title"
    :submitting="unlocking"
    :error="unlockError"
    @submit="(code) => unlock(code)"
  />

  <component
    :is="ThemeView"
    v-else-if="ThemeView && invitation && !isLocked"
    :invitation="invitation"
  />
</template>
