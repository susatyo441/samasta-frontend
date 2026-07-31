<script setup lang="ts">
defineProps<{
  guests: number
  attending: number
  messages: number
}>()
</script>

<template>
  <div class="grid grid-cols-3 gap-2 sm:gap-3">
    <div class="dash-card text-center">
      <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">{{ guests }}</p>
      <p class="mt-1 text-[11px] text-samasta-muted sm:text-xs">Tamu</p>
    </div>
    <div class="dash-card text-center">
      <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">{{ attending }}</p>
      <p class="mt-1 text-[11px] text-samasta-muted sm:text-xs">Akan Hadir</p>
    </div>
    <div class="dash-card text-center">
      <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">{{ messages }}</p>
      <p class="mt-1 text-[11px] text-samasta-muted sm:text-xs">Ucapan</p>
    </div>
  </div>
</template>
