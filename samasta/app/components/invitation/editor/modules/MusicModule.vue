<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="rounded-2xl bg-samasta-cream p-4">
    <p class="text-sm text-samasta-muted">Lagu saat ini</p>
    <p class="mt-1 font-medium text-samasta-burgundy">{{ invitation.music?.title }}</p>
    <p class="mt-3 text-xs text-samasta-muted">Autoplay: {{ invitation.music?.autoplay ? 'Aktif' : 'Nonaktif' }}</p>
  </div>
</template>
