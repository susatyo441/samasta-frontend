<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(event, idx) in invitation.events"
      :key="idx"
      class="rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/70 p-4"
    >
      <p class="font-medium text-samasta-burgundy">{{ event.name }}</p>
      <p class="mt-1 text-sm text-samasta-muted">{{ event.date }} · {{ event.startTime }}–{{ event.endTime }}</p>
      <p class="mt-2 text-sm">{{ event.venueName }}</p>
      <p class="text-xs text-samasta-muted">{{ event.venueAddress }}</p>
    </div>
  </div>
</template>
