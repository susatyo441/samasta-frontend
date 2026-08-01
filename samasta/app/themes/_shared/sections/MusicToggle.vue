<script setup lang="ts">
const props = defineProps<{
  title?: string
  url?: string
  playing?: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <div class="cp-card text-center">
    <p class="text-[10px] uppercase tracking-[0.28em] text-[var(--cp-muted)]">Musik Latar</p>
    <p class="cp-script mt-2 text-xl text-[var(--cp-burgundy)]">{{ title || 'Tanpa judul' }}</p>

    <button type="button" class="cp-btn-secondary mt-4 !py-2 text-xs" @click="emit('toggle')">
      {{ playing ? 'Jeda Musik' : url ? 'Putar Musik' : 'Musik belum tersedia' }}
    </button>
    <p class="mt-2 text-[11px] text-[var(--cp-muted)]">
      {{ url ? 'Musik diputar otomatis setelah undangan dibuka.' : 'Tambahkan URL audio di editor Musik.' }}
    </p>
  </div>
</template>
