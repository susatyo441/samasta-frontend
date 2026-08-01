<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toaster position="top-right" rich-colors />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>
