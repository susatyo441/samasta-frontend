<script setup lang="ts">
import type { Component } from 'vue'
import type { Invitation } from '~/types'
import { EDITOR_MODULE_TITLES } from '~/constants/editorModules'
import { useInvitationMutations } from '~/composables/useInvitationMutations'
import { handleMutationError } from '~/utils/handleMutationError'
import { toast } from 'vue-sonner'
import EventsModule from '~/components/invitation/editor/modules/EventsModule.vue'
import FallbackModule from '~/components/invitation/editor/modules/FallbackModule.vue'
import GalleryModule from '~/components/invitation/editor/modules/GalleryModule.vue'
import GiftModule from '~/components/invitation/editor/modules/GiftModule.vue'
import HostsModule from '~/components/invitation/editor/modules/HostsModule.vue'
import MessagesModule from '~/components/invitation/editor/modules/MessagesModule.vue'
import MusicModule from '~/components/invitation/editor/modules/MusicModule.vue'
import QuoteModule from '~/components/invitation/editor/modules/QuoteModule.vue'
import ShareModule from '~/components/invitation/editor/modules/ShareModule.vue'
import StoryModule from '~/components/invitation/editor/modules/StoryModule.vue'

const props = defineProps<{
  moduleId: string | null
  invitation: Invitation | null
}>()

const emit = defineEmits<{
  close: []
}>()

const moduleComponents: Record<string, Component> = {
  hosts: HostsModule,
  events: EventsModule,
  gallery: GalleryModule,
  music: MusicModule,
  messages: MessagesModule,
  gift: GiftModule,
  story: StoryModule,
  quote: QuoteModule,
  share: ShareModule,
}

const moduleRef = ref<{ getPayload?: () => Record<string, unknown> } | null>(null)
const saving = ref(false)

const activeModule = computed(() => {
  if (!props.moduleId) return null
  return moduleComponents[props.moduleId] ?? FallbackModule
})

const moduleTitle = computed(() => {
  if (!props.moduleId) return 'Edit'
  return EDITOR_MODULE_TITLES[props.moduleId] || 'Edit'
})

const selfManagedModules = new Set(['share', 'messages', 'gallery'])
const showSave = computed(() => props.moduleId && !selfManagedModules.has(props.moduleId))

const { update } = useInvitationMutations(() => props.invitation?.id ?? '')

async function save() {
  if (!props.invitation || !moduleRef.value?.getPayload) return

  saving.value = true
  try {
    await update(moduleRef.value.getPayload())
    toast.success('Perubahan disimpan.')
    emit('close')
  } catch (err) {
    handleMutationError(err)
  } finally {
    saving.value = false
  }
}
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
          <p class="mt-1 text-xs text-samasta-muted">
            {{
              showSave
                ? 'Ubah konten lalu simpan.'
                : selfManagedModules.has(moduleId)
                  ? 'Perubahan langsung tersimpan dari modul ini.'
                  : 'Pratinjau modul.'
            }}
          </p>
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
        ref="moduleRef"
        :invitation="invitation"
        :module-id="moduleId"
      />

      <button
        v-if="showSave"
        type="button"
        class="btn-primary mt-5 w-full"
        :disabled="saving"
        @click="save"
      >
        {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
    </div>
  </div>
</template>
