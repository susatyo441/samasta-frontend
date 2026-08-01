<script setup lang="ts">
import { invitationStatusClasses } from '~/utils/invitationDisplay'

defineProps<{
  status: string
}>()
</script>

<template>
  <span
    class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
    :class="invitationStatusClasses(status)"
  >
    {{ status }}
  </span>
</template>
