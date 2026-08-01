<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { invitation, query } = usePublicInvitation(slug)
const isLoading = useQueryLoading(query)

const opened = ref(false)

const loadError = computed(() => {
  if (query.error.value) return 'Undangan tidak ditemukan atau belum dipublikasikan.'
  return ''
})

const showNotFound = computed(() => !isLoading.value && (Boolean(loadError.value) || !invitation.value))

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

  <div v-else-if="invitation" class="min-h-screen bg-samasta-cream text-samasta-charcoal">
    <InvitationPublicCover v-if="!opened" :invitation="invitation" @open="opened = true" />
    <InvitationPublicContent v-else :invitation="invitation" />
  </div>
</template>
