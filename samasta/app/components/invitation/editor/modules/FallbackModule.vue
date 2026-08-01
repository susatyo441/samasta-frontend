<script setup lang="ts">
import type { Invitation } from '~/types'

defineProps<{
  invitation: Invitation
  moduleId: string
}>()
</script>

<template>
  <div class="rounded-2xl bg-samasta-cream p-4 text-sm text-samasta-muted">
    Modul <strong>{{ moduleId }}</strong> untuk undangan
    <strong>{{ invitation.title }}</strong> siap diisi. Ini tampilan dummy untuk alur edit.
  </div>
</template>
