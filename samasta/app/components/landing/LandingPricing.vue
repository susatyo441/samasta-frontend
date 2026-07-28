<script setup lang="ts">
const plans = [
  {
    name: 'Gratis',
    price: 'Rp0',
    originalPrice: null,
    badge: 'Coba Dulu',
    highlight: false,
    features: [
      '1 Undangan Standar',
      'Aktif 14 Hari',
      'Kuota Tamu Terbatas',
      'Galeri Terbatas',
      'Musik Latar',
      'Ucapan & Doa',
      'Tema Terbatas',
    ],
    cta: 'Daftar Gratis',
  },
  {
    name: 'Premium',
    price: 'Rp79K',
    originalPrice: 'Rp120.000',
    badge: 'Paling Favorit',
    highlight: true,
    features: [
      '1 Undangan Premium',
      'Aktif Selamanya',
      'Unlimited Tamu',
      'Unlimited Galeri',
      'Musik Latar',
      'Ucapan & Doa',
      'Tema Premium',
      'Amplop Digital',
      'Link Streaming',
      'Layar Tamu',
    ],
    cta: 'Pilih Premium',
  },
  {
    name: 'Business',
    price: 'Rp119K',
    originalPrice: 'Rp220.000',
    badge: 'Untuk 2 Acara',
    highlight: false,
    features: [
      '2 Undangan Premium',
      'Aktif Selamanya',
      'Unlimited Tamu',
      'Unlimited Galeri',
      'Semua Fitur Premium',
      'Amplop Digital',
      'Link Streaming',
      'Layar Tamu',
      'Wishlist Premium',
    ],
    cta: 'Upgrade Business',
  },
]
</script>

<template>
  <section id="harga" class="bg-white py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Harga Transparan, Sekali Bayar</h2>
        <p class="section-subtitle mx-auto">
          Mulai dari Rp0 — pilih paket yang paling pas, tanpa biaya bulanan atau tahunan.
        </p>
      </div>

      <div class="mt-14 grid gap-8 lg:grid-cols-3">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex flex-col rounded-2xl border p-8 transition hover:shadow-lg"
          :class="
            plan.highlight
              ? 'border-samasta-burgundy bg-samasta-burgundy text-white shadow-xl shadow-samasta-burgundy/20'
              : 'border-samasta-burgundy/10 bg-white'
          "
        >
          <span
            class="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            :class="
              plan.highlight
                ? 'bg-white/20 text-white'
                : 'bg-samasta-cream-dark text-samasta-burgundy'
            "
          >
            {{ plan.badge }}
          </span>

          <h3
            class="font-display text-2xl font-semibold"
            :class="plan.highlight ? 'text-white' : 'text-samasta-burgundy'"
          >
            {{ plan.name }}
          </h3>

          <div class="mt-4 flex items-baseline gap-2">
            <span v-if="plan.originalPrice" class="text-sm line-through opacity-60">
              {{ plan.originalPrice }}
            </span>
            <span class="font-display text-4xl font-bold">{{ plan.price }}</span>
          </div>

          <ul class="mt-8 flex-1 space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-2 text-sm"
              :class="plan.highlight ? 'text-white/90' : 'text-samasta-muted'"
            >
              <svg
                class="mt-0.5 h-4 w-4 shrink-0"
                :class="plan.highlight ? 'text-samasta-gold' : 'text-samasta-sage'"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <a
            href="#"
            class="mt-8 block rounded-full py-3 text-center text-sm font-semibold transition"
            :class="
              plan.highlight
                ? 'bg-white text-samasta-burgundy hover:bg-samasta-cream'
                : 'bg-samasta-burgundy text-white hover:bg-samasta-burgundy-dark'
            "
          >
            {{ plan.cta }}
          </a>
        </article>
      </div>

      <p class="mt-8 text-center text-xs text-samasta-muted">
        *Harga sekali bayar. Upgrade dari Gratis ke Premium/Business kapan saja.
      </p>
    </div>
  </section>
</template>
