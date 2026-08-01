<script setup lang="ts">
import { usePublicGuestActions } from '~/themes/_shared/composables/usePublicGuestActions'
import { usePublicGuestContext } from '~/themes/_shared/composables/usePublicGuestContext'
import { formatDateId } from '~/utils/formatDate'

const props = defineProps<{
  slug: string
  deadline?: string | null
}>()

const { prefilledName } = usePublicGuestContext()

const name = ref('')
const status = ref<'hadir' | 'tidak' | 'ragu'>('hadir')
const quota = ref(1)

watch(
  prefilledName,
  (value) => {
    if (value && !name.value) name.value = value
  },
  { immediate: true },
)

const { rsvpSubmitting, rsvpSuccess, rsvpError, submitRsvp } = usePublicGuestActions(
  () => props.slug,
)

async function onSubmit() {
  if (!name.value.trim() || rsvpSubmitting.value) return
  await submitRsvp({
    name: name.value.trim(),
    status: status.value,
    quota: quota.value,
  })
}
</script>

<template>
  <div class="inv-section-card">
    <h2 class="inv-section-title">Konfirmasi Kehadiran</h2>
    <p v-if="deadline" class="mt-1 text-center text-xs text-samasta-muted">
      Batas RSVP: {{ formatDateId(deadline) }}
    </p>

    <div v-if="rsvpSuccess" class="inv-section-alert inv-section-alert--success mt-5">
      Terima kasih! Konfirmasi kehadiranmu sudah tercatat.
    </div>
    <form v-else class="mt-5 space-y-3" @submit.prevent="onSubmit">
      <input
        v-model="name"
        type="text"
        required
        placeholder="Nama lengkap"
        class="inv-section-input"
        :disabled="rsvpSubmitting"
      >
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="opt in [
            { id: 'hadir' as const, label: 'Hadir' },
            { id: 'tidak' as const, label: 'Tidak' },
            { id: 'ragu' as const, label: 'Ragu' },
          ]"
          :key="opt.id"
          type="button"
          class="inv-section-choice"
          :class="status === opt.id ? 'inv-section-choice--active' : 'inv-section-choice--idle'"
          :disabled="rsvpSubmitting"
          @click="status = opt.id"
        >
          {{ opt.label }}
        </button>
      </div>
      <div v-if="status === 'hadir'">
        <label class="text-xs font-medium text-samasta-muted">Jumlah tamu</label>
        <input
          v-model.number="quota"
          type="number"
          min="1"
          max="20"
          class="inv-section-input mt-1"
          :disabled="rsvpSubmitting"
        >
      </div>
      <p v-if="rsvpError" class="inv-section-alert inv-section-alert--error">{{ rsvpError }}</p>
      <button type="submit" class="inv-section-btn" :disabled="rsvpSubmitting">
        {{ rsvpSubmitting ? 'Mengirim...' : 'Kirim RSVP' }}
      </button>
    </form>
  </div>
</template>

<style src="./sections.css"></style>
