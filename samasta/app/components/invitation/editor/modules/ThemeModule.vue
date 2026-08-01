<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { catalogThemesQueryOptions } from '~/queries/invitations'
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'
import { themeRegistry } from '~/themes/registry'

const props = defineProps<{
  draft: InvitationEditorDraft
  eventType?: string
}>()

const themesQuery = useQuery(() => catalogThemesQueryOptions(props.eventType))
const themes = computed(() => themesQuery.data.value?.data ?? [])

function selectTheme(slug: string, coverGradient?: string | null) {
  props.draft.themeId = slug
  if (coverGradient) props.draft.coverGradient = coverGradient
}

const hasFrontendPackage = (key: string) => Boolean(themeRegistry[key])
</script>

<template>
  <div class="space-y-4">
    <p class="text-sm text-samasta-muted">
      Pilih tema yang akan dipakai di halaman publik. Layout Vue hanya tersedia untuk tema yang sudah
      diimplementasikan di frontend.
    </p>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        class="overflow-hidden rounded-2xl border text-left transition"
        :class="
          draft.themeId === theme.id
            ? 'border-samasta-burgundy ring-2 ring-samasta-burgundy/30'
            : 'border-samasta-burgundy/10 hover:border-samasta-burgundy/30'
        "
        @click="selectTheme(theme.id, theme.coverGradient)"
      >
        <div
          class="aspect-[4/3] bg-gradient-to-br"
          :class="theme.coverGradient || 'from-pink-100 to-amber-100'"
        >
          <img
            v-if="theme.previewImage"
            :src="theme.previewImage"
            :alt="theme.name"
            class="h-full w-full object-cover"
          >
        </div>
        <div class="space-y-1 p-3">
          <div class="flex items-center justify-between gap-2">
            <p class="truncate text-sm font-semibold text-samasta-burgundy">{{ theme.name }}</p>
            <span
              v-if="theme.isPremium"
              class="rounded-full bg-samasta-gold/90 px-1.5 py-0.5 text-[9px] font-bold text-samasta-charcoal"
            >
              PRO
            </span>
          </div>
          <p class="text-[11px] text-samasta-muted">{{ theme.tag || theme.id }}</p>
          <p
            class="text-[10px] font-medium"
            :class="hasFrontendPackage(theme.componentKey) ? 'text-emerald-600' : 'text-amber-600'"
          >
            {{ hasFrontendPackage(theme.componentKey) ? 'Layout siap' : 'Fallback layout' }}
          </p>
        </div>
      </button>
    </div>

    <p v-if="!themes.length" class="rounded-2xl bg-samasta-cream px-4 py-6 text-center text-sm text-samasta-muted">
      Katalog tema belum tersedia.
    </p>

    <div>
      <label class="text-xs font-medium text-samasta-muted">Cover gradient (Tailwind)</label>
      <input v-model="draft.coverGradient" type="text" :class="EDITOR_INPUT_CLASS" placeholder="from-pink-100 to-amber-100">
    </div>
  </div>
</template>
