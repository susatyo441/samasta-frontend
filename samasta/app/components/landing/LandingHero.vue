<script setup lang="ts">
const stats = [
  { value: '12K+', label: 'Pasangan Bahagia' },
  { value: '850K+', label: 'Tamu Terundang' },
  { value: '320K+', label: 'Ucapan & Doa' },
]

const previewCards = [
  { name: 'Confetti Pop', gradient: 'from-indigo-100 via-sky-50 to-rose-50' },
  { name: 'Sunny Wishes', gradient: 'from-cyan-50 via-white to-amber-50' },
  { name: 'Playful Pastel', gradient: 'from-violet-100 via-fuchsia-50 to-pink-50' },
  { name: 'Soft Celebration', gradient: 'from-slate-100 via-sky-50 to-indigo-50' },
]
</script>

<template>
  <section id="beranda" class="relative overflow-hidden bg-hero-pattern pt-28 pb-20 lg:pt-36 lg:pb-28">
    <div class="absolute -right-32 top-20 h-96 w-96 rounded-full bg-samasta-gold/10 blur-3xl" />
    <div class="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-samasta-burgundy/10 blur-3xl" />

    <div class="section-container relative">
      <div class="mx-auto max-w-4xl text-center">
        <span
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-samasta-gold/30 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-samasta-burgundy"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-samasta-gold" />
          Undangan Digital Premium
        </span>

        <h1 class="font-display text-4xl font-semibold leading-tight text-samasta-burgundy sm:text-5xl lg:text-6xl">
          Undangan Digital yang Hangat, Elegan, &amp; Siap Dibagikan
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-samasta-muted sm:text-lg">
          Samasta membantu Anda merayakan momen spesial dengan undangan digital yang personal —
          lengkap dengan RSVP online, galeri kenangan, musik, dan sistem kado yang praktis.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#" class="btn-primary min-w-[200px]">Buat Undangan Gratis</a>
          <a href="#tema" class="btn-secondary min-w-[200px]">Lihat Contoh Tema</a>
        </div>

        <div class="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-samasta-muted sm:gap-10">
          <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2">
            <span class="font-display text-2xl font-semibold text-samasta-burgundy">{{ stat.value }}</span>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        <div
          v-for="(card, i) in previewCards"
          :key="card.name"
          class="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-samasta-burgundy/10 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          :class="`bg-gradient-to-br ${card.gradient}`"
        >
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div class="mb-3 h-10 w-10 rounded-full border-2 border-samasta-burgundy/20 bg-white/60" />
            <p class="font-display text-sm font-semibold text-samasta-burgundy sm:text-base">{{ card.name }}</p>
            <p class="mt-1 text-xs text-samasta-muted">Contoh {{ i + 1 }}</p>
          </div>
          <div
            class="absolute inset-x-0 bottom-0 translate-y-full bg-samasta-burgundy/90 py-2 text-center text-xs font-medium text-white transition group-hover:translate-y-0"
          >
            Lihat Demo
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
