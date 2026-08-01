<script setup lang="ts">
import type { InvitationTheme } from '~/types'
import { INVITATION_EVENT_TYPES } from '~/constants/themes'

const props = defineProps<{
  theme: InvitationTheme
  canManage?: boolean
}>()

const emit = defineEmits<{
  edit: [theme: InvitationTheme]
  remove: [theme: InvitationTheme]
}>()

const eventLabels = computed(() =>
  props.theme.eventTypes
    .map((type) => INVITATION_EVENT_TYPES.find((item) => item.value === type)?.label ?? type)
    .join(' · '),
)
</script>

<template>
  <article class="dash-card overflow-hidden !p-0">
    <div
      class="relative aspect-[4/3] bg-gradient-to-br"
      :class="theme.coverGradient || 'from-samasta-cream-dark to-rose-100'"
    >
      <img
        v-if="theme.previewImage"
        :src="theme.previewImage"
        :alt="theme.name"
        class="absolute inset-0 h-full w-full object-cover"
      >
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <span
          v-if="theme.tag"
          class="rounded-full bg-white/85 px-3 py-0.5 text-xs font-medium text-samasta-burgundy"
        >
          {{ theme.tag }}
        </span>
        <p class="font-display text-center text-lg font-semibold text-samasta-burgundy drop-shadow-sm">
          {{ theme.name }}
        </p>
      </div>
      <div class="absolute right-3 top-3 flex flex-wrap justify-end gap-1">
        <span
          v-if="theme.isPremium"
          class="rounded-full bg-samasta-gold/95 px-2 py-0.5 text-[10px] font-semibold text-samasta-charcoal"
        >
          Premium
        </span>
        <span
          class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          :class="theme.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'"
        >
          {{ theme.isActive ? 'Aktif' : 'Nonaktif' }}
        </span>
      </div>
    </div>

    <div class="space-y-3 p-4">
      <div>
        <p class="font-mono text-[11px] text-samasta-muted">{{ theme.id }}</p>
        <p class="mt-1 text-xs text-samasta-muted">
          {{ eventLabels || 'Semua tipe acara' }}
        </p>
        <p class="mt-0.5 text-[11px] text-samasta-muted/80">
          Urutan {{ theme.sortOrder }} · {{ theme.componentKey }}
        </p>
      </div>

      <div v-if="canManage" class="flex gap-2">
        <button type="button" class="btn-secondary flex-1 !px-3 !py-2 text-xs" @click="emit('edit', theme)">
          Edit
        </button>
        <button
          type="button"
          class="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
          @click="emit('remove', theme)"
        >
          Hapus
        </button>
      </div>
    </div>
  </article>
</template>
