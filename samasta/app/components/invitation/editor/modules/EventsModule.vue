<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

const props = defineProps<{
  draft: InvitationEditorDraft
}>()

function addEvent() {
  props.draft.events.push({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    venueAddress: '',
    mapsUrl: '',
  })
}

function removeEvent(index: number) {
  props.draft.events.splice(index, 1)
  if (!props.draft.events.length) addEvent()
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-samasta-burgundy">Detail acara</p>
      <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addEvent">
        + Tambah acara
      </button>
    </div>

    <div
      v-for="(event, idx) in draft.events"
      :key="idx"
      class="space-y-2 rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/60 p-4"
    >
      <div class="flex items-center justify-between">
        <p class="text-xs font-medium text-samasta-muted">Acara {{ idx + 1 }}</p>
        <button type="button" class="text-[11px] text-rose-600" @click="removeEvent(idx)">Hapus</button>
      </div>
      <input v-model="event.name" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Akad / Resepsi">
      <input v-model="event.date" type="date" :class="EDITOR_INPUT_CLASS">
      <div class="grid grid-cols-2 gap-2">
        <input v-model="event.startTime" type="time" :class="EDITOR_INPUT_CLASS">
        <input v-model="event.endTime" type="time" :class="EDITOR_INPUT_CLASS">
      </div>
      <input v-model="event.venueName" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Nama venue">
      <input v-model="event.venueAddress" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Alamat">
    <input v-model="event.mapsUrl" type="url" :class="EDITOR_INPUT_CLASS" placeholder="https://maps.google.com/...">
      <p class="text-[11px] text-samasta-muted">
        Link Google Maps ditampilkan sebagai peta embed di undangan. Alamat venue juga dipakai jika link kosong.
      </p>
    </div>
  </div>
</template>
