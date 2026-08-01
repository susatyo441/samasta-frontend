<script setup lang="ts">
import type { Invitation } from '~/types'
import { eventTypeCoverLabel } from '~/utils/invitationDisplay'
import { formatDateId } from '~/utils/formatDate'
import { useInvitationSections } from '~/themes/_shared/composables/useInvitationSections'
import { usePublicGuestContext } from '~/themes/_shared/composables/usePublicGuestContext'
import OrnamentField from './OrnamentField.vue'

const props = defineProps<{
  invitation: Invitation
}>()

const emit = defineEmits<{
  open: []
}>()

const { coverUrl, primaryEvent } = useInvitationSections(() => props.invitation)
const { guestName, hasPersonalization } = usePublicGuestContext(() => props.invitation)

const hostNames = computed(() =>
  (props.invitation.hosts || []).map((host) => host.name).filter(Boolean),
)

const displayTitle = computed(() => {
  if (hostNames.value.length >= 2) return hostNames.value.slice(0, 2).join(' & ')
  return props.invitation.title
})
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-14">
    <OrnamentField />

    <div class="cp-frame cp-pop relative z-10 w-full max-w-sm px-5 py-10 text-center sm:px-7 sm:py-12">
      <div class="cp-ornament mb-5">Janur</div>

      <p class="text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--cp-muted)]">
        {{ eventTypeCoverLabel(invitation.eventType) }}
      </p>

      <div
        v-if="coverUrl"
        class="cp-float mx-auto mt-6 aspect-[4/5] w-44 overflow-hidden rounded-sm border border-[var(--cp-line)] shadow-sm"
      >
        <img :src="coverUrl" :alt="invitation.title" class="h-full w-full object-cover">
      </div>

      <div class="cp-divider" />

      <p
        v-if="hasPersonalization"
        class="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--cp-muted)]"
      >
        Kepada Yth.
      </p>
      <p v-if="guestName" class="cp-script mt-1 text-3xl text-[var(--cp-burgundy)]">
        {{ guestName }}
      </p>

      <div v-if="hasPersonalization" class="cp-divider" />

      <h1 class="cp-script mt-2 text-4xl leading-tight text-[var(--cp-burgundy)] sm:text-5xl">
        {{ displayTitle }}
      </h1>

      <p v-if="hostNames.length >= 2" class="mt-3 text-xs tracking-[0.18em] text-[var(--cp-muted)]">
        {{ invitation.title }}
      </p>

      <div class="cp-divider" />

      <p v-if="primaryEvent" class="text-sm tracking-wide text-[var(--cp-ink)]">
        {{ formatDateId(primaryEvent.date) }}
      </p>
      <p v-if="primaryEvent?.venueName" class="mt-1 text-xs text-[var(--cp-muted)]">
        {{ primaryEvent.venueName }}
      </p>

      <button type="button" class="cp-btn mt-9 min-w-[200px]" @click="emit('open')">
        Buka Undangan
      </button>
      <p class="mt-4 text-[11px] tracking-wide text-[var(--cp-muted)]">
        Ketuk untuk membuka kabar bahagia
      </p>
    </div>
  </section>
</template>
