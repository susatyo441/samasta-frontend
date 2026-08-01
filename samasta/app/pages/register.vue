<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { extractErrorMessage, handleMutationError } from '~/utils/handleMutationError'

definePageMeta({
  middleware: ['sanctum:guest'],
  layout: false,
})

const { register } = useAuth()

const { form, validationErrors, hasError } = useForm({
  name: '',
  email: '',
  phone: '',
  password: '',
})

const error = ref('')

const { mutate: handleRegister, isLoading } = useMutation({
  mutation: () =>
    register({
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      phone: form.value.phone.trim() || undefined,
      password: form.value.password,
    }),
  onSuccess: () => {
    navigateTo('/dashboard')
  },
  onError: (err) => {
    error.value = extractErrorMessage(err, 'Pendaftaran gagal. Periksa data Anda.')
    handleMutationError(err, { validationErrors, silent: true })
  },
})

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

      <form class="dash-card space-y-4 !p-5 sm:!p-6" @submit.prevent="() => handleRegister()">
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Nama lengkap</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            :aria-invalid="hasError('name')"
          >
          <p v-if="hasError('name')" class="mt-1 text-xs text-rose-600">{{ validationErrors.name?.[0] }}</p>
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            :aria-invalid="hasError('email')"
          >
          <p v-if="hasError('email')" class="mt-1 text-xs text-rose-600">{{ validationErrors.email?.[0] }}</p>
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">No. WhatsApp</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-samasta-muted">Kata sandi</label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            :aria-invalid="hasError('password')"
          >
          <p v-if="hasError('password')" class="mt-1 text-xs text-rose-600">{{ validationErrors.password?.[0] }}</p>
        </div>

        <p v-if="error" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{{ error }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="isLoading">
          {{ isLoading ? 'Membuat akun...' : 'Daftar Sekarang' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-samasta-muted">
        Sudah punya akun?
        <NuxtLink to="/login" class="font-semibold text-samasta-burgundy">Masuk</NuxtLink>
      </p>
    </div>
  </div>
</template>
