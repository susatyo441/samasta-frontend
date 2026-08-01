<script setup lang="ts">
import { resolveMapsEmbedUrl } from '~/utils/mapsEmbed'

const props = defineProps<{
  mapsUrl?: string
  venueName?: string
  venueAddress?: string
}>()

const embedUrl = computed(() =>
  resolveMapsEmbedUrl({
    mapsUrl: props.mapsUrl,
    venueName: props.venueName,
    venueAddress: props.venueAddress,
  }),
)
</script>

<template>
  <div v-if="embedUrl" class="inv-maps-embed">
    <iframe
      :src="embedUrl"
      class="inv-maps-embed__frame"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
      title="Peta lokasi acara"
    />
  </div>
</template>

<style scoped>
.inv-maps-embed {
  margin-top: 1rem;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in srgb, var(--cp-line, #d4c4b0) 80%, transparent);
}

.inv-maps-embed__frame {
  display: block;
  width: 100%;
  height: 12rem;
  border: 0;
}
</style>
