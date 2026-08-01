<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()

const { user } = useAuth()
const { signOut } = useLogout()
const { collapsed, toggle } = useDashboardSidebar()
const menuOpen = ref(false)

async function onLogout() {
  menuOpen.value = false
  await signOut()
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  if (!import.meta.client) return
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-samasta-burgundy/10 bg-white/80 backdrop-blur-md">
    <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <button
          type="button"
          class="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-samasta-charcoal/70 transition hover:bg-samasta-cream-dark hover:text-samasta-charcoal lg:inline-flex"
          :aria-label="collapsed ? 'Perluas sidebar' : 'Minimize sidebar'"
          :aria-pressed="collapsed"
          @click="toggle"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5A1.5 1.5 0 0121.75 6.75v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 5.25v13.5" />
          </svg>
        </button>

        <span class="hidden h-5 w-px shrink-0 bg-samasta-burgundy/15 lg:block" aria-hidden="true" />

        <div class="min-w-0">
          <p class="truncate font-display text-xl font-semibold text-samasta-burgundy sm:text-2xl">
            {{ title }}
          </p>
          <p v-if="subtitle" class="truncate text-xs text-samasta-muted sm:text-sm">{{ subtitle }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="relative flex h-10 w-10 items-center justify-center rounded-full bg-samasta-cream-dark text-samasta-burgundy"
          aria-label="Notifikasi"
        >
          <span>🔔</span>
          <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-samasta-burgundy" />
        </button>

        <div class="relative" @click.stop>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-samasta-burgundy text-sm font-semibold text-white"
            aria-label="Menu profil"
            aria-haspopup="true"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            {{ user?.avatarInitials || 'SA' }}
          </button>

          <div
            v-if="menuOpen"
            class="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-soft"
          >
            <div class="border-b border-samasta-burgundy/10 px-4 py-3">
              <p class="truncate text-sm font-semibold text-samasta-charcoal">{{ user?.name }}</p>
              <p class="truncate text-xs text-samasta-muted">{{ user?.email }}</p>
              <p class="mt-1 text-[11px] font-medium text-samasta-burgundy">Paket {{ user?.plan }}</p>
            </div>
            <button
              type="button"
              class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
              @click="onLogout"
            >
              <span>⎋</span>
              Keluar / Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
