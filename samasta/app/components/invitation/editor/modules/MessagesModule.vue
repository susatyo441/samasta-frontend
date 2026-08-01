<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

const messages = computed(() => (props.invitation.guests || []).filter((guest) => guest.message))
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="guest in messages"
      :key="guest.id"
      class="rounded-2xl border border-samasta-burgundy/10 p-4"
    >
      <p class="font-medium">{{ guest.name }}</p>
      <p class="mt-1 text-sm text-samasta-muted">{{ guest.message }}</p>
    </div>
  </div>
</template>
