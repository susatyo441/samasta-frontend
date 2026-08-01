<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

useSeoMeta({ title: 'Undangan – Samasta' })

const { invitations } = useInvitations()
</script>

<template>
  <div>
    <DashboardHeader title="Undangan" subtitle="Kelola semua undangan digitalmu" />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <button type="button" class="btn-primary w-full sm:w-auto">+ Buat Undangan Baru</button>

      <div class="grid gap-3 sm:grid-cols-2">
        <InvitationCard
          v-for="invite in invitations"
          :key="invite.id"
          :invitation="invite"
        />
      </div>
    </div>
  </div>
</template>
