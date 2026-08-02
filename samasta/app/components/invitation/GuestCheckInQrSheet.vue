<script setup lang="ts">
import type { InvitationGuest } from '~/types'

defineProps<{
  guest: InvitationGuest
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-6">
      <div class="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">QR Tamu</h3>
          <p class="mt-1 text-xs text-samasta-muted">{{ guest.name }}</p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <InvitationGuestCheckInQrCode
        v-if="guest.checkInToken"
        :token="guest.checkInToken"
        :size="160"
      />
      <p v-else class="rounded-xl bg-samasta-cream px-4 py-6 text-center text-sm text-samasta-muted">
        Token check-in belum tersedia untuk tamu ini.
      </p>
    </div>
  </div>
</template>
