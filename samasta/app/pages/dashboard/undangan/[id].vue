<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

const route = useRoute()
const { user } = useAuth()
const { invitation } = useInvitationById(computed(() => String(route.params.id)))
const { editorModules } = useInvitations()

const active = ref(true)
const selectedModule = ref<string | null>(null)
const copied = ref(false)

watch(
  invitation,
  (value) => {
    active.value = value?.status === 'active'
  },
  { immediate: true },
)

const inviteLink = computed(() => {
  if (!invitation.value) return ''
  if (import.meta.client) {
    return `${window.location.origin}${invitation.value.publicUrl}`
  }
  return invitation.value.publicUrl
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

useSeoMeta({
  title: computed(() => (invitation.value ? `Edit ${invitation.value.title}` : 'Edit Undangan')),
})
</script>

<template>
  <div class="relative">
    <DashboardHeader title="Edit Undangan" :subtitle="invitation?.title || 'Tidak ditemukan'" />

    <div v-if="!invitation" class="px-4 py-10 text-center text-samasta-muted">
      Undangan tidak ditemukan.
      <NuxtLink to="/dashboard/undangan" class="mt-3 block font-semibold text-samasta-burgundy">Kembali</NuxtLink>
    </div>

    <div v-else class="mx-auto max-w-xl px-3 py-4 sm:px-6 sm:py-6">
      <!-- Top bar -->
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

      <!-- Main edit panel -->
      <div class="overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-soft">
        <!-- Status header -->
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
              >
            </label>
          </div>

          <!-- Stats -->
          <div class="mt-5 grid grid-cols-3 gap-2">
            <div class="rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal">
              <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">
                {{ invitation.stats?.guests ?? 0 }}
              </p>
              <p class="mt-0.5 text-[10px] text-samasta-muted sm:text-xs">Tamu</p>
            </div>
            <div class="rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal">
              <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">
                {{ invitation.stats?.attending ?? 0 }}
              </p>
              <p class="mt-0.5 text-[10px] text-samasta-muted sm:text-xs">Akan Hadir</p>
            </div>
            <div class="rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal">
              <p class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">
                {{ invitation.stats?.messages ?? 0 }}
              </p>
              <p class="mt-0.5 text-[10px] text-samasta-muted sm:text-xs">Ucapan</p>
            </div>
          </div>

          <button
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-samasta-burgundy"
          >
            <span aria-hidden="true">＋</span> Tambah Pengelola
          </button>
        </section>

        <!-- Body -->
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

          <!-- Feature menus -->
          <DashboardInviteFeatureGrid
            :event-type="(invitation.eventType as 'wedding' | 'birthday' | 'other')"
            :modules="editorModules"
            @select="selectedModule = $event"
          />

          <!-- Event Planner -->
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

    <!-- Preview side tab -->
    <NuxtLink
      v-if="invitation"
      :to="invitation.publicUrl"
      target="_blank"
      class="fixed right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-l-xl bg-white px-2 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-samasta-burgundy shadow-soft [writing-mode:vertical-rl] sm:inline-flex"
    >
      Preview
    </NuxtLink>

    <DashboardInviteEditorSheet
      :module-id="selectedModule"
      :invitation="invitation"
      @close="selectedModule = null"
    />
  </div>
</template>
