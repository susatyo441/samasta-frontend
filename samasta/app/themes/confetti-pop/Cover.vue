<script setup lang="ts">
import type { Invitation } from '~/types'
import { eventTypeCoverLabel } from '~/utils/invitationDisplay'
import { formatDateId } from '~/utils/formatDate'
import { useInvitationSections } from '~/themes/_shared/composables/useInvitationSections'
import { usePublicGuestContext } from '~/themes/_shared/composables/usePublicGuestContext'
import CoverPortrait from './CoverPortrait.vue'

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

const coupleNames = computed(() => {
  if (hostNames.value.length >= 2) return hostNames.value.slice(0, 2)
  const parts = props.invitation.title
    .split(/\s*&\s*|\s+dan\s+/i)
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length >= 2) return parts.slice(0, 2)
  return [props.invitation.title]
})

const shortNames = computed(() =>
  coupleNames.value.map((name) => name.split(/\s+/)[0]).join(' & '),
)
</script>

<template>
  <section class="cp-cover relative flex min-h-[100dvh] items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8 sm:px-6 sm:py-10">
    <!-- Soft parchment page bg (not illustrated scene) -->
    <div class="cp-cover-page absolute inset-0" aria-hidden="true" />

    <!-- Gebyok arch — pops first -->
    <svg
      class="cp-stagger cp-stagger-1 pointer-events-none absolute inset-x-0 top-0 z-20 w-full max-h-[18vh] sm:max-h-[140px]"
      viewBox="0 0 390 120"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cpWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5a3a28" />
          <stop offset="50%" stop-color="#3f2619" />
          <stop offset="100%" stop-color="#2a1810" />
        </linearGradient>
      </defs>
      <path fill="url(#cpWood)" d="M0 0 H390 V38 C320 38 300 78 195 86 C90 78 70 38 0 38 Z" />
      <path
        fill="none"
        stroke="#c4a574"
        stroke-width="1.4"
        d="M18 34 C90 34 110 70 195 76 C280 70 300 34 372 34"
        opacity="0.7"
      />
      <g fill="#2a1810" opacity="0.5">
        <circle cx="70" cy="28" r="7" />
        <circle cx="110" cy="42" r="6" />
        <circle cx="150" cy="52" r="7" />
        <circle cx="195" cy="56" r="8" />
        <circle cx="240" cy="52" r="7" />
        <circle cx="280" cy="42" r="6" />
        <circle cx="320" cy="28" r="7" />
      </g>
    </svg>

    <div
      class="relative z-10 mx-auto flex w-full max-w-[26rem] flex-col items-center pt-[min(16vw,5.5rem)] sm:max-w-md sm:pt-24"
    >
      <!-- Title block -->
      <div class="cp-stagger cp-stagger-2 w-full text-center">
        <p class="font-display text-[clamp(0.7rem,2.8vw,0.85rem)] tracking-[0.18em] text-[#5c2a2a]">
          {{ eventTypeCoverLabel(invitation.eventType) }}
        </p>
        <h1 class="cp-cover-names mt-1 leading-[1.05] text-[#5c2a2a]">
          <template v-if="coupleNames.length >= 2">
            <span class="block">{{ coupleNames[0] }}</span>
            <span class="cp-cover-ampersand mx-1">&</span>
            <span class="block">{{ coupleNames[1] }}</span>
          </template>
          <span v-else class="block">{{ coupleNames[0] }}</span>
        </h1>
      </div>

      <!-- Portrait + Javanese frame as one cover picture unit -->
      <div class="cp-stagger cp-stagger-3 mt-3 w-[min(78vw,18.5rem)] sm:mt-4 sm:w-[19rem]">
        <CoverPortrait
          :photo-url="coverUrl"
          :alt="invitation.title"
          :placeholder="shortNames"
        />
      </div>

      <!-- Guest -->
      <div v-if="hasPersonalization" class="cp-stagger cp-stagger-4 mt-3 text-center sm:mt-4">
        <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c2a2a]/90">
          Kepada Yth.
        </p>
        <p class="font-script text-[clamp(1.35rem,5vw,1.75rem)] text-[#5c2a2a]">{{ guestName }}</p>
      </div>

      <!-- Date / venue -->
      <div class="cp-stagger cp-stagger-5 mt-2 text-center">
        <p v-if="primaryEvent" class="text-[clamp(0.8rem,3vw,0.95rem)] text-[#3d3229]">
          {{ formatDateId(primaryEvent.date) }}
        </p>
        <p v-if="primaryEvent?.venueName" class="mt-0.5 text-[clamp(0.7rem,2.6vw,0.8rem)] text-[#5c2a2a]/80">
          {{ primaryEvent.venueName }}
        </p>
      </div>

      <!-- CTA -->
      <div class="cp-stagger cp-stagger-6 mt-6 flex w-full flex-col items-center sm:mt-8">
        <button type="button" class="cp-cover-btn" @click="emit('open')">
          Buka Undangan
        </button>
        <p class="mt-3 text-[clamp(0.65rem,2.4vw,0.72rem)] tracking-wide text-[#6b2f2f]/75">
          Ketuk untuk membuka kabar bahagia
        </p>
      </div>
    </div>
  </section>
</template>
