<script setup lang="ts">
import type { InvitationGuest } from '~/types'

defineProps<{
  messages: InvitationGuest[]
}>()

const emit = defineEmits<{
  submit: [payload: { name: string; message: string }]
}>()

const name = ref('')
const message = ref('')
const sent = ref(false)

function onSubmit() {
  if (!name.value.trim() || !message.value.trim()) return
  emit('submit', { name: name.value.trim(), message: message.value.trim() })
  sent.value = true
  name.value = ''
  message.value = ''
}
</script>

<template>
  <div class="cp-card">
    <h2 class="cp-section-title">Ucapan & Doa</h2>

    <div v-if="messages.length" class="mt-4 max-h-56 space-y-3 overflow-y-auto">
      <div
        v-for="guest in messages"
        :key="guest.id"
        class="rounded-2xl bg-[#FFF3EB] px-4 py-3"
      >
        <p class="text-sm font-medium text-samasta-charcoal">{{ guest.name }}</p>
        <p class="mt-1 text-sm text-samasta-muted">{{ guest.message }}</p>
      </div>
    </div>
    <p v-else class="mt-4 text-center text-sm text-samasta-muted">
      Jadilah yang pertama memberikan ucapan.
    </p>

    <div v-if="sent" class="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700">
      Ucapan terkirim. Terima kasih!
    </div>
    <form v-else class="mt-4 space-y-3" @submit.prevent="onSubmit">
      <input v-model="name" type="text" required placeholder="Nama" class="cp-input">
      <textarea
        v-model="message"
        required
        rows="3"
        placeholder="Tulis ucapan hangat..."
        class="cp-input"
      />
      <button type="submit" class="cp-btn w-full">Kirim Ucapan</button>
    </form>
  </div>
</template>
