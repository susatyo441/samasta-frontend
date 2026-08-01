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
      <div class="ap-frame ap-fade-up mx-auto max-w-sm px-5 py-8">
        <div class="ap-ornament mb-4">Aurora</div>
        <p class="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ap-muted)]">
          {{ eventTypeHeaderLabel(invitation.eventType) }}
        </p>

        <div
          v-if="coverUrl"
          class="mx-auto mt-5 aspect-[4/5] w-40 overflow-hidden rounded-sm border border-[var(--ap-line)]"
        >
          <img :src="coverUrl" :alt="invitation.title" class="h-full w-full object-cover">
        </div>

        <div class="ap-divider" />
        <h1 class="ap-script text-4xl leading-tight text-[var(--ap-accent)]">
          {{ displayTitle }}
        </h1>
        <p
          v-if="invitation.greeting"
          class="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[var(--ap-muted)]"
        >
          {{ invitation.greeting }}
        </p>
      </div>
    </header>

    <section class="relative z-10 space-y-6 px-5">
      <div v-if="countdown" class="ap-card ap-fade-up-delay grid grid-cols-4 gap-2 text-center !py-4">
        <div
          v-for="unit in [
            { label: 'Hari', value: countdown.days },
            { label: 'Jam', value: countdown.hours },
            { label: 'Menit', value: countdown.minutes },
            { label: 'Detik', value: countdown.seconds },
          ]"
          :key="unit.label"
        >
          <p class="font-display text-2xl font-semibold text-[var(--ap-accent)]">{{ unit.value }}</p>
          <p class="text-[10px] uppercase tracking-wider text-[var(--ap-muted)]">{{ unit.label }}</p>
        </div>
      </div>

      <div v-if="hostPairs.length" class="ap-card ap-fade-up">
        <div class="ap-ornament mb-2">Mempelai</div>
        <h2 class="ap-section-title">{{ eventTypeHostsLabel(invitation.eventType) }}</h2>
        <div class="mt-5 space-y-5">
          <div
            v-for="(host, idx) in hostPairs"
            :key="`${host.name}-${idx}`"
            class="text-center"
          >
            <div
              class="mx-auto mb-3 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[var(--ap-line)] bg-[var(--ap-cream)] font-display text-xl text-[var(--ap-accent)]"
            >
              {{ initials(host.name) }}
            </div>
            <p class="ap-script text-3xl text-[var(--ap-ink)]">{{ host.name }}</p>
            <p v-if="host.role" class="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ap-muted)]">
              {{ host.role }}
            </p>
            <div v-if="idx < hostPairs.length - 1" class="ap-divider my-5" />
          </div>
        </div>
      </div>

      <blockquote
        v-if="invitation.quote"
        class="ap-card ap-fade-up border-[var(--ap-line)] bg-[linear-gradient(160deg,#faf5ff,#eef2ff)] text-center"
      >
        <p class="ap-script text-xl leading-relaxed text-[var(--ap-accent)]">
          “{{ invitation.quote }}”
        </p>
      </blockquote>

      <div v-if="invitation.events?.length" class="space-y-3 ap-fade-up">
        <h2 class="ap-section-title">Detail Acara</h2>
        <article
          v-for="(event, idx) in invitation.events"
          :key="idx"
          class="ap-card text-center"
        >
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ap-indigo)]">
            {{ event.name }}
          </p>
          <p class="mt-2 font-medium">{{ formatDateId(event.date) }}</p>
          <p v-if="event.startTime || event.endTime" class="mt-1 text-sm text-[var(--ap-muted)]">
            {{ event.startTime || '—' }} – {{ event.endTime || '—' }}
          </p>
          <div class="ap-divider" />
          <p v-if="event.venueName" class="font-medium text-[var(--ap-accent)]">{{ event.venueName }}</p>
          <p v-if="event.venueAddress" class="mt-1 text-sm text-[var(--ap-muted)]">{{ event.venueAddress }}</p>
          <MapsEmbed :embed-url="event.mapsEmbedUrl" />
          <a
            v-if="event.mapsUrl"
            :href="event.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="ap-btn-secondary mt-4 inline-flex !py-2 text-xs"
          >
            Buka Maps
          </a>
        </article>
      </div>

      <div v-if="invitation.loveStory?.length" class="space-y-3 ap-fade-up">
        <h2 class="ap-section-title">{{ eventTypeStoryLabel(invitation.eventType) }}</h2>
        <article
          v-for="(item, idx) in invitation.loveStory"
          :key="idx"
          class="ap-card border-l-[3px] border-l-[var(--ap-indigo)]"
        >
          <p v-if="item.year" class="text-xs font-semibold tracking-wide text-[var(--ap-indigo)]">
            {{ item.year }}
          </p>
          <p v-if="item.title" class="mt-1 font-medium">{{ item.title }}</p>
          <p v-if="item.description" class="mt-1 text-sm text-[var(--ap-muted)]">{{ item.description }}</p>
        </article>
      </div>

      <GalleryCarousel :items="galleryItems" class="ap-fade-up" />

      <MusicToggle
        class="ap-fade-up"
        :title="invitation.music?.title"
        :url="invitation.music?.url"
        :playing="musicPlaying"
        @toggle="emit('toggle-music')"
      />

      <StreamingEmbed v-if="invitation.streamingUrl" :url="invitation.streamingUrl" class="ap-fade-up" />

      <GiftAccounts :gift="gift" class="ap-fade-up" />
      <RsvpForm :slug="invitation.slug" :deadline="invitation.rsvpDeadline" class="ap-fade-up" />
      <WishList
        v-if="showGuestBook"
        :slug="invitation.slug"
        :messages="guestMessages"
        class="ap-fade-up"
      />

      <VendorCredits
        v-if="invitation.managers?.length"
        :vendors="invitation.managers"
        class="ap-fade-up"
      />

      <p class="pt-2 text-center text-[11px] tracking-wide text-[var(--ap-muted)]">
        Dibuat dengan
        <NuxtLink to="/" class="font-semibold text-[var(--ap-accent)]">Samasta</NuxtLink>
      </p>
    </section>
  </div>
</template>
