<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { publicCatalogThemesQueryOptions } from '~/queries/invitations'
import { hasThemeLayout } from '~/themes/registry'

const themesQuery = useQuery(publicCatalogThemesQueryOptions())
const themes = computed(() => themesQuery.data.value?.data ?? [])

/** Static theme demos (no API) — see `app/data/themeDemos.ts`. */
const demoByTheme: Record<string, string> = {
  'aurora-pastel': '/demo/aurora-pastel',
  'confetti-pop': '/demo/confetti-pop',
}

function demoPath(themeId: string) {
  return demoByTheme[themeId] || null
}
</script>

<template>
  <section id="tema" class="bg-white py-20 lg:py-28">
    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Pilihan Tema Siap Pakai</h2>
        <p class="section-subtitle mx-auto">
          Tema dari katalog Samasta — pilih gaya yang cocok, lalu sesuaikan konten acara Anda.
        </p>
      </div>

      <div
        v-if="themesQuery.isLoading.value"
        class="mt-14 text-center text-sm text-samasta-muted"
      >
        Memuat katalog tema...
      </div>

      <div v-else class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <article
          v-for="theme in themes"
          :key="theme.id"
          class="group overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="aspect-[3/4] bg-gradient-to-br transition group-hover:scale-105"
            :class="theme.coverGradient || 'from-pink-100 to-amber-100'"
          >
            <div class="flex h-full flex-col items-center justify-center p-4">
              <span
                class="mb-2 rounded-full bg-white/80 px-3 py-0.5 text-xs font-medium text-samasta-burgundy"
              >
                {{ theme.tag || (theme.isPremium ? 'Premium' : 'Tema') }}
              </span>
              <p class="font-display text-center text-sm font-semibold text-samasta-burgundy sm:text-base">
                {{ theme.name }}
              </p>
              <p
                class="mt-2 text-[10px] font-semibold uppercase tracking-wide"
                :class="hasThemeLayout(theme.componentKey) ? 'text-emerald-700' : 'text-amber-700'"
              >
                {{ hasThemeLayout(theme.componentKey) ? 'Layout siap' : 'Preview gradient' }}
              </p>
            </div>
          </div>
          <div class="border-t border-samasta-burgundy/5 p-3 text-center">
            <NuxtLink
              v-if="demoPath(theme.id)"
              :to="demoPath(theme.id)!"
              target="_blank"
              class="text-xs font-medium text-samasta-burgundy hover:underline"
            >
              Lihat Demo →
            </NuxtLink>
            <NuxtLink
              v-else
              to="/register"
              class="text-xs font-medium text-samasta-muted hover:text-samasta-burgundy hover:underline"
            >
              Pakai tema →
            </NuxtLink>
          </div>
        </article>
      </div>

      <div class="mt-10 text-center">
        <NuxtLink to="/register" class="btn-secondary">Buat Undangan</NuxtLink>
      </div>
    </div>
  </section>
</template>
