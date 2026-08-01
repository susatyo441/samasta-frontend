<script setup lang="ts">
const props = defineProps<{
  deadline?: string | null
}>()

const emit = defineEmits<{
  submit: [payload: { name: string; status: 'hadir' | 'tidak' | 'ragu' }]
}>()

const name = ref('')
const status = ref<'hadir' | 'tidak' | 'ragu'>('hadir')
const sent = ref(false)

function onSubmit() {
  if (!name.value.trim()) return
  emit('submit', { name: name.value.trim(), status: status.value })
  sent.value = true
}
</script>

<template>
  <div class="cp-card">
    <h2 class="cp-section-title">Konfirmasi Kehadiran</h2>
    <p v-if="deadline" class="mt-1 text-center text-xs text-samasta-muted">
      Batas RSVP: {{ formatDateId(deadline) }}
    </p>

    <div v-if="sent" class="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700">
      Terima kasih! Konfirmasi kehadiranmu sudah tercatat.
    </div>
    <form v-else class="mt-5 space-y-3" @submit.prevent="onSubmit">
      <input
        v-model="name"
        type="text"
        required
        placeholder="Nama lengkap"
        class="cp-input"
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
          class="rounded-xl px-2 py-2.5 text-xs font-semibold transition"
          :class="status === opt.id ? 'bg-[#E85D75] text-white' : 'bg-[#FFF0E8] text-samasta-muted'"
          @click="status = opt.id"
        >
          {{ opt.label }}
        </button>
      </div>
      <button type="submit" class="cp-btn w-full">Kirim RSVP</button>
    </form>
  </div>
</template>
