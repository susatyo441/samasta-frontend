<script setup lang="ts">
import type { Invitation } from '~/types'
import { eventTypeCoverLabel } from '~/utils/invitationDisplay'
import { formatDateId } from '~/utils/formatDate'

defineProps<{
  invitation: Invitation
}>()

const emit = defineEmits<{
  open: []
}>()
</script>

<template>
  <section
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    :class="`bg-gradient-to-br ${invitation.coverGradient}`"
  >
    <div class="absolute inset-0 bg-white/30" />
    <div class="relative z-10 max-w-sm">
      <p class="text-xs uppercase tracking-[0.25em] text-samasta-muted">
        {{ eventTypeCoverLabel(invitation.eventType) }}
      </p>
      <h1 class="mt-4 font-display text-5xl font-semibold leading-tight text-samasta-burgundy">
        {{ invitation.title }}
      </h1>
      <p class="mt-4 text-sm text-samasta-muted">
        {{ invitation.events?.[0] ? formatDateId(invitation.events[0].date) : '' }}
      </p>
      <button type="button" class="btn-primary mt-10 min-w-[200px]" @click="emit('open')">
        Buka Undangan
      </button>
      <p class="mt-4 text-[11px] text-samasta-muted">Ketuk untuk membuka undangan</p>
    </div>
  </section>
</template>
