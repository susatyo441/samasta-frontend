<script setup lang="ts">
const gifts = [
  {
    title: 'Amplop Digital',
    description:
      'Terima hadiah uang langsung ke rekening Anda. Praktis bagi tamu, tanpa repot menyiapkan amplop fisik.',
    gradient: 'from-samasta-burgundy/10 to-samasta-sage/20',
  },
  {
    title: 'Kirim ke Alamat',
    description:
      'Tamu bisa mengirim hadiah fisik langsung ke rumah atau venue acara — ideal untuk kado spesial berukuran besar.',
    gradient: 'from-sky-100/60 to-samasta-cream-dark',
  },
  {
    title: 'Wishlist Kado',
    description:
      'Buat daftar barang impian. Tamu memilih dan mereservasi kado agar tidak ada duplikasi atau hadiah tidak terpakai.',
    gradient: 'from-fuchsia-100/50 to-indigo-100/50',
  },
]
</script>

<template>
  <section class="bg-section-gradient py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Cara Baru Menerima Kado</h2>
        <p class="section-subtitle mx-auto">
          Tiga pilihan fleksibel yang memudahkan tamu sekaligus memastikan Anda menerima hadiah yang benar-benar
          dibutuhkan.
        </p>
      </div>

      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <article
          v-for="gift in gifts"
          :key="gift.title"
          class="overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-sm"
        >
          <div class="aspect-video bg-gradient-to-br" :class="gift.gradient">
            <div class="flex h-full items-center justify-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                <svg class="h-8 w-8 text-samasta-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-display text-xl font-semibold text-samasta-burgundy">{{ gift.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-samasta-muted">{{ gift.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
