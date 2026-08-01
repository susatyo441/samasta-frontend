<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { invitation: invite, query } = usePublicInvitation(slug)

const opened = ref(false)
const rsvpName = ref('')
const rsvpStatus = ref<'hadir' | 'tidak' | 'ragu'>('hadir')
const wishName = ref('')
const wishMessage = ref('')
const wishSent = ref(false)
const rsvpSent = ref(false)

const loadError = computed(() => {
  if (query.error.value) return 'Undangan tidak ditemukan atau belum dipublikasikan.'
  return ''
})

const isLoading = computed(() => {
  const asyncStatus = (query as { asyncStatus?: { value: string } }).asyncStatus?.value
  if (asyncStatus) return asyncStatus === 'loading'
  return query.status.value === 'pending'
})

const showNotFound = computed(() => !isLoading.value && (Boolean(loadError.value) || !invite.value))

const guestMessages = computed(() =>
  (invite.value?.guests || []).filter((guest) => guest.message),
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function submitRsvp() {
  if (!rsvpName.value.trim()) return
  rsvpSent.value = true
}

function submitWish() {
  if (!wishName.value.trim() || !wishMessage.value.trim()) return
  wishSent.value = true
}

useSeoMeta({
  title: computed(() => (invite.value ? `${invite.value.title} – Samasta` : 'Undangan tidak ditemukan')),
  description: computed(() => invite.value?.greeting || 'Undangan digital Samasta'),
})
</script>

<template>
  <div v-if="isLoading" class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 text-center">
    <p class="text-samasta-muted">Memuat undangan...</p>
  </div>

  <div v-else-if="showNotFound" class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 text-center">
    <div>
      <p class="font-display text-3xl text-samasta-burgundy">{{ loadError || 'Undangan tidak ditemukan' }}</p>
      <NuxtLink to="/" class="btn-primary mt-6 inline-flex">Kembali ke Beranda</NuxtLink>
    </div>
  </div>

  <div v-else class="min-h-screen bg-samasta-cream text-samasta-charcoal">
    <!-- Cover / Opening -->
    <section
      v-if="!opened"
      class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      :class="`bg-gradient-to-br ${invite.coverGradient}`"
    >
      <div class="absolute inset-0 bg-white/30" />
      <div class="relative z-10 max-w-sm">
        <p class="text-xs uppercase tracking-[0.25em] text-samasta-muted">
          {{ invite.eventType === 'wedding' ? 'The Wedding Of' : invite.eventType === 'birthday' ? 'Birthday Invitation' : 'You Are Invited' }}
        </p>
        <h1 class="mt-4 font-display text-5xl font-semibold leading-tight text-samasta-burgundy">
          {{ invite.title }}
        </h1>
        <p class="mt-4 text-sm text-samasta-muted">
          {{ invite.events[0] ? formatDate(invite.events[0].date) : '' }}
        </p>
        <button type="button" class="btn-primary mt-10 min-w-[200px]" @click="opened = true">
          Buka Undangan
        </button>
        <p class="mt-4 text-[11px] text-samasta-muted">Ketuk untuk membuka undangan</p>
      </div>
    </section>

    <!-- Invitation Content -->
    <div v-else class="mx-auto max-w-md pb-16">
      <header class="relative overflow-hidden px-6 pb-12 pt-16 text-center" :class="`bg-gradient-to-br ${invite.coverGradient}`">
        <p class="text-xs uppercase tracking-[0.2em] text-samasta-muted">
          {{ invite.eventType === 'wedding' ? 'Undangan Pernikahan' : invite.eventType === 'birthday' ? 'Undangan Ulang Tahun' : 'Undangan Acara' }}
        </p>
        <h1 class="mt-3 font-display text-4xl font-semibold text-samasta-burgundy">{{ invite.title }}</h1>
        <p class="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-samasta-muted">{{ invite.greeting }}</p>
      </header>

      <section class="space-y-8 px-5 py-8">
        <!-- Hosts -->
        <div class="rounded-3xl bg-white p-5 shadow-sm">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">
            {{ invite.eventType === 'wedding' ? 'Mempelai' : 'Yang Merayakan' }}
          </h2>
          <div class="mt-5 space-y-4">
            <div v-for="(host, idx) in invite.hosts" :key="idx" class="text-center">
              <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-samasta-cream-dark font-display text-xl text-samasta-burgundy">
                {{ initials(host.name) }}
              </div>
              <p class="font-display text-xl font-semibold text-samasta-charcoal">{{ host.name }}</p>
              <p class="text-xs text-samasta-muted">{{ host.role }}</p>
            </div>
          </div>
        </div>

        <!-- Quote -->
        <div v-if="invite.quote" class="rounded-3xl bg-samasta-burgundy px-6 py-8 text-center text-white shadow-soft">
          <p class="font-display text-xl italic leading-relaxed">“{{ invite.quote }}”</p>
        </div>

        <!-- Events -->
        <div class="space-y-3">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">Detail Acara</h2>
          <article
            v-for="(event, idx) in invite.events"
            :key="idx"
            class="rounded-3xl border border-samasta-burgundy/10 bg-white p-5 shadow-sm"
          >
            <p class="text-xs font-semibold uppercase tracking-wider text-samasta-gold">{{ event.name }}</p>
            <p class="mt-2 font-medium">{{ formatDate(event.date) }}</p>
            <p class="mt-1 text-sm text-samasta-muted">{{ event.startTime }} – {{ event.endTime }}</p>
            <p class="mt-3 font-medium text-samasta-burgundy">{{ event.venueName }}</p>
            <p class="mt-1 text-sm text-samasta-muted">{{ event.venueAddress }}</p>
            <a
              v-if="event.mapsUrl"
              :href="event.mapsUrl"
              target="_blank"
              class="btn-secondary mt-4 inline-flex !py-2 text-xs"
            >
              Buka Maps
            </a>
          </article>
        </div>

        <!-- Story -->
        <div v-if="invite.loveStory?.length" class="space-y-3">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">
            {{ invite.eventType === 'wedding' ? 'Kisah Cinta' : 'Cerita' }}
          </h2>
          <div
            v-for="(item, idx) in invite.loveStory"
            :key="idx"
            class="rounded-3xl border-l-4 border-samasta-gold bg-white p-4 shadow-sm"
          >
            <p class="text-xs font-semibold text-samasta-gold">{{ item.year }}</p>
            <p class="mt-1 font-medium">{{ item.title }}</p>
            <p class="mt-1 text-sm text-samasta-muted">{{ item.description }}</p>
          </div>
        </div>

        <!-- Gallery -->
        <div class="space-y-3">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">Galeri</h2>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="item in invite.gallery"
              :key="item.id"
              class="flex aspect-square items-end rounded-2xl bg-gradient-to-br from-samasta-cream-dark to-rose-100 p-3"
            >
              <div>
                <p class="text-xs font-medium text-samasta-burgundy">{{ item.label }}</p>
                <p class="text-[10px] uppercase text-samasta-muted">{{ item.type }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Music -->
        <div class="rounded-3xl bg-white p-5 text-center shadow-sm">
          <p class="text-xs uppercase tracking-wider text-samasta-muted">Musik Latar</p>
          <p class="mt-2 font-medium text-samasta-burgundy">{{ invite.music.title }}</p>
        </div>

        <!-- Gift -->
        <div v-if="invite.gift.cashlessEnabled || invite.gift.wishlistEnabled" class="space-y-3">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">Kado</h2>
          <div v-if="invite.gift.cashlessEnabled" class="space-y-2">
            <div
              v-for="(acc, idx) in invite.gift.bankAccounts"
              :key="idx"
              class="rounded-3xl bg-white p-4 shadow-sm"
            >
              <p class="text-xs text-samasta-muted">Amplop Digital</p>
              <p class="mt-1 font-medium">{{ acc.bankName }}</p>
              <p class="text-sm">{{ acc.accountNumber }}</p>
              <p class="text-xs text-samasta-muted">a.n. {{ acc.accountHolder }}</p>
            </div>
          </div>
          <div v-if="invite.gift.wishlistEnabled" class="space-y-2">
            <div
              v-for="(item, idx) in invite.gift.wishlistItems"
              :key="idx"
              class="rounded-3xl bg-white p-4 shadow-sm"
            >
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-samasta-muted">Rp{{ item.price.toLocaleString('id-ID') }}</p>
            </div>
          </div>
        </div>

        <!-- RSVP -->
        <div class="rounded-3xl bg-white p-5 shadow-sm">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">Konfirmasi Kehadiran</h2>
          <p class="mt-1 text-center text-xs text-samasta-muted">
            Batas RSVP: {{ invite.rsvpDeadline ? formatDate(invite.rsvpDeadline) : '-' }}
          </p>

          <div v-if="rsvpSent" class="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            Terima kasih, konfirmasi kamu sudah tercatat (dummy).
          </div>
          <form v-else class="mt-5 space-y-3" @submit.prevent="submitRsvp">
            <input
              v-model="rsvpName"
              type="text"
              required
              placeholder="Nama lengkap"
              class="w-full rounded-2xl border border-samasta-burgundy/15 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-samasta-burgundy/30"
            >
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="opt in [
                  { id: 'hadir', label: 'Hadir' },
                  { id: 'tidak', label: 'Tidak' },
                  { id: 'ragu', label: 'Ragu' },
                ]"
                :key="opt.id"
                type="button"
                class="rounded-xl px-2 py-2.5 text-xs font-semibold"
                :class="rsvpStatus === opt.id ? 'bg-samasta-burgundy text-white' : 'bg-samasta-cream text-samasta-muted'"
                @click="rsvpStatus = opt.id as 'hadir' | 'tidak' | 'ragu'"
              >
                {{ opt.label }}
              </button>
            </div>
            <button type="submit" class="btn-primary w-full">Kirim RSVP</button>
          </form>
        </div>

        <!-- Wishes -->
        <div class="rounded-3xl bg-white p-5 shadow-sm">
          <h2 class="text-center font-display text-2xl text-samasta-burgundy">Ucapan & Doa</h2>

          <div class="mt-4 max-h-56 space-y-3 overflow-y-auto">
            <div
              v-for="guest in guestMessages"
              :key="guest.id"
              class="rounded-2xl bg-samasta-cream px-4 py-3"
            >
              <p class="text-sm font-medium">{{ guest.name }}</p>
              <p class="mt-1 text-sm text-samasta-muted">{{ guest.message }}</p>
            </div>
          </div>

          <div v-if="wishSent" class="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            Ucapan terkirim (dummy). Terima kasih!
          </div>
          <form v-else class="mt-4 space-y-3" @submit.prevent="submitWish">
            <input
              v-model="wishName"
              type="text"
              required
              placeholder="Nama"
              class="w-full rounded-2xl border border-samasta-burgundy/15 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-samasta-burgundy/30"
            >
            <textarea
              v-model="wishMessage"
              required
              rows="3"
              placeholder="Tulis ucapan..."
              class="w-full rounded-2xl border border-samasta-burgundy/15 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-samasta-burgundy/30"
            />
            <button type="submit" class="btn-primary w-full">Kirim Ucapan</button>
          </form>
        </div>

        <p class="pt-4 text-center text-[11px] text-samasta-muted">
          Dibuat dengan 💕 <NuxtLink to="/" class="font-semibold text-samasta-burgundy">Samasta</NuxtLink>
        </p>
      </section>
    </div>
  </div>
</template>
