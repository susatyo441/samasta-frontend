<script setup lang="ts">
const features = [
  { title: 'Aktif Selamanya', desc: 'Undangan digital tetap online tanpa batas waktu.' },
  { title: 'Edit Kapan Saja', desc: 'Ubah tampilan undangan langsung dari dashboard.' },
  { title: 'Musik Latar', desc: 'Tambahkan lagu favorit untuk nuansa lebih hidup.' },
  { title: 'Ucapan & Doa', desc: 'Tamu kirim ucapan langsung di halaman undangan.' },
  { title: 'Kado Digital', desc: 'Terima amplop digital dan wishlist dengan mudah.' },
  { title: 'Galeri Foto & Video', desc: 'Tampilkan momen prewedding terbaik Anda.' },
  { title: 'Live Streaming', desc: 'Bagikan link streaming untuk tamu yang jauh.' },
  { title: 'Kirim via WhatsApp', desc: 'Kirim undangan personal langsung ke WA tamu.' },
]
</script>

<template>
  <section id="fitur" class="bg-section-gradient py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Fitur Lengkap untuk Setiap Kebutuhan</h2>
        <p class="section-subtitle mx-auto">
          Fitur praktis dan modern — siap membantu undangan Anda terasa personal, interaktif, dan berkesan.
        </p>
      </div>

      <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="card group hover:border-samasta-burgundy/20"
        >
          <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-samasta-burgundy/10 text-samasta-burgundy transition group-hover:bg-samasta-burgundy group-hover:text-white"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-display text-lg font-semibold text-samasta-burgundy">{{ feature.title }}</h3>
          <p class="mt-2 text-sm text-samasta-muted">{{ feature.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
