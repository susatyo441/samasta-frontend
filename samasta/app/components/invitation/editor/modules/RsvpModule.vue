<script setup lang="ts">
import type { Invitation } from '~/types'
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'
import { rsvpStatusClasses } from '~/utils/invitationDisplay'

defineProps<{
  invitation: Invitation
  draft: InvitationEditorDraft
}>()
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Batas konfirmasi RSVP</label>
      <input v-model="draft.rsvpDeadline" type="date" :class="EDITOR_INPUT_CLASS">
    </div>

    <div class="space-y-2">
      <p class="text-sm font-semibold text-samasta-burgundy">Daftar tamu</p>
      <div
        v-for="guest in invitation.guests"
        :key="guest.id"
        class="flex items-center justify-between rounded-xl border border-samasta-burgundy/10 px-3 py-3 text-sm"
      >
        <div>
          <p class="font-medium">{{ guest.name }}</p>
          <p class="text-xs text-samasta-muted">{{ guest.group || 'Umum' }} · kuota {{ guest.quota ?? 1 }}</p>
        </div>
        <span
          class="rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
          :class="rsvpStatusClasses(guest.rsvp || 'belum')"
        >
          {{ guest.rsvp || 'belum' }}
        </span>
      </div>
      <p v-if="!invitation.guests?.length" class="text-sm text-samasta-muted">Belum ada tamu.</p>
    </div>
  </div>
</template>
