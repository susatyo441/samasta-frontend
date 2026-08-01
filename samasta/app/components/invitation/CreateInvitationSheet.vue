<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { handleMutationError } from '~/utils/handleMutationError'
import { useInvitationMutations } from '~/composables/useInvitationMutations'

const emit = defineEmits<{
  close: []
  created: [id: number]
}>()

const { form, validationErrors, hasError, reset } = useForm({
  title: '',
  eventType: 'wedding',
  slug: '',
})

const { create } = useInvitationMutations()

const { mutate: submit, isLoading } = useMutation({
  mutation: async () => {
    const payload = {
      title: form.value.title.trim(),
      eventType: form.value.eventType,
      ...(form.value.slug.trim() ? { slug: form.value.slug.trim() } : {}),
    }
    const invitation = await create(payload)
    return invitation
  },
  onSuccess: (invitation) => {
    emit('created', invitation.id)
    reset()
    emit('close')
  },
  onError: (err) => handleMutationError(err, { validationErrors }),
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <form
      class="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-3xl sm:p-6"
      @submit.prevent="() => submit()"
    >
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">Buat Undangan Baru</h3>
          <p class="mt-1 text-xs text-samasta-muted">Isi judul undangan untuk mulai mengedit konten.</p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <div class="space-y-4">
        <UiFormField
          v-model="form.title"
          label="Judul undangan"
          name="title"
          required
          placeholder="Adit & Sari"
          :error="hasError('title') ? validationErrors.title?.[0] : undefined"
        />

        <div>
          <label class="mb-1 block text-xs font-medium text-samasta-muted">Jenis acara</label>
          <select v-model="form.eventType" class="input w-full">
            <option value="wedding">Pernikahan</option>
            <option value="birthday">Ulang tahun</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <UiFormField
          v-model="form.slug"
          label="Slug URL (opsional)"
          name="slug"
          placeholder="adit-sari"
          :error="hasError('slug') ? validationErrors.slug?.[0] : undefined"
        />
        <p class="text-[11px] text-samasta-muted">Kosongkan untuk generate otomatis dari judul.</p>
      </div>

      <button type="submit" class="btn-primary mt-5 w-full" :disabled="isLoading">
        {{ isLoading ? 'Membuat...' : 'Buat Undangan' }}
      </button>
    </form>
  </div>
</template>
