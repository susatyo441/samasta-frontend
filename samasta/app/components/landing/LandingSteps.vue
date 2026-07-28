<script setup lang="ts">
const steps = [
  { num: '01', title: 'Daftar & Lengkapi Data', desc: 'Buat akun dan isi detail acara Anda' },
  { num: '02', title: 'Pilih Tema Undangan', desc: 'Pilih desain yang sesuai gaya perayaan' },
  { num: '03', title: 'Tambah Daftar Tamu', desc: 'Import atau input tamu undangan' },
  { num: '04', title: 'Bagikan Link & QR', desc: 'Kirim undangan personal ke setiap tamu' },
  { num: '05', title: 'Pantau RSVP & Kado', desc: 'Kelola konfirmasi kehadiran dan hadiah' },
]
</script>

<template>
  <section class="bg-white py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Cara Kerja Samasta</h2>
        <p class="section-subtitle mx-auto">
          Buat undangan digital cantik dan lengkap hanya dalam beberapa menit — lima langkah mudah.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="(step, i) in steps"
          :key="step.num"
          class="relative rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/50 p-6 text-center"
        >
          <span
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-samasta-burgundy font-display text-lg font-bold text-white"
          >
            {{ step.num }}
          </span>
          <h3 class="mt-4 font-display text-lg font-semibold text-samasta-burgundy">{{ step.title }}</h3>
          <p class="mt-2 text-xs text-samasta-muted">{{ step.desc }}</p>

          <div
            v-if="i < steps.length - 1"
            class="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-samasta-gold lg:block"
          >
            →
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
