<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { invitationAnalyticsQueryOptions } from '~/queries/invitations'
import { waStatusClasses, waStatusLabel } from '~/utils/invitationDisplay'

definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

const route = useRoute()
const invitationId = computed(() => String(route.params.id))
const { invitation } = useInvitationById(invitationId)

useSeoMeta({
  title: computed(() =>
    invitation.value ? `Analitik – ${invitation.value.title}` : 'Analitik Undangan',
  ),
})

const analyticsQuery = useQuery(() => ({
  ...invitationAnalyticsQueryOptions(invitationId.value),
  enabled: Boolean(invitationId.value),
}))

const analytics = computed(() => analyticsQuery.data.value?.data)
</script>

<template>
  <div>
    <DashboardHeader
      title="Analitik Undangan"
      :subtitle="invitation?.title || 'Ringkasan RSVP & pengiriman WhatsApp'"
    />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <NuxtLink
          :to="`/dashboard/undangan/${invitationId}`"
          class="inline-flex items-center gap-1 text-sm font-medium text-samasta-burgundy"
        >
          <span aria-hidden="true">←</span> Kembali ke undangan
        </NuxtLink>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            :to="`/dashboard/undangan/${invitationId}/check-in`"
            class="btn-secondary !px-4 !py-2 text-xs"
          >
            Check-in venue
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/undangan/${invitationId}/rsvp`"
            class="btn-secondary !px-4 !py-2 text-xs"
          >
            Kelola tamu
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="analyticsQuery.isLoading.value"
        class="rounded-2xl border border-samasta-burgundy/10 bg-white px-4 py-10 text-center text-sm text-samasta-muted"
      >
        Memuat analitik...
      </div>

      <template v-else-if="analytics">
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
            <p class="text-[11px] text-samasta-muted">Diundang</p>
            <p class="mt-1 font-display text-2xl font-semibold text-samasta-burgundy">
              {{ analytics.invited }}
            </p>
          </div>
          <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
            <p class="text-[11px] text-samasta-muted">Kursi</p>
            <p class="mt-1 font-display text-2xl font-semibold text-samasta-charcoal">
              {{ analytics.seats }}
            </p>
          </div>
          <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
            <p class="text-[11px] text-samasta-muted">Ucapan</p>
            <p class="mt-1 font-display text-2xl font-semibold text-samasta-burgundy">
              {{ analytics.wishes }}
            </p>
          </div>
          <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
            <p class="text-[11px] text-samasta-muted">Check-in</p>
            <p class="mt-1 font-display text-2xl font-semibold text-samasta-burgundy">
              {{ analytics.checkedIn }}
            </p>
          </div>
          <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
            <p class="text-[11px] text-samasta-muted">WA terkirim</p>
            <p class="mt-1 font-display text-2xl font-semibold text-green-700">
              {{ analytics.wa.terkirim }}
            </p>
          </div>
        </div>

        <section class="rounded-2xl border border-samasta-burgundy/10 bg-white p-4 sm:p-5">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">
            Kehadiran di venue
          </h3>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <div class="rounded-xl bg-green-50 px-3 py-3">
              <p class="text-[11px] text-green-700">RSVP Hadir</p>
              <p class="mt-1 text-2xl font-semibold text-green-800">{{ analytics.rsvp.hadir }}</p>
            </div>
            <div class="rounded-xl bg-samasta-cream px-3 py-3">
              <p class="text-[11px] text-samasta-muted">Sudah check-in</p>
              <p class="mt-1 text-2xl font-semibold text-samasta-burgundy">{{ analytics.checkedIn }}</p>
            </div>
          </div>
          <p class="mt-3 text-xs text-samasta-muted">
            Check-in dihitung dari scan QR / mark manual di pintu masuk, terpisah dari konfirmasi RSVP.
          </p>
        </section>

        <section class="rounded-2xl border border-samasta-burgundy/10 bg-white p-4 sm:p-5">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Status RSVP</h3>
          <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div class="rounded-xl bg-green-50 px-3 py-3">
              <p class="text-[11px] text-green-700">Hadir</p>
              <p class="mt-1 text-2xl font-semibold text-green-800">{{ analytics.rsvp.hadir }}</p>
            </div>
            <div class="rounded-xl bg-rose-50 px-3 py-3">
              <p class="text-[11px] text-rose-700">Tidak</p>
              <p class="mt-1 text-2xl font-semibold text-rose-800">{{ analytics.rsvp.tidak }}</p>
            </div>
            <div class="rounded-xl bg-amber-50 px-3 py-3">
              <p class="text-[11px] text-amber-700">Ragu</p>
              <p class="mt-1 text-2xl font-semibold text-amber-800">{{ analytics.rsvp.ragu }}</p>
            </div>
            <div class="rounded-xl bg-samasta-cream px-3 py-3">
              <p class="text-[11px] text-samasta-muted">Belum</p>
              <p class="mt-1 text-2xl font-semibold text-samasta-charcoal">{{ analytics.rsvp.belum }}</p>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-samasta-burgundy/10 bg-white p-4 sm:p-5">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Pengiriman WhatsApp</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="item in [
                { key: 'terkirim', value: analytics.wa.terkirim },
                { key: 'gagal', value: analytics.wa.gagal },
                { key: 'pending', value: analytics.wa.pending },
                { key: 'belum', value: analytics.wa.belum },
              ]"
              :key="item.key"
              class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
              :class="waStatusClasses(item.key)"
            >
              {{ waStatusLabel(item.key) }}: {{ item.value }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-samasta-cream px-3 py-1.5 text-xs font-semibold text-samasta-muted">
              Tanpa nomor: {{ analytics.wa.noPhone }}
            </span>
          </div>
          <p class="mt-3 text-xs text-samasta-muted">
            Blast Fonnte tersedia di halaman RSVP. Pastikan token Fonnte sudah diisi di pengaturan admin GSJ Store.
          </p>
        </section>
      </template>
    </div>
  </div>
</template>
