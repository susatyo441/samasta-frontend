<script setup lang="ts">
import { EDITOR_MODULE_ICON_PATHS } from '~/constants/editorModules'

const props = defineProps<{
  icon: string
}>()

const paths = computed(() => {
  const value = EDITOR_MODULE_ICON_PATHS[props.icon]
  if (!value) return null
  return Array.isArray(value) ? value : [value]
})
</script>

<template>
  <svg v-if="paths" class="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
    <path
      v-for="(path, index) in paths"
      :key="index"
      stroke-linecap="round"
      stroke-linejoin="round"
      :d="path"
    />
  </svg>
  <span v-else class="text-2xl">•</span>
</template>
