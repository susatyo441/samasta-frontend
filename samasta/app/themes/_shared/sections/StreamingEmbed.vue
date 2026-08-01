<script setup lang="ts">
import { isYoutubeUrl, youtubeEmbedUrl } from '~/utils/youtubeEmbed'

const props = defineProps<{
  url: string
}>()

const embedUrl = computed(() => youtubeEmbedUrl(props.url))
const isYoutube = computed(() => isYoutubeUrl(props.url))
</script>

<template>
  <div class="inv-section-card text-center">
    <p class="text-[10px] uppercase tracking-[0.22em] text-samasta-muted">Live Streaming</p>

    <div v-if="embedUrl" class="inv-streaming-embed mt-4">
      <iframe
        :src="embedUrl"
        class="inv-streaming-embed__frame"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        title="Live streaming"
      />
    </div>

    <a
      v-if="url"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="inv-section-btn mt-4 inline-flex !w-auto !px-6"
    >
      {{ embedUrl ? 'Buka di tab baru' : 'Tonton Live' }}
    </a>

    <p v-if="url && !isYoutube" class="mt-2 text-xs text-samasta-muted">
      Platform ini akan dibuka di tab baru.
    </p>
  </div>
</template>

<style src="./sections.css"></style>

<style scoped>
.inv-streaming-embed {
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgb(122 46 58 / 0.12);
}

.inv-streaming-embed__frame {
  display: block;
  aspect-ratio: 16 / 9;
  width: 100%;
  border: 0;
}
</style>
