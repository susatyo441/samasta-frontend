<script setup lang="ts">
defineProps<{
  token: string
  guestName?: string
}>()
</script>

<template>
  <div class="inv-section-card text-center">
    <h2 class="inv-section-title">QR Check-in</h2>
    <p class="mt-2 text-sm text-samasta-muted">
      Tunjukkan kode ini di pintu masuk acara
      <span v-if="guestName">
        untuk <strong class="text-samasta-charcoal">{{ guestName }}</strong>
      </span>.
    </p>
    <div class="mt-5">
      <InvitationGuestCheckInQrCode :token="token" />
    </div>
  </div>
</template>

<style src="./sections.css"></style>
