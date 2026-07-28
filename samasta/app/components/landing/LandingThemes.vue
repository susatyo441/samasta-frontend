<script setup lang="ts">
const themes = [
  { name: 'Confetti Pop', tag: 'Ceria', gradient: 'from-pink-100 to-amber-100' },
  { name: 'Sky Serenade', tag: 'Modern', gradient: 'from-sky-100 to-indigo-50' },
  { name: 'Color Parade', tag: 'Fun', gradient: 'from-violet-100 to-fuchsia-50' },
  { name: 'Soft Celebration', tag: 'Timeless', gradient: 'from-slate-100 to-sky-50' },
  { name: 'Tropical Day', tag: 'Outdoor', gradient: 'from-cyan-100 to-emerald-50' },
  { name: 'Midnight Spark', tag: 'Elegant', gradient: 'from-indigo-900/20 to-slate-200' },
  { name: 'Happy Hues', tag: 'Playful', gradient: 'from-yellow-100 to-rose-50' },
  { name: 'Aurora Pastel', tag: 'Premium', gradient: 'from-fuchsia-100 to-indigo-100' },
]
</script>

<template>
  <section id="tema" class="bg-white py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Pilihan Tema Siap Pakai</h2>
        <p class="section-subtitle mx-auto">
          Tema premium yang langsung bisa digunakan — tinggal sesuaikan dengan karakter acara Anda.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <article
          v-for="theme in themes"
          :key="theme.name"
          class="group cursor-pointer overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="aspect-[3/4] bg-gradient-to-br transition group-hover:scale-105"
            :class="theme.gradient"
          >
            <div class="flex h-full flex-col items-center justify-center p-4">
              <span
                class="mb-2 rounded-full bg-white/80 px-3 py-0.5 text-xs font-medium text-samasta-burgundy"
              >
                {{ theme.tag }}
              </span>
              <p class="font-display text-center text-sm font-semibold text-samasta-burgundy sm:text-base">
                {{ theme.name }}
              </p>
            </div>
          </div>
          <div class="border-t border-samasta-burgundy/5 p-3 text-center">
            <span class="text-xs font-medium text-samasta-burgundy group-hover:underline">Lihat Demo →</span>
          </div>
        </article>
      </div>

      <div class="mt-10 text-center">
        <a href="#" class="btn-secondary">Lihat Semua Tema</a>
      </div>
    </div>
  </section>
</template>
