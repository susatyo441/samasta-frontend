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

    <div class="ap-frame ap-pop relative z-10 w-full max-w-sm px-5 py-10 text-center sm:px-7 sm:py-12">
      <div class="ap-ornament mb-5">Aurora</div>

      <p class="text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--ap-muted)]">
        {{ eventTypeCoverLabel(invitation.eventType) }}
      </p>

      <div
        v-if="coverUrl"
        class="ap-float mx-auto mt-6 aspect-[4/5] w-44 overflow-hidden rounded-sm border border-[var(--ap-line)] shadow-sm"
      >
        <img :src="coverUrl" :alt="invitation.title" class="h-full w-full object-cover">
      </div>

      <div class="ap-divider" />

      <p
        v-if="hasPersonalization"
        class="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ap-muted)]"
      >
        Kepada Yth.
      </p>
      <p v-if="guestName" class="ap-script mt-1 text-3xl text-[var(--ap-accent)]">
        {{ guestName }}
      </p>

      <div v-if="hasPersonalization" class="ap-divider" />

      <h1 class="ap-script mt-2 text-4xl leading-tight text-[var(--ap-accent)] sm:text-5xl">
        {{ displayTitle }}
      </h1>

      <p v-if="hostNames.length >= 2" class="mt-3 text-xs tracking-[0.18em] text-[var(--ap-muted)]">
        {{ invitation.title }}
      </p>

      <div class="ap-divider" />

      <p v-if="primaryEvent" class="text-sm tracking-wide text-[var(--ap-ink)]">
        {{ formatDateId(primaryEvent.date) }}
      </p>
      <p v-if="primaryEvent?.venueName" class="mt-1 text-xs text-[var(--ap-muted)]">
        {{ primaryEvent.venueName }}
      </p>

      <button type="button" class="ap-btn mt-9 min-w-[200px]" @click="emit('open')">
        Buka Undangan
      </button>
      <p class="mt-4 text-[11px] tracking-wide text-[var(--ap-muted)]">
        Ketuk untuk membuka kabar bahagia
      </p>
    </div>
  </section>
</template>
