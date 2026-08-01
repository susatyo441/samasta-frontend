<script setup lang="ts">
import type { EditorModule } from '~/types'

const props = defineProps<{
  eventType: 'wedding' | 'birthday' | 'other'
  modules: EditorModule[]
}>()

const emit = defineEmits<{
  select: [moduleId: string]
}>()

function labelOf(mod: EditorModule) {
  return mod.label[props.eventType] || mod.label.other || mod.id
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2.5 sm:gap-3">
    <button
      v-for="mod in modules"
      :key="mod.id"
      type="button"
      class="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-samasta-burgundy px-1.5 text-center text-white shadow-sm transition active:scale-[0.97] hover:bg-samasta-burgundy-dark"
      :class="mod.highlight ? 'ring-2 ring-samasta-gold ring-offset-2 ring-offset-white' : ''"
      @click="emit('select', mod.id)"
    >
      <InvitationEditorModuleIcon :icon="mod.icon" />
      <span class="text-[10px] font-semibold leading-tight sm:text-xs">{{ labelOf(mod) }}</span>
    </button>
  </div>
</template>
