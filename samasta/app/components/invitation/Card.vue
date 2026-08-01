<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <NuxtLink
    :to="`/dashboard/undangan/${invitation.id}`"
    class="dash-card block overflow-hidden !p-0 transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="h-28 bg-gradient-to-br" :class="invitation.coverGradient" />
    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="truncate font-display text-xl font-semibold text-samasta-burgundy">{{ invitation.title }}</p>
          <p class="mt-1 text-xs capitalize text-samasta-muted">{{ invitation.eventType }}</p>
        </div>
        <UiStatusBadge :status="invitation.status" />
      </div>
      <UiStatGrid
        class="mt-4"
        variant="compact"
        :guests="invitation.stats?.guests ?? 0"
        :attending="invitation.stats?.attending ?? 0"
        :messages="invitation.stats?.messages ?? 0"
      />
    </div>
  </NuxtLink>
</template>
