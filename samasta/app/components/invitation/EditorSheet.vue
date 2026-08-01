<script setup lang="ts">
import type { Invitation } from '~/types'
import { EDITOR_MODULE_TITLES } from '~/constants/editorModules'

const props = defineProps<{
  moduleId: string | null
  invitation: Invitation | null
}>()

const emit = defineEmits<{
  close: []
}>()

const moduleComponents: Record<string, ReturnType<typeof resolveComponent>> = {
  hosts: resolveComponent('InvitationEditorModulesHostsModule'),
  events: resolveComponent('InvitationEditorModulesEventsModule'),
  gallery: resolveComponent('InvitationEditorModulesGalleryModule'),
  music: resolveComponent('InvitationEditorModulesMusicModule'),
  messages: resolveComponent('InvitationEditorModulesMessagesModule'),
  gift: resolveComponent('InvitationEditorModulesGiftModule'),
  rsvp: resolveComponent('InvitationEditorModulesRsvpModule'),
  story: resolveComponent('InvitationEditorModulesStoryModule'),
  quote: resolveComponent('InvitationEditorModulesQuoteModule'),
  share: resolveComponent('InvitationEditorModulesShareModule'),
}

const activeModule = computed(() => {
  if (!props.moduleId) return null
  return moduleComponents[props.moduleId] || resolveComponent('InvitationEditorModulesFallbackModule')
})

const moduleTitle = computed(() => {
  if (!props.moduleId) return 'Edit'
  return EDITOR_MODULE_TITLES[props.moduleId] || 'Edit'
})
</script>

<template>
  <div
    v-if="moduleId && invitation"
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <div class="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-3xl sm:p-6">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">
            {{ moduleTitle }}
          </h3>
          <p class="mt-1 text-xs text-samasta-muted">Dummy editor — data contoh siap diubah nanti.</p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <component
        :is="activeModule"
        :invitation="invitation"
        :module-id="moduleId"
      />

      <button type="button" class="btn-primary mt-5 w-full" @click="emit('close')">
        Simpan Perubahan (Dummy)
      </button>
    </div>
  </div>
</template>
