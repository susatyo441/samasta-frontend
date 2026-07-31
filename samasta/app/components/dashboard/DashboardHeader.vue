<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()

const { user, logout } = useAuth()
const menuOpen = ref(false)

async function onLogout() {
  menuOpen.value = false
  logout()
  await navigateTo('/login')
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
      <div class="min-w-0">
        <p class="truncate font-display text-xl font-semibold text-samasta-burgundy sm:text-2xl">
          {{ title }}
        </p>
        <p v-if="subtitle" class="truncate text-xs text-samasta-muted sm:text-sm">{{ subtitle }}</p>
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
