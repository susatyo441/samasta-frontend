<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

defineProps<{
  draft: InvitationEditorDraft
}>()
</script>

<template>
  <div class="space-y-3">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Judul lagu</label>
      <input v-model="draft.music.title" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Perfect - Ed Sheeran">
    </div>
    <div>
      <label class="text-xs font-medium text-samasta-muted">URL audio (opsional)</label>
      <input v-model="draft.music.url" type="url" :class="EDITOR_INPUT_CLASS" placeholder="https://.../lagu.mp3">
    </div>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
      <input v-model="draft.music.autoplay" type="checkbox" class="rounded border-samasta-burgundy/30">
      Sarankan autoplay setelah tamu membuka undangan
    </label>
  </div>
</template>
