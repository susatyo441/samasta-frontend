<script setup lang="ts">
const props = defineProps<{
  moduleId: string | null
  invitation: Record<string, any> | null
}>()

const emit = defineEmits<{
  close: []
}>()

const titleMap: Record<string, string> = {
  hosts: 'Edit Host / Pengantin',
  theme: 'Pilih Tema',
  events: 'Detail Acara',
  gallery: 'Galeri',
  music: 'Musik Latar',
  messages: 'Ucapan Tamu',
  gift: 'Pengaturan Kado',
  rsvp: 'Data RSVP',
  streaming: 'Live Streaming',
  story: 'Cerita / Kisah',
  'ig-story': 'Story Instagram',
  quote: 'Quote',
  settings: 'Pengaturan',
  guestbook: 'Buku Tamu',
  share: 'Kirim Undangan',
  'event-planner': 'Event Planner',
}

const whatsappShareUrl = computed(() => {
  if (!props.invitation?.publicUrl) return '#'
  const link = import.meta.client
    ? `${window.location.origin}${props.invitation.publicUrl}`
    : props.invitation.publicUrl
  const text = `Halo, kamu diundang! Buka undangan: ${link}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})
</script>

<template>
  <div
    v-if="moduleId && invitation"
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <div class="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-3xl sm:p-6">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">
            {{ titleMap[moduleId] || 'Edit' }}
          </h3>
          <p class="mt-1 text-xs text-samasta-muted">Dummy editor — data contoh siap diubah nanti.</p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <div v-if="moduleId === 'hosts'" class="space-y-3">
        <div
          v-for="(host, idx) in invitation.hosts"
          :key="idx"
          class="rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/70 p-4"
        >
          <label class="text-xs font-medium text-samasta-muted">Nama</label>
          <input :value="host.name" class="mt-1 w-full rounded-xl border border-samasta-burgundy/10 bg-white px-3 py-2 text-sm" readonly>
          <label class="mt-3 block text-xs font-medium text-samasta-muted">Peran</label>
          <input :value="host.role" class="mt-1 w-full rounded-xl border border-samasta-burgundy/10 bg-white px-3 py-2 text-sm" readonly>
        </div>
      </div>

      <div v-else-if="moduleId === 'events'" class="space-y-3">
        <div
          v-for="(event, idx) in invitation.events"
          :key="idx"
          class="rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/70 p-4"
        >
          <p class="font-medium text-samasta-burgundy">{{ event.name }}</p>
          <p class="mt-1 text-sm text-samasta-muted">{{ event.date }} · {{ event.startTime }}–{{ event.endTime }}</p>
          <p class="mt-2 text-sm">{{ event.venueName }}</p>
          <p class="text-xs text-samasta-muted">{{ event.venueAddress }}</p>
        </div>
      </div>

      <div v-else-if="moduleId === 'gallery'" class="grid grid-cols-2 gap-3">
        <div
          v-for="item in invitation.gallery"
          :key="item.id"
          class="aspect-square rounded-2xl bg-gradient-to-br from-samasta-cream-dark to-rose-100 p-3 text-center text-xs text-samasta-burgundy"
        >
          <p class="mt-8 font-medium">{{ item.label }}</p>
          <p class="mt-1 opacity-70">{{ item.type }}</p>
        </div>
      </div>

      <div v-else-if="moduleId === 'music'" class="rounded-2xl bg-samasta-cream p-4">
        <p class="text-sm text-samasta-muted">Lagu saat ini</p>
        <p class="mt-1 font-medium text-samasta-burgundy">{{ invitation.music?.title }}</p>
        <p class="mt-3 text-xs text-samasta-muted">Autoplay: {{ invitation.music?.autoplay ? 'Aktif' : 'Nonaktif' }}</p>
      </div>

      <div v-else-if="moduleId === 'messages'" class="space-y-3">
        <div
          v-for="guest in invitation.guests.filter((g: any) => g.message)"
          :key="guest.id"
          class="rounded-2xl border border-samasta-burgundy/10 p-4"
        >
          <p class="font-medium">{{ guest.name }}</p>
          <p class="mt-1 text-sm text-samasta-muted">{{ guest.message }}</p>
        </div>
      </div>

      <div v-else-if="moduleId === 'gift'" class="space-y-3 text-sm">
        <p>Amplop Digital: <strong>{{ invitation.gift.cashlessEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
        <p>Kirim ke Alamat: <strong>{{ invitation.gift.shippingEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
        <p>Wishlist: <strong>{{ invitation.gift.wishlistEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
        <div v-for="(acc, i) in invitation.gift.bankAccounts" :key="i" class="rounded-xl bg-samasta-cream p-3">
          {{ acc.bankName }} · {{ acc.accountNumber }} · {{ acc.accountHolder }}
        </div>
      </div>

      <div v-else-if="moduleId === 'rsvp'" class="space-y-2">
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
            :class="{
              'bg-green-100 text-green-700': guest.rsvp === 'hadir',
              'bg-amber-100 text-amber-700': guest.rsvp === 'belum',
              'bg-rose-100 text-rose-700': guest.rsvp === 'tidak',
            }"
          >
            {{ guest.rsvp }}
          </span>
        </div>
      </div>

      <div v-else-if="moduleId === 'story'" class="space-y-3">
        <div
          v-for="(item, idx) in invitation.loveStory"
          :key="idx"
          class="rounded-2xl border-l-4 border-samasta-gold bg-samasta-cream p-4"
        >
          <p class="text-xs font-semibold text-samasta-gold">{{ item.year }}</p>
          <p class="mt-1 font-medium text-samasta-burgundy">{{ item.title }}</p>
          <p class="mt-1 text-sm text-samasta-muted">{{ item.description }}</p>
        </div>
        <p v-if="!invitation.loveStory?.length" class="text-sm text-samasta-muted">Belum ada cerita.</p>
      </div>

      <div v-else-if="moduleId === 'quote'" class="rounded-2xl bg-samasta-cream p-5 text-center">
        <p class="font-display text-xl italic text-samasta-burgundy">“{{ invitation.quote }}”</p>
      </div>

      <div v-else-if="moduleId === 'share'" class="space-y-3">
        <div class="rounded-2xl bg-samasta-cream p-4">
          <p class="text-xs text-samasta-muted">Link undangan</p>
          <p class="mt-1 break-all text-sm font-medium text-samasta-burgundy">{{ invitation.publicUrl }}</p>
        </div>
        <NuxtLink :to="invitation.publicUrl" target="_blank" class="btn-primary block w-full text-center">
          Lihat Halaman Undangan
        </NuxtLink>
        <a
          :href="whatsappShareUrl"
          target="_blank"
          class="btn-secondary block w-full text-center"
        >
          Kirim via WhatsApp
        </a>
      </div>

      <div v-else class="rounded-2xl bg-samasta-cream p-4 text-sm text-samasta-muted">
        Modul <strong>{{ moduleId }}</strong> untuk undangan
        <strong>{{ invitation.title }}</strong> siap diisi. Ini tampilan dummy untuk alur edit.
      </div>

      <button type="button" class="btn-primary mt-5 w-full" @click="emit('close')">
        Simpan Perubahan (Dummy)
      </button>
    </div>
  </div>
</template>
