<script setup lang="ts">
import type { InvitationGuest } from '~/types'
import { usePublicGuestActions } from '~/themes/_shared/composables/usePublicGuestActions'

const props = defineProps<{
  slug: string
  messages: InvitationGuest[]
}>()

const name = ref('')
const message = ref('')

const { wishSubmitting, wishSuccess, wishError, submitWish } = usePublicGuestActions(
  () => props.slug,
)

async function onSubmit() {
  if (!name.value.trim() || !message.value.trim() || wishSubmitting.value) return

  const ok = await submitWish({
    name: name.value.trim(),
    message: message.value.trim(),
  })

  if (ok) {
    name.value = ''
    message.value = ''
  }
}
</script>

<template>
  <div class="inv-section-card">
    <h2 class="inv-section-title">Ucapan & Doa</h2>

    <div v-if="messages.length" class="mt-4 max-h-56 space-y-3 overflow-y-auto">
      <div v-for="guest in messages" :key="guest.id" class="inv-section-message">
        <p class="text-sm font-medium text-samasta-charcoal">{{ guest.name }}</p>
        <p class="mt-1 text-sm text-samasta-muted">{{ guest.message }}</p>
      </div>
    </div>
    <p v-else class="mt-4 text-center text-sm text-samasta-muted">
      Jadilah yang pertama memberikan ucapan.
    </p>

    <div v-if="wishSuccess" class="inv-section-alert inv-section-alert--success mt-4">
      Ucapan terkirim. Terima kasih!
    </div>

    <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
      <input
        v-model="name"
        type="text"
        required
        placeholder="Nama"
        class="inv-section-input"
        :disabled="wishSubmitting"
      >
      <textarea
        v-model="message"
        required
        rows="3"
        placeholder="Tulis ucapan hangat..."
        class="inv-section-input"
        :disabled="wishSubmitting"
      />
      <p v-if="wishError" class="inv-section-alert inv-section-alert--error">{{ wishError }}</p>
      <button type="submit" class="inv-section-btn" :disabled="wishSubmitting">
        {{ wishSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
      </button>
    </form>
  </div>
</template>

<style src="./sections.css"></style>
