<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

import { toast } from 'vue-sonner'
import { buildInvitationUrl } from '~/utils/invitationUrl'
import { useInvitationMutations } from '~/composables/useInvitationMutations'
import { handleMutationError } from '~/utils/handleMutationError'

const route = useRoute()
const { user } = useAuth()
const { invitation } = useInvitationById(computed(() => String(route.params.id)))
const { editorModules } = useInvitations()
const { update } = useInvitationMutations(() => route.params.id)

useSeoMeta({
  title: computed(() => (invitation.value ? `Edit ${invitation.value.title}` : 'Edit Undangan')),
})

const active = ref(true)
const selectedModule = ref<string | null>(null)
const showPublish = ref(false)
const copied = ref(false)
const statusSaving = ref(false)

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

const isDraft = computed(() => invitation.value?.status === 'draft')

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

async function toggleStatus() {
  if (!invitation.value || statusSaving.value) return

  const nextStatus = active.value ? 'active' : 'draft'
  if (nextStatus === invitation.value.status) return

  statusSaving.value = true
  try {
    await update({ status: nextStatus })
    toast.success(nextStatus === 'active' ? 'Undangan diaktifkan.' : 'Undangan dinonaktifkan.')
  } catch (err) {
    active.value = invitation.value.status === 'active'
    handleMutationError(err)
  } finally {
    statusSaving.value = false
  }
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
                :disabled="statusSaving"
                @change="toggleStatus"
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

          <button
            v-if="isDraft"
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-samasta-burgundy"
            @click="showPublish = true"
          >
            Publikasikan Undangan
          </button>
        </section>

        <section class="space-y-4 bg-[#F7F4F2] px-4 py-5 sm:px-5">
          <p class="text-center text-sm text-samasta-muted">
            Kode Akses Undangan
            <span class="ml-1 font-semibold tracking-wide text-samasta-burgundy">
              {{ invitation.accessCode }}
            </span>
          </p>

          <InvitationFeatureGrid
            :event-type="(invitation.eventType as 'wedding' | 'birthday' | 'other')"
            :modules="editorModules"
            @select="onSelectModule"
          />
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
