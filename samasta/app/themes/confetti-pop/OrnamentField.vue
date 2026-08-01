<script setup lang="ts">
defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      class="cp-glow absolute -left-10 top-16 h-40 w-40 rounded-full bg-[#e8d5b5]/40 blur-3xl"
    />
    <div
      class="cp-glow absolute -right-8 bottom-24 h-48 w-48 rounded-full bg-[#c4a574]/25 blur-3xl"
      style="animation-delay: 1.2s"
    />

    <svg
      class="absolute left-3 top-8 opacity-50"
      :width="compact ? 42 : 56"
      :height="compact ? 42 : 56"
      viewBox="0 0 56 56"
      fill="none"
    >
      <path
        d="M8 40C14 28 22 18 36 12C28 22 24 30 22 42C18 36 13 38 8 40Z"
        stroke="#c4a574"
        stroke-width="1.2"
      />
      <path d="M36 12C40 18 44 22 48 24" stroke="#c4a574" stroke-width="1.2" />
    </svg>

    <svg
      class="absolute bottom-10 right-3 rotate-180 opacity-50"
      :width="compact ? 42 : 56"
      :height="compact ? 42 : 56"
      viewBox="0 0 56 56"
      fill="none"
    >
      <path
        d="M8 40C14 28 22 18 36 12C28 22 24 30 22 42C18 36 13 38 8 40Z"
        stroke="#c4a574"
        stroke-width="1.2"
      />
      <path d="M36 12C40 18 44 22 48 24" stroke="#c4a574" stroke-width="1.2" />
    </svg>
  </div>
</template>
