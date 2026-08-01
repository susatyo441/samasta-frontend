<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <div
      v-for="item in invitation.gallery"
      :key="item.id"
      class="aspect-square rounded-2xl bg-gradient-to-br from-samasta-cream-dark to-rose-100 p-3 text-center text-xs text-samasta-burgundy"
    >
      <p class="mt-8 font-medium">{{ item.label }}</p>
      <p class="mt-1 opacity-70">{{ item.type }}</p>
    </div>
  </div>
</template>
