<script setup lang="ts">
import type { Invitation } from '~/types'
import { buildInvitationUrl, buildWhatsappShareUrl } from '~/utils/invitationUrl'

const props = defineProps<{
  invitation: Invitation
}>()

const inviteLink = computed(() => buildInvitationUrl(props.invitation.publicUrl))
const whatsappShareUrl = computed(() => buildWhatsappShareUrl(props.invitation.publicUrl))
</script>

<template>
  <div class="space-y-3">
    <div class="rounded-2xl bg-samasta-cream p-4">
      <p class="text-xs text-samasta-muted">Link undangan</p>
      <p class="mt-1 break-all text-sm font-medium text-samasta-burgundy">{{ inviteLink }}</p>
    </div>
    <NuxtLink :to="invitation.publicUrl" target="_blank" class="btn-primary block w-full text-center">
      Lihat Halaman Undangan
    </NuxtLink>
    <a :href="whatsappShareUrl" target="_blank" class="btn-secondary block w-full text-center">
      Kirim via WhatsApp
    </a>
  </div>
</template>
