<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const { getUserInvitations } = useAuth()
const invitations = computed(() => getUserInvitations())

useSeoMeta({ title: 'Undangan – Samasta' })
</script>

<template>
  <div>
    <DashboardHeader title="Undangan" subtitle="Kelola semua undangan digitalmu" />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <button type="button" class="btn-primary w-full sm:w-auto">+ Buat Undangan Baru</button>

      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="invite in invitations"
          :key="invite.id"
          :to="`/dashboard/undangan/${invite.id}`"
          class="dash-card block overflow-hidden !p-0 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="h-28 bg-gradient-to-br" :class="invite.coverGradient" />
          <div class="p-4">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <p class="truncate font-display text-xl font-semibold text-samasta-burgundy">{{ invite.title }}</p>
                <p class="mt-1 text-xs capitalize text-samasta-muted">{{ invite.eventType }}</p>
              </div>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                :class="invite.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
              >
                {{ invite.status }}
              </span>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-samasta-muted">
              <div>
                <p class="font-display text-lg text-samasta-burgundy">{{ invite.stats.guests }}</p>
                Tamu
              </div>
              <div>
                <p class="font-display text-lg text-samasta-burgundy">{{ invite.stats.attending }}</p>
                Hadir
              </div>
              <div>
                <p class="font-display text-lg text-samasta-burgundy">{{ invite.stats.messages }}</p>
                Ucapan
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
