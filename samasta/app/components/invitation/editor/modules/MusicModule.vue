<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

const title = ref('')
const autoplay = ref(false)
const streamingUrl = ref('')

watch(
  () => [props.invitation.music, props.invitation.streamingUrl] as const,
  ([music, url]) => {
    title.value = music?.title ?? ''
    autoplay.value = Boolean(music?.autoplay)
    streamingUrl.value = url ?? ''
  },
  { immediate: true },
)

function getPayload() {
  return {
    music: {
      title: title.value.trim() || undefined,
      autoplay: autoplay.value,
    },
    streamingUrl: streamingUrl.value.trim() || null,
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-4 rounded-2xl bg-samasta-cream p-4">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Judul lagu</label>
      <input v-model="title" class="input mt-1 w-full" placeholder="Perfect - Ed Sheeran">
    </div>

    <label class="flex items-center gap-2 text-sm">
      <input v-model="autoplay" type="checkbox" class="h-4 w-4">
      Autoplay saat undangan dibuka
    </label>

    <div>
      <label class="text-xs font-medium text-samasta-muted">Link live streaming (opsional)</label>
      <input v-model="streamingUrl" class="input mt-1 w-full" placeholder="https://youtube.com/live/...">
    </div>
  </div>
</template>
