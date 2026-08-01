<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

type EventRow = NonNullable<Invitation['events']>[number]

const events = ref<EventRow[]>([])

const emptyEvent = (): EventRow => ({
  name: '',
  date: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  mapsUrl: '',
})

watch(
  () => props.invitation.events,
  (value) => {
    events.value = structuredClone(value?.length ? value : [emptyEvent()])
  },
  { immediate: true },
)

function addEvent() {
  events.value.push(emptyEvent())
}

function removeEvent(index: number) {
  events.value.splice(index, 1)
  if (!events.value.length) events.value.push(emptyEvent())
}

function getPayload() {
  return {
    events: events.value.filter((event) => event.name.trim() && event.date),
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(event, idx) in events"
      :key="idx"
      class="space-y-2 rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/70 p-4"
    >
      <input v-model="event.name" class="input w-full" placeholder="Nama acara">
      <input v-model="event.date" type="date" class="input w-full">
      <div class="grid grid-cols-2 gap-2">
        <input v-model="event.startTime" type="time" class="input w-full" placeholder="Mulai">
        <input v-model="event.endTime" type="time" class="input w-full" placeholder="Selesai">
      </div>
      <input v-model="event.venueName" class="input w-full" placeholder="Nama venue">
      <textarea v-model="event.venueAddress" class="input w-full" rows="2" placeholder="Alamat venue" />
      <input v-model="event.mapsUrl" class="input w-full" placeholder="Link Google Maps">
      <button
        v-if="events.length > 1"
        type="button"
        class="text-xs font-medium text-red-600"
        @click="removeEvent(idx)"
      >
        Hapus acara
      </button>
    </div>

    <button type="button" class="btn-secondary w-full" @click="addEvent">
      + Tambah Acara
    </button>
  </div>
</template>
