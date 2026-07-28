<script setup lang="ts">
const faqs = [
  {
    q: 'Apakah Samasta gratis digunakan?',
    a: 'Ya, Samasta menyediakan paket gratis dengan fitur dasar dan pilihan tema terbatas. Untuk fitur lengkap, Anda bisa upgrade ke paket Premium atau Business.',
  },
  {
    q: 'Apakah ada fitur perencanaan acara?',
    a: 'Ya, Samasta dilengkapi Event Planner untuk membantu budgeting, manajemen vendor, to-do list, dan timeline acara agar persiapan lebih terstruktur.',
  },
  {
    q: 'Bagaimana cara upgrade ke Premium?',
    a: 'Upgrade langsung dari dashboard setelah membuat undangan. Pilih paket, lakukan pembayaran, dan undangan otomatis diaktifkan.',
  },
  {
    q: 'Apakah bisa ganti tema setelah dibuat?',
    a: 'Bisa. Ganti tema kapan saja melalui dashboard tanpa perlu membuat undangan baru.',
  },
  {
    q: 'Apakah ada dukungan pelanggan?',
    a: 'Ya, tim Samasta siap membantu melalui chat WhatsApp dengan respons cepat dan ramah.',
  },
  {
    q: 'Apakah mendukung acara selain pernikahan?',
    a: 'Ya, Samasta cocok untuk ulang tahun, reuni, acara perusahaan, dan berbagai perayaan lainnya.',
  },
]

const openIndex = ref<number | null>(0)
</script>

<template>
  <section id="faq" class="bg-section-gradient py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Pertanyaan yang Sering Diajukan</h2>
        <p class="section-subtitle mx-auto">Butuh bantuan? Mungkin jawaban Anda ada di sini.</p>
      </div>

      <div class="mx-auto mt-14 max-w-3xl space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between px-6 py-5 text-left"
            @click="openIndex = openIndex === i ? null : i"
          >
            <span class="pr-4 font-medium text-samasta-charcoal">{{ faq.q }}</span>
            <svg
              class="h-5 w-5 shrink-0 text-samasta-burgundy transition"
              :class="{ 'rotate-180': openIndex === i }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="openIndex === i" class="border-t border-samasta-burgundy/5 px-6 pb-5 pt-4">
            <p class="text-sm leading-relaxed text-samasta-muted">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
