<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="space-y-3">
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
</template>
