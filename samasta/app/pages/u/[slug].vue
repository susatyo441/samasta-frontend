<script setup lang="ts">
import type { Component } from 'vue'
import { resolveTheme } from '~/themes/registry'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { invitation, query } = usePublicInvitation(slug)
const isLoading = useQueryLoading(query)

const ThemeView = shallowRef<Component | null>(null)

const loadError = computed(() => {
  if (query.error.value) return 'Undangan tidak ditemukan atau belum dipublikasikan.'
  return ''
})

const showNotFound = computed(() => !isLoading.value && (Boolean(loadError.value) || !invitation.value))

watch(
  invitation,
  async (value) => {
    if (!value) {
      ThemeView.value = null
      return
    }
    const { loader } = resolveTheme(value.themeId)
    const mod = await loader()
    ThemeView.value = markRaw(mod.default)
  },
  { immediate: true },
)

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

  <component
    :is="ThemeView"
    v-else-if="ThemeView && invitation"
    :invitation="invitation"
  />
</template>
