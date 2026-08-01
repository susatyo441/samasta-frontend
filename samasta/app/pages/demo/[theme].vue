<script setup lang="ts">
import type { Component } from 'vue'
import { getThemeDemo } from '~/data/themeDemos'
import { hasThemeLayout, resolveTheme } from '~/themes/registry'
import { STATIC_THEME_DEMO_KEY } from '~/utils/staticThemeDemo'

definePageMeta({
  layout: false,
})

const route = useRoute()
const themeKey = computed(() => String(route.params.theme || ''))

const invitation = computed(() => getThemeDemo(themeKey.value))
const isValidTheme = computed(
  () => Boolean(invitation.value) && hasThemeLayout(themeKey.value),
)

provide(STATIC_THEME_DEMO_KEY, true)

const ThemeView = shallowRef<Component | null>(null)

watch(
  themeKey,
  async (key) => {
    ThemeView.value = null
    if (!key || !hasThemeLayout(key) || !getThemeDemo(key)) return
    const { loader } = resolveTheme(key)
    const mod = await loader()
    ThemeView.value = markRaw(mod.default)
  },
  { immediate: true },
)

useSeoMeta({
  title: computed(() =>
    invitation.value
      ? `Demo ${invitation.value.title} – Samasta`
      : 'Demo tema tidak ditemukan',
  ),
  description: 'Pratinjau tema undangan Samasta (konten contoh, bukan undangan nyata).',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <div
      class="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 border-b border-black/5 bg-white/90 px-4 py-2.5 text-xs backdrop-blur sm:px-6"
    >
      <p class="text-samasta-muted">
        <span class="font-semibold text-samasta-burgundy">Demo tema</span>
        — konten contoh, tidak tersambung ke API
      </p>
      <NuxtLink to="/#tema" class="shrink-0 font-medium text-samasta-burgundy hover:underline">
        ← Katalog tema
      </NuxtLink>
    </div>

    <div v-if="!isValidTheme" class="flex min-h-screen items-center justify-center bg-samasta-cream px-4 pt-16 text-center">
      <div>
        <p class="font-display text-3xl text-samasta-burgundy">Demo tidak tersedia</p>
        <p class="mt-2 text-sm text-samasta-muted">Tema ini belum punya layout atau data contoh.</p>
        <NuxtLink to="/#tema" class="btn-primary mt-6 inline-flex">Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <div v-else-if="ThemeView && invitation" class="pt-10">
      <component :is="ThemeView" :invitation="invitation" />
    </div>
  </div>
</template>
