<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-dash-warm">
    <div class="absolute -left-16 top-10 h-56 w-56 rounded-full bg-samasta-gold/25 blur-3xl" />
    <div class="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-samasta-burgundy/20 blur-3xl" />

    <div class="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div class="mb-8 text-center">
        <UiAppLogo />
        <h1 class="mt-6 font-display text-3xl font-semibold text-samasta-charcoal">{{ title }}</h1>
        <p class="mt-2 text-sm text-samasta-muted">{{ subtitle }}</p>
      </div>

      <slot />

      <p v-if="$slots.footer" class="mt-6 text-center text-sm text-samasta-muted">
        <slot name="footer" />
      </p>
    </div>
  </div>
</template>
