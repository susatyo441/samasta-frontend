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
  <AuthShell title="Buat akun Samasta" subtitle="Mulai buat undangan pernikahan atau ulang tahun.">
    <form class="dash-card space-y-4 !p-5 sm:!p-6" @submit.prevent="() => handleRegister()">
      <UiFormField
        v-model="form.name"
        label="Nama lengkap"
        name="name"
        required
        :error="hasError('name') ? validationErrors.name?.[0] : undefined"
      />
      <UiFormField
        v-model="form.email"
        label="Email"
        name="email"
        type="email"
        required
        :error="hasError('email') ? validationErrors.email?.[0] : undefined"
      />
      <UiFormField v-model="form.phone" label="No. WhatsApp" name="phone" type="tel" />
      <UiFormField
        v-model="form.password"
        label="Kata sandi"
        name="password"
        type="password"
        required
        :error="hasError('password') ? validationErrors.password?.[0] : undefined"
      />

      <p v-if="error" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{{ error }}</p>

      <button type="submit" class="btn-primary w-full" :disabled="isLoading">
        {{ isLoading ? 'Membuat akun...' : 'Daftar Sekarang' }}
      </button>
    </form>

    <template #footer>
      Sudah punya akun?
      <NuxtLink to="/login" class="font-semibold text-samasta-burgundy">Masuk</NuxtLink>
    </template>
  </AuthShell>
</template>
