<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, idx) in invitation.loveStory"
      :key="idx"
      class="rounded-2xl border-l-4 border-samasta-gold bg-samasta-cream p-4"
    >
      <p class="text-xs font-semibold text-samasta-gold">{{ item.year }}</p>
      <p class="mt-1 font-medium text-samasta-burgundy">{{ item.title }}</p>
      <p class="mt-1 text-sm text-samasta-muted">{{ item.description }}</p>
    </div>
    <p v-if="!invitation.loveStory?.length" class="text-sm text-samasta-muted">Belum ada cerita.</p>
  </div>
</template>
