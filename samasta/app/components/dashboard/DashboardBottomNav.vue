<script setup lang="ts">
const { links, isActive } = useDashboardNav()

const gridClass = computed(() => {
  const count = links.value.length
  if (count <= 3) return 'grid-cols-3'
  if (count === 4) return 'grid-cols-4'
  if (count === 5) return 'grid-cols-5'
  return 'grid-cols-6'
})
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 border-t border-samasta-burgundy/10 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur lg:hidden"
  >
    <ul class="grid gap-0.5" :class="gridClass">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition sm:text-[11px]"
          :class="isActive(link.match) ? 'bg-samasta-cream-dark text-samasta-burgundy' : 'text-samasta-muted'"
        >
          <span class="text-base leading-none">{{ link.icon }}</span>
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
