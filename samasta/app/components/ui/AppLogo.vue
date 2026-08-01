<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2">
    <span
      class="flex items-center justify-center rounded-full bg-samasta-burgundy font-display font-bold text-white"
      :class="size === 'sm' ? 'h-10 w-10 text-lg' : size === 'lg' ? 'h-12 w-12 text-2xl' : 'h-11 w-11 text-xl'"
    >
      S
    </span>
    <span
      class="font-display font-semibold text-samasta-burgundy"
      :class="size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-3xl'"
    >
      Samasta
    </span>
  </NuxtLink>
</template>
