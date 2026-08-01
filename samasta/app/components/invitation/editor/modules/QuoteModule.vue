<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

defineProps<{
  draft: InvitationEditorDraft
}>()
</script>

<template>
  <div class="space-y-3">
    <label class="text-xs font-medium text-samasta-muted">Kutipan spesial</label>
    <textarea
      v-model="draft.quote"
      rows="4"
      :class="EDITOR_INPUT_CLASS"
      placeholder="Dan di antara tanda-tanda kekuasaan-Nya..."
    />
    <div class="rounded-2xl bg-samasta-cream p-4 text-center">
      <p class="font-display text-lg italic text-samasta-burgundy">
        “{{ draft.quote || 'Pratinjau quote akan muncul di sini' }}”
      </p>
    </div>
  </div>
</template>
