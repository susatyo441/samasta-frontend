<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ClientOnly>
      <Toaster position="top-right" rich-colors />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>
