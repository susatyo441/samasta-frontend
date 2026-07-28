<script setup lang="ts">
const reasons = [
  {
    title: 'Desain Khas & Berkelas',
    description:
      'Koleksi tema eksklusif dengan nuansa hangat — dari minimalis modern, floral lembut, hingga sentuhan adat Nusantara yang timeless.',
    icon: 'palette',
  },
  {
    title: 'Mudah Diedit, Tanpa Ribet',
    description:
      'Ubah teks, foto, musik, dan jadwal acara hanya dengan beberapa klik. Tidak perlu keahlian desain atau software rumit.',
    icon: 'edit',
  },
  {
    title: 'Undangan Personal per Tamu',
    description:
      'Setiap tamu dipanggil dengan namanya langsung di undangan, plus QR Code unik agar mereka merasa lebih dihargai.',
    icon: 'user',
  },
]
</script>

<template>
  <section class="bg-white py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Kenapa Ribuan Pasangan Memilih Samasta?</h2>
        <p class="section-subtitle mx-auto">
          Platform undangan digital yang dirancang untuk momen spesial Anda — cantik, praktis, dan penuh makna.
        </p>
      </div>

      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <article v-for="item in reasons" :key="item.title" class="card text-center">
          <div
            class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-samasta-cream-dark text-samasta-burgundy"
          >
            <svg v-if="item.icon === 'palette'" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <svg v-else-if="item.icon === 'edit'" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <svg v-else class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-samasta-muted">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
