<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const email = ref('demo@samasta.app')
const password = ref('samasta123')
const error = ref('')
const loading = ref(false)
const { login } = useAuth()

async function onSubmit() {
  error.value = ''
  loading.value = true
  const result = login(email.value.trim(), password.value)
  loading.value = false

  if (!result.ok) {
    error.value = result.message
    return
  }

  await navigateTo('/dashboard')
}

useSeoMeta({
  title: 'Masuk – Samasta',
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-dash-warm">
    <div class="absolute -left-16 top-10 h-56 w-56 rounded-full bg-samasta-gold/25 blur-3xl" />
    <div class="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-samasta-burgundy/20 blur-3xl" />

    <div class="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-samasta-burgundy font-display text-xl font-bold text-white">
            S
          </span>
          <span class="font-display text-3xl font-semibold text-samasta-burgundy">Samasta</span>
        </NuxtLink>
        <h1 class="mt-6 font-display text-3xl font-semibold text-samasta-charcoal">Selamat datang kembali</h1>
        <p class="mt-2 text-sm text-samasta-muted">Masuk untuk mengelola undangan digitalmu.</p>
      </div>

      <form class="dash-card space-y-4 !p-5 sm:!p-6" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            placeholder="nama@email.com"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Kata sandi</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            placeholder="••••••••"
          >
        </div>

        <p v-if="error" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{{ error }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>

        <p class="rounded-xl bg-samasta-cream px-3 py-2 text-center text-[11px] text-samasta-muted">
          Demo: <strong>demo@samasta.app</strong> / <strong>samasta123</strong>
        </p>
      </form>

      <p class="mt-6 text-center text-sm text-samasta-muted">
        Belum punya akun?
        <NuxtLink to="/register" class="font-semibold text-samasta-burgundy">Daftar gratis</NuxtLink>
      </p>
    </div>
  </div>
</template>
