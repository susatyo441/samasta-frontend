<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

defineProps<{
  draft: InvitationEditorDraft
}>()
</script>

<template>
  <div class="space-y-3">
    <label class="text-xs font-medium text-samasta-muted">Link live streaming</label>
    <input
      v-model="draft.streamingUrl"
      type="url"
      :class="EDITOR_INPUT_CLASS"
      placeholder="https://youtube.com/live/..."
    >
    <p class="text-xs text-samasta-muted">
      Link ini muncul di tema publik jika diisi.
    </p>
  </div>
</template>
