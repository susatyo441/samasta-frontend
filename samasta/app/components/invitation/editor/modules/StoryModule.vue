<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

const props = defineProps<{
  draft: InvitationEditorDraft
}>()

function addStory() {
  props.draft.loveStory.push({ year: '', title: '', description: '' })
}

function removeStory(index: number) {
  props.draft.loveStory.splice(index, 1)
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-samasta-burgundy">Kisah / cerita</p>
      <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addStory">
        + Tambah
      </button>
    </div>

    <div
      v-for="(item, idx) in draft.loveStory"
      :key="idx"
      class="space-y-2 rounded-2xl border-l-4 border-samasta-gold bg-samasta-cream/70 p-4"
    >
      <div class="flex justify-end">
        <button type="button" class="text-[11px] text-rose-600" @click="removeStory(idx)">Hapus</button>
      </div>
      <input v-model="item.year" type="text" :class="EDITOR_INPUT_CLASS" placeholder="2022">
      <input v-model="item.title" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Judul momen">
      <textarea v-model="item.description" rows="2" :class="EDITOR_INPUT_CLASS" placeholder="Cerita singkat..." />
    </div>

    <p v-if="!draft.loveStory.length" class="rounded-2xl bg-samasta-cream px-4 py-6 text-center text-sm text-samasta-muted">
      Belum ada cerita. Tambahkan momen untuk ditampilkan di tema.
    </p>
  </div>
</template>
