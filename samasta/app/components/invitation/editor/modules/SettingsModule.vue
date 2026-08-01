<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

defineProps<{
  draft: InvitationEditorDraft
}>()
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Judul undangan</label>
      <input v-model="draft.title" type="text" :class="EDITOR_INPUT_CLASS">
    </div>
    <div>
      <label class="text-xs font-medium text-samasta-muted">Greeting</label>
      <textarea v-model="draft.greeting" rows="3" :class="EDITOR_INPUT_CLASS" />
    </div>

    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
      <input v-model="draft.settings.showCountdown" type="checkbox" class="rounded border-samasta-burgundy/30">
      Tampilkan countdown di tema
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
      <input v-model="draft.settings.showGuestBook" type="checkbox" class="rounded border-samasta-burgundy/30">
      Tampilkan buku ucapan
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
      <input v-model="draft.settings.passwordProtected" type="checkbox" class="rounded border-samasta-burgundy/30">
      Lindungi dengan kode akses (UI)
    </label>
  </div>
</template>
