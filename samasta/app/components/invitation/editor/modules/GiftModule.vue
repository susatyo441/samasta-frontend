<script setup lang="ts">
import type { Invitation, InvitationGift } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

const gift = computed(() => (props.invitation.gift || {}) as InvitationGift)
</script>

<template>
  <div class="space-y-3 text-sm">
    <p>Amplop Digital: <strong>{{ gift.cashlessEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
    <p>Kirim ke Alamat: <strong>{{ gift.shippingEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
    <p>Wishlist: <strong>{{ gift.wishlistEnabled ? 'Aktif' : 'Nonaktif' }}</strong></p>
    <div v-for="(acc, i) in gift.bankAccounts" :key="i" class="rounded-xl bg-samasta-cream p-3">
      {{ acc.bankName }} · {{ acc.accountNumber }} · {{ acc.accountHolder }}
    </div>
  </div>
</template>
