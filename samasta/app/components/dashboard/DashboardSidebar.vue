<script setup lang="ts">
const { links, isActive } = useDashboardNav()
const { user } = useAuth()
const { signOut } = useLogout()
const { collapsed } = useDashboardSidebar()
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-[#2A1F22] text-white transition-transform duration-200 ease-out lg:flex"
    :class="collapsed ? '-translate-x-full pointer-events-none' : 'translate-x-0'"
    :aria-hidden="collapsed"
    :aria-expanded="!collapsed"
  >
    <nav class="flex-1 space-y-1 overflow-y-auto px-2 py-4">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition"
        :class="
          isActive(link.match)
            ? 'bg-white/10 text-white'
            : 'text-white/55 hover:bg-white/5 hover:text-white'
        "
        :tabindex="collapsed ? -1 : undefined"
      >
        <span class="text-base leading-none" aria-hidden="true">{{ link.icon }}</span>
        <span class="truncate">{{ link.label }}</span>
      </NuxtLink>
    </nav>

    <div class="shrink-0 border-t border-white/10 p-2">
      <div class="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-samasta-gold/90 text-xs font-semibold text-samasta-charcoal"
        >
          {{ user?.avatarInitials }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ user?.name }}</p>
          <p class="truncate text-[11px] text-white/45">{{ user?.plan }}</p>
        </div>
      </div>

      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
        :tabindex="collapsed ? -1 : undefined"
        @click="signOut"
      >
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <span>Keluar</span>
      </button>
    </div>
  </aside>
</template>
