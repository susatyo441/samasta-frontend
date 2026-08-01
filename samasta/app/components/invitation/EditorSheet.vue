<script setup lang="ts">
import { useMutation, useQueryCache } from '@pinia/colada'
import { toast } from 'vue-sonner'
import type { Invitation } from '~/types'
import { EDITOR_MODULE_TITLES } from '~/constants/editorModules'
import { INVITATION_QUERY_KEYS, updateInvitation } from '~/queries/invitations'
import {
  buildModulePayload,
  createInvitationDraft,
  type InvitationEditorDraft,
} from '~/utils/invitationEditor'
import { handleMutationError } from '~/utils/handleMutationError'

const props = defineProps<{
  moduleId: string | null
  invitation: Invitation | null
}>()

const emit = defineEmits<{
  close: []
}>()

const draft = ref<InvitationEditorDraft | null>(null)
const queryCache = useQueryCache()

const readOnlyModules = new Set(['messages', 'share', 'guestbook', 'ig-story', 'event-planner'])

watch(
  () => [props.moduleId, props.invitation] as const,
  ([moduleId, invitation]) => {
    if (moduleId && invitation) {
      draft.value = createInvitationDraft(invitation)
    } else {
      draft.value = null
    }
  },
  { immediate: true },
)

const moduleComponents: Record<string, ReturnType<typeof resolveComponent>> = {
  theme: resolveComponent('InvitationEditorModulesThemeModule'),
  hosts: resolveComponent('InvitationEditorModulesHostsModule'),
  events: resolveComponent('InvitationEditorModulesEventsModule'),
  gallery: resolveComponent('InvitationEditorModulesGalleryModule'),
  music: resolveComponent('InvitationEditorModulesMusicModule'),
  messages: resolveComponent('InvitationEditorModulesMessagesModule'),
  gift: resolveComponent('InvitationEditorModulesGiftModule'),
  streaming: resolveComponent('InvitationEditorModulesStreamingModule'),
  story: resolveComponent('InvitationEditorModulesStoryModule'),
  quote: resolveComponent('InvitationEditorModulesQuoteModule'),
  settings: resolveComponent('InvitationEditorModulesSettingsModule'),
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

const canSave = computed(() => {
  if (!props.moduleId) return false
  if (readOnlyModules.has(props.moduleId)) return false
  if (props.moduleId === 'gallery') return false
  return Boolean(buildModulePayload(props.moduleId, draft.value as InvitationEditorDraft))
})

const { mutate: saveModule, isLoading: saving } = useMutation({
  mutation: async () => {
    if (!props.invitation || !props.moduleId || !draft.value) {
      throw new Error('Draft tidak siap')
    }
    const payload = buildModulePayload(props.moduleId, draft.value)
    if (!payload) throw new Error('Modul ini tidak memiliki form simpan')
    return updateInvitation(props.invitation.id, payload)
  },
  onSuccess: async () => {
    toast.success('Perubahan disimpan')
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.root })
    emit('close')
  },
  onError: (err) => handleMutationError(err),
})
</script>

<template>
  <div
    v-if="moduleId && invitation && draft"
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
            Sesuaikan konten undangan agar tampil cocok dengan tema yang dipilih.
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
        :invitation="invitation"
        :draft="draft"
        :module-id="moduleId"
        :event-type="invitation.eventType"
      />

      <button
        v-if="canSave"
        type="button"
        class="btn-primary mt-5 w-full"
        :disabled="saving"
        @click="() => saveModule()"
      >
        {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
      <p v-else-if="moduleId === 'gallery'" class="mt-5 text-center text-xs text-samasta-muted">
        Unggah media di atas langsung tersimpan. Tutup jika sudah selesai.
      </p>
    </div>
  </div>
</template>
