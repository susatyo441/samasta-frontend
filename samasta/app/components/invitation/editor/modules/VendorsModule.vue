<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

const props = defineProps<{
  draft: InvitationEditorDraft
}>()

function addVendor() {
  props.draft.managers.push({ name: '', role: '', instagram: '' })
}

function removeVendor(index: number) {
  props.draft.managers.splice(index, 1)
  if (!props.draft.managers.length) addVendor()
}
</script>

<template>
  <div class="space-y-3 text-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="font-semibold text-samasta-burgundy">Kredit Vendor</p>
        <p class="mt-0.5 text-xs text-samasta-muted">
          WO, fotografer, MUA, dekorasi, dll. Tampil di footer undangan.
        </p>
      </div>
      <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addVendor">
        + Tambah
      </button>
    </div>

    <div
      v-for="(vendor, idx) in draft.managers"
      :key="idx"
      class="space-y-2 rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/60 p-3"
    >
      <div class="flex items-center justify-between">
        <p class="text-xs font-medium text-samasta-muted">Vendor {{ idx + 1 }}</p>
        <button type="button" class="text-[11px] text-rose-600" @click="removeVendor(idx)">
          Hapus
        </button>
      </div>
      <input v-model="vendor.name" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Nama vendor / studio">
      <input v-model="vendor.role" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Peran (WO, Fotografer, MUA)">
      <input
        v-model="vendor.instagram"
        type="text"
        :class="EDITOR_INPUT_CLASS"
        placeholder="@username atau link Instagram"
      >
    </div>
  </div>
</template>
