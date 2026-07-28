<script setup lang="ts">
const footerLinks = {
  produk: [
    { label: 'Buat Undangan', href: '#' },
    { label: 'Tema Undangan', href: '#tema' },
    { label: 'Fitur Lengkap', href: '#fitur' },
    { label: 'Harga & Paket', href: '#harga' },
  ],
  informasi: [
    { label: 'Dashboard', href: '#' },
    { label: 'Artikel & Blog', href: '#' },
    { label: 'Contoh Undangan', href: '#tema' },
    { label: 'FAQ', href: '#faq' },
  ],
}
</script>

<template>
  <footer class="bg-samasta-burgundy-dark text-white">
    <div class="section-container py-16">
      <div class="grid gap-10 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <a href="#beranda" class="flex items-center gap-2">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white font-display text-lg font-bold text-samasta-burgundy"
            >
              S
            </span>
            <span class="font-display text-2xl font-semibold">Samasta</span>
          </a>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Samasta adalah platform undangan digital pernikahan &amp; acara online dengan template modern, RSVP
            real-time, galeri foto &amp; video, serta fitur amplop digital dan wishlist kado.
          </p>
          <div class="mt-6 flex gap-4">
            <a href="#" class="text-white/60 transition hover:text-white" aria-label="Instagram">IG</a>
            <a href="#" class="text-white/60 transition hover:text-white" aria-label="TikTok">TT</a>
            <a href="#" class="text-white/60 transition hover:text-white" aria-label="YouTube">YT</a>
          </div>
        </div>

        <div>
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-samasta-gold">Produk</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.produk" :key="link.label">
              <a :href="link.href" class="text-sm text-white/70 transition hover:text-white">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-samasta-gold">Informasi</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.informasi" :key="link.label">
              <a :href="link.href" class="text-sm text-white/70 transition hover:text-white">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row"
      >
        <p>© 2026 Samasta. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#" class="hover:text-white">Syarat &amp; Ketentuan</a>
          <a href="#" class="hover:text-white">Kebijakan Privasi</a>
          <a href="#" class="hover:text-white">Kontak Kami</a>
        </div>
      </div>
    </div>

    <a
      href="#"
      class="fixed bottom-6 right-6 z-40 hidden rounded-full bg-samasta-gold px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-95 sm:inline-flex"
    >
      Buat Undangan Gratis
    </a>
  </footer>
</template>
