<script setup lang="ts">
import type { Invitation } from '~/types'
import { rsvpStatusClasses } from '~/utils/invitationDisplay'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="guest in invitation.guests"
      :key="guest.id"
      class="flex items-center justify-between rounded-xl border border-samasta-burgundy/10 px-3 py-3 text-sm"
    >
      <div>
        <p class="font-medium">{{ guest.name }}</p>
        <p class="text-xs text-samasta-muted">{{ guest.group }} · kuota {{ guest.quota }}</p>
      </div>
      <span
        class="rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
        :class="rsvpStatusClasses(guest.rsvp || 'belum')"
      >
        {{ guest.rsvp }}
      </span>
    </div>
  </div>
</template>
