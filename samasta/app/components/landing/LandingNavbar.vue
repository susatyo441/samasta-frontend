<script setup lang="ts">
const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tema', href: '#tema' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
]

const mobileOpen = ref(false)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-samasta-burgundy/10 bg-samasta-cream/90 backdrop-blur-md">
    <nav class="section-container flex h-16 items-center justify-between lg:h-20">
      <a href="#beranda" class="flex items-center gap-2">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full bg-samasta-burgundy font-display text-lg font-bold text-white"
        >
          S
        </span>
        <span class="font-display text-2xl font-semibold tracking-wide text-samasta-burgundy">Samasta</span>
      </a>

      <ul class="hidden items-center gap-8 lg:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="text-sm font-medium text-samasta-muted transition hover:text-samasta-burgundy"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="hidden items-center gap-3 lg:flex">
        <NuxtLink to="/login" class="text-sm font-medium text-samasta-muted transition hover:text-samasta-burgundy">
          Masuk
        </NuxtLink>
        <NuxtLink to="/register" class="btn-primary !px-5 !py-2.5">Buat Undangan</NuxtLink>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2 text-samasta-burgundy lg:hidden"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="mobileOpen"
      class="border-t border-samasta-burgundy/10 bg-samasta-cream px-4 py-4 lg:hidden"
    >
      <ul class="space-y-3">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="block py-2 text-sm font-medium text-samasta-charcoal"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="flex gap-3 pt-2">
          <NuxtLink to="/login" class="btn-secondary flex-1 text-center" @click="mobileOpen = false">Masuk</NuxtLink>
          <NuxtLink to="/register" class="btn-primary flex-1 text-center" @click="mobileOpen = false">Buat Undangan</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
