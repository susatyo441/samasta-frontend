<script setup lang="ts">
defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      class="ap-glow absolute -left-12 top-10 h-52 w-52 rounded-full bg-[#e8a4c8]/35 blur-3xl"
    />
    <div
      class="ap-glow absolute -right-10 top-32 h-56 w-56 rounded-full bg-[#c4b5fd]/40 blur-3xl"
      style="animation-delay: 1.1s"
    />
    <div
      class="ap-glow absolute bottom-16 left-1/3 h-40 w-40 rounded-full bg-[#818cf8]/25 blur-3xl"
      style="animation-delay: 2s"
    />

    <svg
      class="absolute left-4 top-12 opacity-60"
      :width="compact ? 48 : 64"
      :height="compact ? 48 : 64"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M8 40C18 28 28 18 48 12C36 24 30 34 28 48C22 40 14 40 8 40Z"
        stroke="#a78bfa"
        stroke-width="1.2"
      />
      <circle cx="46" cy="16" r="2.5" fill="#e8a4c8" opacity="0.8" />
    </svg>

    <svg
      class="absolute bottom-12 right-4 rotate-180 opacity-60"
      :width="compact ? 48 : 64"
      :height="compact ? 48 : 64"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M8 40C18 28 28 18 48 12C36 24 30 34 28 48C22 40 14 40 8 40Z"
        stroke="#c4b5fd"
        stroke-width="1.2"
      />
      <circle cx="46" cy="16" r="2.5" fill="#818cf8" opacity="0.7" />
    </svg>
  </div>
</template>
