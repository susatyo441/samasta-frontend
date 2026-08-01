<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

import { useMutation, useQueryCache } from '@pinia/colada'
import { toast } from 'vue-sonner'
import { buildInvitationUrl } from '~/utils/invitationUrl'
import { INVITATION_QUERY_KEYS, updateInvitation } from '~/queries/invitations'
import { handleMutationError } from '~/utils/handleMutationError'

const route = useRoute()
const { user } = useAuth()
const { invitation } = useInvitationById(computed(() => String(route.params.id)))
const { editorModules } = useInvitations()
const queryCache = useQueryCache()

useSeoMeta({
  title: computed(() => (invitation.value ? `Edit ${invitation.value.title}` : 'Edit Undangan')),
})

const active = ref(true)
const selectedModule = ref<string | null>(null)
const showPublish = ref(false)
const copied = ref(false)

const isDraft = computed(() => invitation.value?.status === 'draft')

function onSelectModule(moduleId: string) {
  if (moduleId === 'rsvp') {
    navigateTo(`/dashboard/undangan/${route.params.id}/rsvp`)
    return
  }
  selectedModule.value = moduleId
}

watch(
  invitation,
  (value) => {
    active.value = value?.status === 'active'
  },
  { immediate: true },
)

const inviteLink = computed(() => {
  if (!invitation.value) return ''
  return buildInvitationUrl(invitation.value.publicUrl)
})

async function copyLink() {
  if (!inviteLink.value || !import.meta.client) return
  try {
    await navigator.clipboard.writeText(inviteLink.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}

const { mutate: toggleStatus, isLoading: togglingStatus } = useMutation({
  mutation: async (nextActive: boolean) => {
    if (!invitation.value) throw new Error('Undangan tidak ditemukan')
    return updateInvitation(invitation.value.id, {
      status: nextActive ? 'active' : 'draft',
    })
  },
  onSuccess: async () => {
    toast.success(active.value ? 'Undangan diaktifkan' : 'Undangan dinonaktifkan')
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.root })
  },
  onError: (err) => {
    active.value = invitation.value?.status === 'active'
    handleMutationError(err)
  },
})

function onActiveChange() {
  toggleStatus(active.value)
}
</script>

<template>
  <div class="relative">
    <DashboardHeader title="Edit Undangan" :subtitle="invitation?.title || 'Tidak ditemukan'" />

    <div v-if="!invitation" class="px-4 py-10 text-center text-samasta-muted">
      Undangan tidak ditemukan.
      <NuxtLink to="/dashboard/undangan" class="mt-3 block font-semibold text-samasta-burgundy">Kembali</NuxtLink>
    </div>

    <div v-else class="mx-auto max-w-xl px-3 py-4 sm:px-6 sm:py-6">
      <div class="mb-3 flex items-center justify-between gap-3">
        <NuxtLink
          to="/dashboard/undangan"
          class="inline-flex items-center gap-1 text-sm font-medium text-samasta-burgundy"
        >
          <span aria-hidden="true">←</span> Kembali
        </NuxtLink>
        <span class="text-xs font-medium text-samasta-muted">
          {{ user?.plan === 'Gratis' ? 'Gratisan' : user?.plan }}
        </span>
      </div>

      <div class="overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-soft">
        <section class="bg-samasta-burgundy px-4 pb-5 pt-5 text-white sm:px-5">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="truncate font-display text-2xl font-semibold sm:text-3xl">
                {{ invitation.title }}
              </h2>
              <p v-if="invitation.themeId" class="mt-1 text-xs text-white/70">
                Tema: {{ invitation.themeId }}
              </p>
              <div class="mt-2 flex items-center gap-2">
                <NuxtLink
                  :to="invitation.publicUrl"
                  target="_blank"
                  class="truncate text-xs text-white/85 underline-offset-2 hover:underline sm:text-sm"
                >
                  {{ inviteLink }}
                </NuxtLink>
                <button
                  type="button"
                  class="shrink-0 rounded-md bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
                  @click="copyLink"
                >
                  {{ copied ? 'Copied' : 'Copy' }}
                </button>
              </div>
            </div>

            <label class="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide">
              {{ active ? 'Aktif' : 'Off' }}
              <input
                v-model="active"
                type="checkbox"
                class="h-4 w-4 accent-green-400"
                :disabled="togglingStatus"
                @change="onActiveChange"
              >
            </label>
          </div>

          <UiStatGrid
            class="mt-5"
            variant="header"
            :guests="invitation.stats?.guests ?? 0"
            :attending="invitation.stats?.attending ?? 0"
            :messages="invitation.stats?.messages ?? 0"
          />

          <div class="mt-4 grid grid-cols-2 gap-2">
            <NuxtLink
              :to="`/dashboard/undangan/${invitation.id}/rsvp`"
              class="inline-flex items-center justify-center rounded-xl bg-white/15 px-3 py-2.5 text-xs font-semibold text-white ring-1 ring-white/25"
            >
              RSVP & Tamu
            </NuxtLink>
            <NuxtLink
              :to="`/dashboard/undangan/${invitation.id}/analytics`"
              class="inline-flex items-center justify-center rounded-xl bg-white/15 px-3 py-2.5 text-xs font-semibold text-white ring-1 ring-white/25"
            >
              Analitik
            </NuxtLink>
          </div>
          <button
            v-if="isDraft"
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-samasta-burgundy"
            @click="showPublish = true"
          >
            Publikasikan Undangan
          </button>

          <button
            v-else
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25"
            @click="selectedModule = 'theme'"
          >
            <span aria-hidden="true">◐</span> Pilih / Ganti Tema
          </button>
        </section>

        <section class="space-y-4 bg-[#F7F4F2] px-4 py-5 sm:px-5">
          <p class="text-center text-sm text-samasta-muted">
            Kode Akses Undangan
            <span class="ml-1 font-semibold tracking-wide text-samasta-burgundy">
              {{ invitation.accessCode }}
            </span>
          </p>

          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2A1F22] px-4 py-3.5 text-sm font-semibold text-white"
          >
            <span aria-hidden="true">▣</span>
            Buka Layar Penerima Tamu
          </button>

          <InvitationFeatureGrid
            :event-type="(invitation.eventType as 'wedding' | 'birthday' | 'other')"
            :modules="editorModules"
            @select="onSelectModule"
          />

          <button
            type="button"
            class="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-samasta-burgundy px-4 py-4 text-white"
            @click="selectedModule = 'event-planner'"
          >
            <span
              class="absolute right-2 top-2 rounded-md bg-samasta-sage px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
            >
              New Feature | Trial
            </span>
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span class="font-semibold">Event Planner</span>
          </button>
        </section>
      </div>

      <p class="mt-6 text-center text-[11px] text-samasta-muted">
        Made with ♥ for your Moment · Powered by Samasta
      </p>
    </div>

    <NuxtLink
      v-if="invitation"
      :to="invitation.publicUrl"
      target="_blank"
      class="fixed right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-l-xl bg-white px-2 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-samasta-burgundy shadow-soft [writing-mode:vertical-rl] sm:inline-flex"
    >
      Preview
    </NuxtLink>

    <InvitationEditorSheet
      :module-id="selectedModule"
      :invitation="invitation"
      @close="selectedModule = null"
    />

    <InvitationPublishSheet
      v-if="showPublish && invitation"
      :invitation="invitation"
      @close="showPublish = false"
      @published="showPublish = false"
    />
  </div>
</template>
