<script setup lang="ts">
import type { Invitation } from '~/types'
import {
  eventTypeHeaderLabel,
  eventTypeHostsLabel,
  eventTypeStoryLabel,
} from '~/utils/invitationDisplay'
import { formatDateId } from '~/utils/formatDate'
import { initials } from '~/utils/initials'
import { useInvitationSections } from '~/themes/_shared/composables/useInvitationSections'
import RsvpForm from '~/themes/_shared/sections/RsvpForm.vue'
import WishList from '~/themes/_shared/sections/WishList.vue'
import GiftAccounts from '~/themes/_shared/sections/GiftAccounts.vue'
import MusicToggle from '~/themes/_shared/sections/MusicToggle.vue'
import StreamingEmbed from '~/themes/_shared/sections/StreamingEmbed.vue'
import MapsEmbed from '~/themes/_shared/sections/MapsEmbed.vue'
import VendorCredits from '~/themes/_shared/sections/VendorCredits.vue'
import GalleryCarousel from '~/themes/_shared/sections/GalleryCarousel.vue'
import OrnamentField from './OrnamentField.vue'

const props = defineProps<{
  invitation: Invitation
  musicPlaying?: boolean
}>()

const emit = defineEmits<{
  'toggle-music': []
}>()

const {
  gift,
  guestMessages,
  coverUrl,
  galleryItems,
  primaryEvent,
  showCountdown,
  showGuestBook,
} = useInvitationSections(() => props.invitation)

const now = useNow({ interval: 1000 })

const countdown = computed(() => {
  if (!showCountdown.value || !primaryEvent.value?.date) return null
  const target = new Date(`${primaryEvent.value.date}T${primaryEvent.value.startTime || '00:00'}:00`)
  if (Number.isNaN(target.getTime())) return null
  const diff = Math.max(0, target.getTime() - now.value.getTime())
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
})

const hostPairs = computed(() => props.invitation.hosts || [])

const displayTitle = computed(() => {
  const names = hostPairs.value.map((host) => host.name).filter(Boolean)
  if (names.length >= 2) return names.slice(0, 2).join(' & ')
  return props.invitation.title
})
</script>

<template>
  <div class="relative mx-auto min-h-screen max-w-md overflow-hidden pb-20">
    <OrnamentField compact />

    <header class="relative px-5 pb-10 pt-14 text-center">
      <div class="cp-frame cp-fade-up mx-auto max-w-sm px-5 py-8">
        <div class="cp-ornament mb-4">Janur</div>
        <p class="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--cp-muted)]">
          {{ eventTypeHeaderLabel(invitation.eventType) }}
        </p>

        <div
          v-if="coverUrl"
          class="mx-auto mt-5 aspect-[4/5] w-40 overflow-hidden rounded-sm border border-[var(--cp-line)]"
        >
          <img :src="coverUrl" :alt="invitation.title" class="h-full w-full object-cover">
        </div>

        <div class="cp-divider" />
        <h1 class="cp-script text-4xl leading-tight text-[var(--cp-burgundy)]">
          {{ displayTitle }}
        </h1>
        <p
          v-if="invitation.greeting"
          class="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[var(--cp-muted)]"
        >
          {{ invitation.greeting }}
        </p>
      </div>
    </header>

    <section class="relative z-10 space-y-6 px-5">
      <div v-if="countdown" class="cp-card cp-fade-up-delay grid grid-cols-4 gap-2 text-center !py-4">
        <div
          v-for="unit in [
            { label: 'Hari', value: countdown.days },
            { label: 'Jam', value: countdown.hours },
            { label: 'Menit', value: countdown.minutes },
            { label: 'Detik', value: countdown.seconds },
          ]"
          :key="unit.label"
        >
          <p class="font-display text-2xl font-semibold text-[var(--cp-burgundy)]">{{ unit.value }}</p>
          <p class="text-[10px] uppercase tracking-wider text-[var(--cp-muted)]">{{ unit.label }}</p>
        </div>
      </div>

      <div v-if="hostPairs.length" class="cp-card cp-fade-up">
        <div class="cp-ornament mb-2">Mempelai</div>
        <h2 class="cp-section-title">{{ eventTypeHostsLabel(invitation.eventType) }}</h2>
        <div class="mt-5 space-y-5">
          <div
            v-for="(host, idx) in hostPairs"
            :key="`${host.name}-${idx}`"
            class="text-center"
          >
            <div
              class="mx-auto mb-3 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[var(--cp-line)] bg-[var(--cp-cream)] font-display text-xl text-[var(--cp-burgundy)]"
            >
              {{ initials(host.name) }}
            </div>
            <p class="cp-script text-3xl text-[var(--cp-ink)]">{{ host.name }}</p>
            <p v-if="host.role" class="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--cp-muted)]">
              {{ host.role }}
            </p>
            <div v-if="idx < hostPairs.length - 1" class="cp-divider my-5" />
          </div>
        </div>
      </div>

      <blockquote
        v-if="invitation.quote"
        class="cp-card cp-fade-up border-[var(--cp-gold)] bg-[linear-gradient(160deg,#f7f1e8,#efe4d2)] text-center"
      >
        <p class="cp-script text-xl leading-relaxed text-[var(--cp-burgundy)]">
          “{{ invitation.quote }}”
        </p>
      </blockquote>

      <div v-if="invitation.events?.length" class="space-y-3 cp-fade-up">
        <h2 class="cp-section-title">Detail Acara</h2>
        <article
          v-for="(event, idx) in invitation.events"
          :key="idx"
          class="cp-card text-center"
        >
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--cp-gold-deep)]">
            {{ event.name }}
          </p>
          <p class="mt-2 font-medium">{{ formatDateId(event.date) }}</p>
          <p v-if="event.startTime || event.endTime" class="mt-1 text-sm text-[var(--cp-muted)]">
            {{ event.startTime || '—' }} – {{ event.endTime || '—' }}
          </p>
          <div class="cp-divider" />
          <p v-if="event.venueName" class="font-medium text-[var(--cp-burgundy)]">{{ event.venueName }}</p>
          <p v-if="event.venueAddress" class="mt-1 text-sm text-[var(--cp-muted)]">{{ event.venueAddress }}</p>
          <MapsEmbed :embed-url="event.mapsEmbedUrl" />
          <a
            v-if="event.mapsUrl"
            :href="event.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="cp-btn-secondary mt-4 inline-flex !py-2 text-xs"
          >
            Buka Maps
          </a>
        </article>
      </div>

      <div v-if="invitation.loveStory?.length" class="space-y-3 cp-fade-up">
        <h2 class="cp-section-title">{{ eventTypeStoryLabel(invitation.eventType) }}</h2>
        <article
          v-for="(item, idx) in invitation.loveStory"
          :key="idx"
          class="cp-card border-l-[3px] border-l-[var(--cp-gold)]"
        >
          <p v-if="item.year" class="text-xs font-semibold tracking-wide text-[var(--cp-gold-deep)]">
            {{ item.year }}
          </p>
          <p v-if="item.title" class="mt-1 font-medium">{{ item.title }}</p>
          <p v-if="item.description" class="mt-1 text-sm text-[var(--cp-muted)]">{{ item.description }}</p>
        </article>
      </div>

      <GalleryCarousel :items="galleryItems" class="cp-fade-up" />

      <MusicToggle
        class="cp-fade-up"
        :title="invitation.music?.title"
        :url="invitation.music?.url"
        :playing="musicPlaying"
        @toggle="emit('toggle-music')"
      />

      <StreamingEmbed v-if="invitation.streamingUrl" :url="invitation.streamingUrl" class="cp-fade-up" />

      <GiftAccounts :gift="gift" class="cp-fade-up" />
      <RsvpForm
        :slug="invitation.slug"
        :invitation="invitation"
        :deadline="invitation.rsvpDeadline"
        class="cp-fade-up"
      />
      <WishList
        v-if="showGuestBook"
        :slug="invitation.slug"
        :messages="guestMessages"
        class="cp-fade-up"
      />

      <VendorCredits
        v-if="invitation.managers?.length"
        :vendors="invitation.managers"
        class="cp-fade-up"
      />

      <p class="pt-2 text-center text-[11px] tracking-wide text-[var(--cp-muted)]">
        Dibuat dengan
        <NuxtLink to="/" class="font-semibold text-[var(--cp-burgundy)]">Samasta</NuxtLink>
      </p>
    </section>
  </div>
</template>
