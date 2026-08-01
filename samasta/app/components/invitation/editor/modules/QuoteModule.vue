<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="rounded-2xl bg-samasta-cream p-5 text-center">
    <p class="font-display text-xl italic text-samasta-burgundy">“{{ invitation.quote }}”</p>
  </div>
</template>
