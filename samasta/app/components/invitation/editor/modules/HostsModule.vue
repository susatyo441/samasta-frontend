<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

const props = defineProps<{
  draft: InvitationEditorDraft
}>()

function addHost() {
  props.draft.hosts.push({ name: '', role: '' })
}

function removeHost(index: number) {
  props.draft.hosts.splice(index, 1)
  if (!props.draft.hosts.length) props.draft.hosts.push({ name: '', role: '' })
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Judul undangan</label>
      <input v-model="draft.title" type="text" required :class="EDITOR_INPUT_CLASS" placeholder="Yudis & Suta">
    </div>
    <div>
      <label class="text-xs font-medium text-samasta-muted">Sapaan / greeting</label>
      <textarea
        v-model="draft.greeting"
        rows="3"
        :class="EDITOR_INPUT_CLASS"
        placeholder="Dengan penuh sukacita, kami mengundang..."
      />
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold text-samasta-burgundy">Host / Mempelai</p>
        <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addHost">
          + Tambah
        </button>
      </div>

      <div
        v-for="(host, idx) in draft.hosts"
        :key="idx"
        class="rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/60 p-4"
      >
        <div class="mb-2 flex items-center justify-between">
          <p class="text-xs font-medium text-samasta-muted">Host {{ idx + 1 }}</p>
          <button type="button" class="text-[11px] text-rose-600" @click="removeHost(idx)">Hapus</button>
        </div>
        <label class="text-xs font-medium text-samasta-muted">Nama</label>
        <input v-model="host.name" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Nama lengkap">
        <label class="mt-3 block text-xs font-medium text-samasta-muted">Peran</label>
        <input v-model="host.role" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Mempelai Pria">
      </div>
    </div>
  </div>
</template>
