<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { extractErrorMessage, handleMutationError } from '~/utils/handleMutationError'

definePageMeta({
  middleware: ['sanctum:guest'],
  layout: false,
})

const { login } = useAuth()

const { form, validationErrors, hasError } = useForm({
  email: 'demo@samasta.app',
  password: 'samasta123',
})

const error = ref('')

const { mutate: handleLogin, isLoading } = useMutation({
  mutation: () => login(form.value),
  onSuccess: () => {
    navigateTo('/dashboard')
  },
  onError: (err) => {
    error.value = extractErrorMessage(err, 'Email atau kata sandi salah.')
    handleMutationError(err, { validationErrors, silent: true })
  },
})

useSeoMeta({
  title: 'Masuk – Samasta',
})
</script>

<template>
  <AuthShell title="Selamat datang kembali" subtitle="Masuk untuk mengelola undangan digitalmu.">
    <form class="dash-card space-y-4 !p-5 sm:!p-6" @submit.prevent="() => handleLogin()">
      <UiFormField
        v-model="form.email"
        label="Email"
        name="email"
        type="email"
        required
        placeholder="nama@email.com"
        :error="hasError('email') ? validationErrors.email?.[0] : undefined"
      />
      <UiFormField
        v-model="form.password"
        label="Kata sandi"
        name="password"
        type="password"
        required
        placeholder="••••••••"
        :error="hasError('password') ? validationErrors.password?.[0] : undefined"
      />

      <p v-if="error" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{{ error }}</p>

      <button type="submit" class="btn-primary w-full" :disabled="isLoading">
        {{ isLoading ? 'Memproses...' : 'Masuk' }}
      </button>

      <p class="rounded-xl bg-samasta-cream px-3 py-2 text-center text-[11px] text-samasta-muted">
        Demo: <strong>demo@samasta.app</strong> / <strong>samasta123</strong>
      </p>
    </form>

    <template #footer>
      Belum punya akun?
      <NuxtLink to="/register" class="font-semibold text-samasta-burgundy">Daftar gratis</NuxtLink>
    </template>
  </AuthShell>
</template>
