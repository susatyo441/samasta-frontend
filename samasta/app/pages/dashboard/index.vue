<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

useSeoMeta({ title: 'Dashboard – Samasta' })

const { user } = useAuth()
const { invitations } = useInvitationList()
</script>

<template>
  <div>
    <DashboardHeader
      :title="`Halo, ${user?.name?.split(' ')[0] || 'Sobat'}`"
      subtitle="Siap merayakan momen spesial hari ini?"
    />

    <div class="space-y-5 px-4 py-5 sm:px-6">
      <section class="overflow-hidden rounded-3xl bg-gradient-to-br from-samasta-burgundy to-samasta-burgundy-dark p-5 text-white shadow-soft">
        <p class="text-xs uppercase tracking-widest text-white/70">Paket {{ user?.plan }}</p>
        <h2 class="mt-2 font-display text-3xl font-semibold">Siap merayakan momen hangat?</h2>
        <p class="mt-2 text-sm text-white/80">
          Kelola undangan pernikahan atau ulang tahun dari satu dashboard yang manis dan rapi.
        </p>
        <NuxtLink
          to="/dashboard/undangan"
          class="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-samasta-burgundy"
        >
          Lihat Undangan
        </NuxtLink>
      </section>

      <section>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Undangan Terbaru</h3>
          <NuxtLink to="/dashboard/undangan" class="text-xs font-semibold text-samasta-burgundy">Semua</NuxtLink>
        </div>

        <div class="space-y-3">
          <NuxtLink
            v-for="invite in invitations"
            :key="invite.id"
            :to="`/dashboard/undangan/${invite.id}`"
            class="dash-card block transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-center gap-3">
              <div
                class="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br"
                :class="invite.coverGradient"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate font-medium text-samasta-charcoal">{{ invite.title }}</p>
                <p class="truncate text-xs text-samasta-muted">{{ invite.publicUrl }}</p>
                <UiStatusBadge class="mt-2" :status="invite.status" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
