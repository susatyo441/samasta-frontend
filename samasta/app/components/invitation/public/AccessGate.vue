<script setup lang="ts">
const props = defineProps<{
  title: string
  submitting?: boolean
  error?: string
}>()

const emit = defineEmits<{
  submit: [code: string]
}>()

const code = ref('')

function onSubmit() {
  const trimmed = code.value.trim()
  if (!trimmed || props.submitting) return
  emit('submit', trimmed)
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 py-10">
    <form
      class="w-full max-w-sm rounded-3xl border border-samasta-burgundy/10 bg-white p-6 shadow-soft"
      @submit.prevent="onSubmit"
    >
      <p class="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-samasta-muted">
        Undangan Terkunci
      </p>
      <h1 class="mt-3 text-center font-display text-3xl font-semibold text-samasta-burgundy">
        {{ title }}
      </h1>
      <p class="mt-2 text-center text-sm text-samasta-muted">
        Masukkan kode akses dari pengirim undangan untuk membuka halaman.
      </p>

      <input
        v-model="code"
        type="text"
        autocomplete="one-time-code"
        class="input mt-5 w-full text-center tracking-[0.18em]"
        placeholder="Kode akses"
        required
      >

      <p v-if="error" class="mt-3 text-center text-sm text-rose-600">{{ error }}</p>

      <button type="submit" class="btn-primary mt-5 w-full" :disabled="submitting">
        {{ submitting ? 'Membuka...' : 'Buka Undangan' }}
      </button>
    </form>
  </div>
</template>
