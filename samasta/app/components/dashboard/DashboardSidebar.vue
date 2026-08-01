<script setup lang="ts">
const route = useRoute()
const { user, logout } = useAuth()

const links = [
  { to: '/dashboard', label: 'Home', icon: 'home', match: ['/dashboard'] },
  { to: '/dashboard/undangan', label: 'Undangan', icon: 'invite', match: ['/dashboard/undangan'] },
  { to: '/dashboard/transaksi', label: 'Transaksi', icon: 'trx', match: ['/dashboard/transaksi'] },
  { to: '/dashboard/bantuan', label: 'Bantuan', icon: 'help', match: ['/dashboard/bantuan'] },
]

function isActive(match: string[]) {
  return match.some((path) => route.path === path || route.path.startsWith(`${path}/`))
}

async function onLogout() {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <aside class="hidden min-h-screen w-64 shrink-0 flex-col bg-[#2A1F22] text-white lg:flex">
    <div class="flex items-center gap-2 px-5 py-6">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-samasta-burgundy font-display text-lg font-bold">
        S
      </span>
      <div>
        <p class="font-display text-xl font-semibold">Samasta</p>
        <p class="text-xs text-white/50">Dashboard</p>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-3">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition"
        :class="isActive(link.match) ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'"
      >
        <span class="text-base">{{ link.icon === 'home' ? '⌂' : link.icon === 'invite' ? '✉' : link.icon === 'trx' ? '◈' : '?' }}</span>
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div class="border-t border-white/10 p-4">
      <div class="mb-3 flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-samasta-gold/90 text-sm font-semibold text-samasta-charcoal">
          {{ user?.avatarInitials }}
        </span>
        <div class="min-w-0">
          <p class="truncate text-sm font-medium">{{ user?.name }}</p>
          <p class="truncate text-xs text-white/50">{{ user?.plan }}</p>
        </div>
      </div>
      <button
        type="button"
        class="w-full rounded-xl border border-white/15 px-3 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
        @click="onLogout"
      >
        Keluar / Logout
      </button>
    </div>
  </aside>
</template>
