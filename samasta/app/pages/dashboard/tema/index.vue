<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { toast } from 'vue-sonner'
import { INVITATION_EVENT_TYPES, THEME_PERMISSIONS } from '~/constants/themes'
import type {
  InvitationEventType,
  InvitationTheme,
  InvitationThemeFilters,
  InvitationThemePayload,
} from '~/types'
import { handleMutationError } from '~/utils/handleMutationError'

definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth', 'admin-themes'],
})

useSeoMeta({ title: 'Kelola Tema – Samasta' })

const { hasPermission } = useAuth()
const canManage = computed(() => hasPermission(THEME_PERMISSIONS.manage))

const filters = reactive<InvitationThemeFilters>({
  q: '',
  isActive: null,
  eventType: '',
  page: 1,
  perPage: 15,
})

const debouncedQ = ref('')
let searchTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => filters.q,
  (value) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      debouncedQ.value = value ?? ''
      filters.page = 1
    }, 300)
  },
)

const queryFilters = computed<InvitationThemeFilters>(() => ({
  q: debouncedQ.value,
  isActive: filters.isActive,
  eventType: filters.eventType,
  page: filters.page,
  perPage: filters.perPage,
}))

const { themes, meta, listQuery } = useInvitationThemes(queryFilters)
const { createTheme, updateTheme, removeTheme } = useInvitationThemeMutations()

const sheetOpen = ref(false)
const editingTheme = ref<InvitationTheme | null>(null)
const formSheet = useTemplateRef<{
  validationErrors: Ref<Partial<Record<keyof InvitationThemePayload, string[]>>>
}>('formSheet')

const { mutate: saveTheme, isLoading: saving } = useMutation({
  mutation: async (payload: InvitationThemePayload) => {
    if (editingTheme.value) {
      return updateTheme(editingTheme.value.id, payload)
    }
    return createTheme(payload)
  },
  onSuccess: () => {
    toast.success(editingTheme.value ? 'Tema diperbarui' : 'Tema ditambahkan')
    sheetOpen.value = false
    editingTheme.value = null
  },
  onError: (err) => {
    handleMutationError(err, {
      validationErrors: formSheet.value?.validationErrors,
    })
  },
})

const { mutate: confirmDelete, isLoading: deleting } = useMutation({
  mutation: (theme: InvitationTheme) => removeTheme(theme.id),
  onSuccess: () => toast.success('Tema dihapus'),
  onError: (err) => handleMutationError(err),
})

function openCreate() {
  editingTheme.value = null
  sheetOpen.value = true
}

function openEdit(theme: InvitationTheme) {
  editingTheme.value = theme
  sheetOpen.value = true
}

function onRemove(theme: InvitationTheme) {
  if (!import.meta.client) return
  const ok = window.confirm(`Hapus tema “${theme.name}”? Tindakan ini tidak bisa dibatalkan.`)
  if (ok) confirmDelete(theme)
}

function setActiveFilter(value: boolean | null) {
  filters.isActive = value
  filters.page = 1
}

function setEventType(value: InvitationEventType | '') {
  filters.eventType = value
  filters.page = 1
}

const totalPages = computed(() => meta.value?.last_page ?? 1)
const isLoading = computed(
  () => Boolean(listQuery.isLoading?.value ?? listQuery.asyncStatus?.value === 'loading') && !listQuery.data.value,
)
</script>

<template>
  <div>
    <DashboardHeader
      title="Tema Undangan"
      subtitle="Kelola template yang tersedia untuk pengguna"
    />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 sm:max-w-sm">
          <input
            v-model="filters.q"
            type="search"
            placeholder="Cari nama atau slug..."
            class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
          >
        </div>
        <button
          v-if="canManage"
          type="button"
          class="btn-primary w-full sm:w-auto"
          @click="openCreate"
        >
          + Tambah Tema
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition"
          :class="filters.isActive === null ? 'bg-samasta-burgundy text-white' : 'bg-white text-samasta-muted'"
          @click="setActiveFilter(null)"
        >
          Semua
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition"
          :class="filters.isActive === true ? 'bg-samasta-burgundy text-white' : 'bg-white text-samasta-muted'"
          @click="setActiveFilter(true)"
        >
          Aktif
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition"
          :class="filters.isActive === false ? 'bg-samasta-burgundy text-white' : 'bg-white text-samasta-muted'"
          @click="setActiveFilter(false)"
        >
          Nonaktif
        </button>
        <span class="mx-1 hidden h-6 w-px bg-samasta-burgundy/15 sm:inline-block" />
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition"
          :class="!filters.eventType ? 'bg-samasta-cream-dark text-samasta-burgundy' : 'bg-white text-samasta-muted'"
          @click="setEventType('')"
        >
          Semua acara
        </button>
        <button
          v-for="item in INVITATION_EVENT_TYPES"
          :key="item.value"
          type="button"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition"
          :class="
            filters.eventType === item.value
              ? 'bg-samasta-cream-dark text-samasta-burgundy'
              : 'bg-white text-samasta-muted'
          "
          @click="setEventType(item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <p v-if="meta" class="text-xs text-samasta-muted">
        {{ meta.total }} tema · halaman {{ meta.current_page }} / {{ meta.last_page }}
      </p>

      <div v-if="isLoading" class="dash-card py-10 text-center text-sm text-samasta-muted">
        Memuat tema...
      </div>

      <div
        v-else-if="!themes.length"
        class="dash-card py-10 text-center text-sm text-samasta-muted"
      >
        Belum ada tema yang cocok dengan filter ini.
      </div>

      <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <ThemeCard
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          :can-manage="canManage"
          @edit="openEdit"
          @remove="onRemove"
        />
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-2">
        <button
          type="button"
          class="btn-secondary !px-4 !py-2 text-xs"
          :disabled="(filters.page ?? 1) <= 1 || deleting"
          @click="filters.page = Math.max(1, (filters.page ?? 1) - 1)"
        >
          Sebelumnya
        </button>
        <button
          type="button"
          class="btn-secondary !px-4 !py-2 text-xs"
          :disabled="(filters.page ?? 1) >= totalPages || deleting"
          @click="filters.page = Math.min(totalPages, (filters.page ?? 1) + 1)"
        >
          Berikutnya
        </button>
      </div>
    </div>

    <ThemeFormSheet
      v-if="canManage"
      ref="formSheet"
      :open="sheetOpen"
      :theme="editingTheme"
      :saving="saving"
      @close="sheetOpen = false"
      @submit="(payload) => saveTheme(payload)"
    />
  </div>
</template>
