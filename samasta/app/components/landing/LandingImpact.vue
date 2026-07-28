<script setup lang="ts">
const impacts = [
  { value: '38.2 Ton', label: 'Kertas dihindari', icon: '🌿' },
  { value: '215 tCO₂e', label: 'Emisi karbon berkurang', icon: '🌍' },
  { value: '1.8M+', label: 'Undangan dibagikan', icon: '💌' },
]
</script>

<template>
  <section class="bg-section-gradient py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Dampak Positif Bersama Samasta</h2>
        <p class="section-subtitle mx-auto">
          Setiap undangan digital adalah langkah kecil menuju perayaan yang lebih berkelanjutan — tanpa mengorbankan
          keindahan.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-3">
        <div
          v-for="item in impacts"
          :key="item.label"
          class="rounded-2xl border border-samasta-sage/20 bg-white/80 p-8 text-center backdrop-blur-sm"
        >
          <span class="text-3xl">{{ item.icon }}</span>
          <p class="mt-4 font-display text-3xl font-bold text-samasta-burgundy sm:text-4xl">{{ item.value }}</p>
          <p class="mt-2 text-sm text-samasta-muted">{{ item.label }}</p>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-samasta-muted">
        💚 Bersama Samasta, ciptakan kenangan indah tanpa jejak negatif pada bumi.
      </p>
    </div>
  </section>
</template>
