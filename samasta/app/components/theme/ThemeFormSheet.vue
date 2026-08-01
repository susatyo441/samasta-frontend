<script setup lang="ts">
import type { InvitationEventType, InvitationTheme, InvitationThemePayload } from '~/types'
import { INVITATION_EVENT_TYPES, THEME_COVER_GRADIENTS } from '~/constants/themes'

const props = defineProps<{
  open: boolean
  theme?: InvitationTheme | null
  saving?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: InvitationThemePayload]
}>()

const isEdit = computed(() => Boolean(props.theme))

const emptyForm = (): InvitationThemePayload => ({
  slug: '',
  name: '',
  tag: '',
  coverGradient: THEME_COVER_GRADIENTS[0],
  previewImagePath: '',
  eventTypes: ['wedding', 'birthday', 'other'],
  componentKey: '',
  isPremium: false,
  isActive: true,
  sortOrder: 0,
})

const { form, validationErrors, reset, hasError } = useForm(emptyForm)

watch(
  () => [props.open, props.theme] as const,
  ([open, theme]) => {
    if (!open) return
    validationErrors.value = {}
    if (theme) {
      form.value = {
        slug: theme.id,
        name: theme.name,
        tag: theme.tag ?? '',
        coverGradient: theme.coverGradient ?? THEME_COVER_GRADIENTS[0],
        previewImagePath: '',
        eventTypes: [...theme.eventTypes],
        componentKey: theme.componentKey,
        isPremium: theme.isPremium,
        isActive: theme.isActive,
        sortOrder: theme.sortOrder,
      }
    } else {
      reset()
    }
  },
)

function toggleEventType(type: InvitationEventType) {
  const current = form.value.eventTypes ?? []
  if (current.includes(type)) {
    form.value.eventTypes = current.filter((item) => item !== type)
  } else {
    form.value.eventTypes = [...current, type]
  }
}

function onSubmit() {
  const path = form.value.previewImagePath?.trim() || ''
  const payload: InvitationThemePayload = {
    slug: form.value.slug.trim(),
    name: form.value.name.trim(),
    tag: form.value.tag?.trim() || null,
    coverGradient: form.value.coverGradient?.trim() || null,
    eventTypes: form.value.eventTypes?.length
      ? form.value.eventTypes
      : ['wedding', 'birthday', 'other'],
    componentKey: form.value.componentKey?.trim() || undefined,
    isPremium: Boolean(form.value.isPremium),
    isActive: Boolean(form.value.isActive),
    sortOrder: Number(form.value.sortOrder) || 0,
  }

  if (path) {
    payload.previewImagePath = path
  } else if (!isEdit.value) {
    payload.previewImagePath = null
  }

  emit('submit', payload)
}

defineExpose({ validationErrors })
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      @click.self="emit('close')"
    >
      <div
        class="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-xl sm:max-w-lg sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        :aria-label="isEdit ? 'Edit tema' : 'Tambah tema'"
      >
        <div class="sticky top-0 z-10 flex items-center justify-between border-b border-samasta-burgundy/10 bg-white px-5 py-4">
          <div>
            <h2 class="font-display text-xl font-semibold text-samasta-burgundy">
              {{ isEdit ? 'Edit Tema' : 'Tambah Tema' }}
            </h2>
            <p class="text-xs text-samasta-muted">Template undangan untuk dipilih pengguna</p>
          </div>
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm text-samasta-muted hover:bg-samasta-cream"
            @click="emit('close')"
          >
            Tutup
          </button>
        </div>

        <form class="space-y-4 px-5 py-5" @submit.prevent="onSubmit">
          <UiFormField
            v-model="form.name"
            label="Nama tema"
            name="name"
            required
            placeholder="Confetti Pop"
            :error="hasError('name') ? validationErrors.name?.[0] : undefined"
          />

          <UiFormField
            v-model="form.slug"
            label="Slug"
            name="slug"
            required
            placeholder="confetti-pop"
            :error="hasError('slug') ? validationErrors.slug?.[0] : undefined"
          />

          <UiFormField
            v-model="form.tag"
            label="Tag"
            name="tag"
            placeholder="Ceria"
            :error="hasError('tag') ? validationErrors.tag?.[0] : undefined"
          />

          <UiFormField
            v-model="form.componentKey"
            label="Component key"
            name="componentKey"
            placeholder="Kosongkan = ikut slug"
            :error="hasError('componentKey') ? validationErrors.componentKey?.[0] : undefined"
          />

          <div>
            <p class="mb-1.5 text-xs font-medium text-samasta-muted">Cover gradient</p>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="gradient in THEME_COVER_GRADIENTS"
                :key="gradient"
                type="button"
                class="aspect-square rounded-xl bg-gradient-to-br ring-offset-2 transition"
                :class="[
                  gradient,
                  form.coverGradient === gradient ? 'ring-2 ring-samasta-burgundy' : 'ring-1 ring-samasta-burgundy/10',
                ]"
                :title="gradient"
                @click="form.coverGradient = gradient"
              />
            </div>
            <UiFormField
              v-model="form.coverGradient!"
              class="mt-3"
              label="Custom gradient class"
              name="coverGradient"
              placeholder="from-pink-100 to-amber-100"
              :error="hasError('coverGradient') ? validationErrors.coverGradient?.[0] : undefined"
            />
          </div>

          <UiFormField
            v-model="form.previewImagePath!"
            label="Preview image path"
            name="previewImagePath"
            placeholder="themes/preview.jpg (opsional)"
            :error="hasError('previewImagePath') ? validationErrors.previewImagePath?.[0] : undefined"
          />

          <div>
            <p class="mb-1.5 text-xs font-medium text-samasta-muted">Tipe acara</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in INVITATION_EVENT_TYPES"
                :key="item.value"
                type="button"
                class="rounded-full px-3 py-1.5 text-xs font-medium transition"
                :class="
                  form.eventTypes?.includes(item.value)
                    ? 'bg-samasta-burgundy text-white'
                    : 'bg-samasta-cream text-samasta-muted'
                "
                @click="toggleEventType(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
            <p v-if="hasError('eventTypes')" class="mt-1 text-xs text-rose-600">
              {{ validationErrors.eventTypes?.[0] }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
              <input v-model="form.isActive" type="checkbox" class="rounded border-samasta-burgundy/30">
              Aktif
            </label>
            <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3 text-sm">
              <input v-model="form.isPremium" type="checkbox" class="rounded border-samasta-burgundy/30">
              Premium
            </label>
          </div>

          <div>
            <label for="sortOrder" class="mb-1.5 block text-xs font-medium text-samasta-muted">Urutan</label>
            <input
              id="sortOrder"
              v-model.number="form.sortOrder"
              type="number"
              min="0"
              class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
            >
            <p v-if="hasError('sortOrder')" class="mt-1 text-xs text-rose-600">
              {{ validationErrors.sortOrder?.[0] }}
            </p>
          </div>

          <div class="flex gap-2 pt-2">
            <button type="button" class="btn-secondary flex-1" @click="emit('close')">Batal</button>
            <button type="submit" class="btn-primary flex-1" :disabled="saving">
              {{ saving ? 'Menyimpan...' : isEdit ? 'Simpan' : 'Tambah' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
