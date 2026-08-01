<script setup lang="ts">
import type { ThemeProps } from '~/themes/types'
import Cover from './Cover.vue'
import Content from './Content.vue'
import './theme.css'

const props = defineProps<ThemeProps>()

const opened = ref(false)
const musicPlaying = ref(false)
const audioEl = ref<HTMLAudioElement | null>(null)

const musicUrl = computed(() => props.invitation.music?.url || '')

async function playMusic() {
  if (!musicUrl.value || !audioEl.value) return
  try {
    await audioEl.value.play()
    musicPlaying.value = true
  } catch {
    musicPlaying.value = false
  }
}

async function openInvitation() {
  opened.value = true
  // Same user gesture as "Buka Undangan" unlocks autoplay in browsers.
  await playMusic()
}

async function toggleMusic() {
  if (!audioEl.value || !musicUrl.value) return
  if (musicPlaying.value) {
    audioEl.value.pause()
    musicPlaying.value = false
    return
  }
  await playMusic()
}

onBeforeUnmount(() => {
  audioEl.value?.pause()
})
</script>

<template>
  <div class="theme-confetti-pop min-h-screen">
    <audio
      v-if="musicUrl"
      ref="audioEl"
      :src="musicUrl"
      loop
      preload="auto"
      class="hidden"
    />

    <Cover v-if="!opened" :invitation="invitation" @open="openInvitation" />
    <Content
      v-else
      :invitation="invitation"
      :music-playing="musicPlaying"
      @toggle-music="toggleMusic"
    />
  </div>
</template>
