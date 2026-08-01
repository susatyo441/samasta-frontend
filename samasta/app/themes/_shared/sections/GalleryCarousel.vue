<script setup lang="ts">
import type { InvitationMedia } from '~/types'

defineProps<{
  items: InvitationMedia[]
}>()

function mediaStyle(url?: string) {
  if (!url) return undefined
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
</script>

<template>
  <div v-if="items.length" class="space-y-3">
    <h2 class="cp-section-title">Galeri</h2>

    <div
      class="inv-gallery-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
      role="region"
      aria-label="Galeri foto"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-sm border border-[var(--cp-line)] bg-[var(--cp-cream)] sm:w-[46%]"
        :style="mediaStyle(item.url)"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div class="absolute inset-x-0 bottom-0 z-10 p-3">
          <p class="text-xs font-medium text-white">{{ item.label || 'Momen' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inv-gallery-scroll {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}
</style>
