<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { register } = useAuth()

async function onSubmit() {
  error.value = ''
  loading.value = true
  const result = register({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: password.value,
  })
  loading.value = false

  if (!result.ok) {
    error.value = result.message
    return
  }

  await navigateTo('/dashboard')
}

useSeoMeta({
  title: 'Daftar – Samasta',
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-dash-warm">
    <div class="absolute -right-12 top-8 h-52 w-52 rounded-full bg-samasta-burgundy/20 blur-3xl" />
    <div class="absolute -left-8 bottom-8 h-60 w-60 rounded-full bg-samasta-gold/25 blur-3xl" />

    <div class="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-samasta-burgundy font-display text-xl font-bold text-white">
            S
          </span>
          <span class="font-display text-3xl font-semibold text-samasta-burgundy">Samasta</span>
        </NuxtLink>
        <h1 class="mt-6 font-display text-3xl font-semibold text-samasta-charcoal">Buat akun Samasta</h1>
        <p class="mt-2 text-sm text-samasta-muted">Mulai buat undangan pernikahan atau ulang tahun.</p>
      </div>

      <form class="dash-card space-y-4 !p-5 sm:!p-6" @submit.prevent="onSubmit">
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Nama lengkap</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">No. WhatsApp</label>
          <input
            v-model="phone"
            type="tel"
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Kata sandi</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>

        <p v-if="error" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{{ error }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Membuat akun...' : 'Daftar Sekarang' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-samasta-muted">
        Sudah punya akun?
        <NuxtLink to="/login" class="font-semibold text-samasta-burgundy">Masuk</NuxtLink>
      </p>
    </div>
  </div>
</template>
