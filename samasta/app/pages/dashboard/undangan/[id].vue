<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const { getInvitationById, editorModules } = useAuth()

const invitation = computed(() => getInvitationById(String(route.params.id)))
const active = ref(true)
const selectedModule = ref<string | null>(null)

watch(
  invitation,
  (value) => {
    active.value = value?.status === 'active'
  },
  { immediate: true },
)

useSeoMeta({
  title: computed(() => (invitation.value ? `Edit ${invitation.value.title}` : 'Edit Undangan')),
})
</script>

<template>
  <div>
    <DashboardHeader title="Edit Undangan" :subtitle="invitation?.title || 'Tidak ditemukan'" />

    <div v-if="!invitation" class="px-4 py-10 text-center text-samasta-muted">
      Undangan tidak ditemukan.
      <NuxtLink to="/dashboard/undangan" class="mt-3 block font-semibold text-samasta-burgundy">Kembali</NuxtLink>
    </div>

    <div v-else class="space-y-4 px-4 py-5 sm:px-6">
      <section class="dash-card">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="font-display text-2xl font-semibold text-samasta-burgundy sm:text-3xl">
              {{ invitation.title }}
            </h2>
            <NuxtLink
              :to="invitation.publicUrl"
              target="_blank"
              class="mt-1 block break-all text-xs text-samasta-muted underline-offset-2 hover:underline sm:text-sm"
            >
              {{ invitation.publicUrl }}
            </NuxtLink>
          </div>

          <label class="inline-flex items-center gap-2 rounded-full bg-samasta-cream px-3 py-2 text-xs font-semibold uppercase tracking-wide text-samasta-burgundy">
            <span>{{ active ? 'Aktif' : 'Nonaktif' }}</span>
            <input v-model="active" type="checkbox" class="h-4 w-4 accent-samasta-burgundy">
          </label>
        </div>

        <NuxtLink
          :to="invitation.publicUrl"
          target="_blank"
          class="btn-primary mt-4 inline-flex w-full sm:w-auto"
        >
          Lihat Undangan
        </NuxtLink>
      </section>

      <InviteStats
        :guests="invitation.stats.guests"
        :attending="invitation.stats.attending"
        :messages="invitation.stats.messages"
      />

      <section class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" class="btn-secondary !py-2.5 text-xs sm:text-sm">+ Tambah Pengelola</button>
        <p class="text-center text-xs text-samasta-muted sm:text-right">
          Akses Kode Undangan:
          <span class="font-semibold text-samasta-burgundy">{{ invitation.accessCode }}</span>
        </p>
      </section>

      <button type="button" class="w-full rounded-2xl bg-[#2A1F22] px-4 py-3.5 text-sm font-semibold text-white shadow-soft">
        Buka Layar Penerima Tamu
      </button>

      <InviteFeatureGrid
        :event-type="(invitation.eventType as 'wedding' | 'birthday' | 'other')"
        :modules="editorModules"
        @select="selectedModule = $event"
      />

      <button
        type="button"
        class="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-samasta-gold to-samasta-burgundy px-4 py-4 text-left text-white shadow-soft"
      >
        <span class="absolute right-3 top-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
          New Feature | Trial
        </span>
        <p class="font-display text-xl font-semibold">Event Planner</p>
        <p class="mt-1 text-xs text-white/85">Atur checklist, budget, dan timeline acaramu.</p>
      </button>
    </div>

    <InviteEditorSheet
      :module-id="selectedModule"
      :invitation="invitation"
      @close="selectedModule = null"
    />
  </div>
</template>
