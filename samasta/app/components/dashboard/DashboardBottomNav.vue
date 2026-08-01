<script setup lang="ts">
const { links, isActive } = useDashboardNav()
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 border-t border-samasta-burgundy/10 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur lg:hidden"
  >
    <ul class="grid grid-cols-4 gap-1">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition"
          :class="isActive(link.match) ? 'bg-samasta-cream-dark text-samasta-burgundy' : 'text-samasta-muted'"
        >
          <span class="text-base leading-none">{{ link.icon }}</span>
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
