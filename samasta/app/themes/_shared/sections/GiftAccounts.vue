<script setup lang="ts">
import type { InvitationGift } from '~/types'
import { toast } from 'vue-sonner'

const props = defineProps<{
  gift: InvitationGift
}>()

const copied = ref<string | null>(null)

async function copyAccount(accountNumber: string) {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(accountNumber)
    copied.value = accountNumber
    toast.success('Nomor rekening disalin')
    setTimeout(() => {
      if (copied.value === accountNumber) copied.value = null
    }, 1600)
  } catch {
    toast.error('Gagal menyalin rekening')
  }
}

const hasGift = computed(
  () =>
    Boolean(props.gift.cashlessEnabled && props.gift.bankAccounts?.length) ||
    Boolean(props.gift.wishlistEnabled && props.gift.wishlistItems?.length),
)
</script>

<template>
  <div v-if="hasGift" class="space-y-3">
    <h2 class="cp-section-title">Kado & Amplop</h2>

    <div v-if="gift.cashlessEnabled" class="space-y-2">
      <article
        v-for="(acc, idx) in gift.bankAccounts"
        :key="idx"
        class="cp-card !p-4"
      >
        <p class="text-xs uppercase tracking-wider text-samasta-muted">Amplop Digital</p>
        <p class="mt-1 font-semibold text-samasta-charcoal">{{ acc.bankName }}</p>
        <p class="mt-1 font-mono text-sm">{{ acc.accountNumber }}</p>
        <p class="text-xs text-samasta-muted">a.n. {{ acc.accountHolder }}</p>
        <button
          type="button"
          class="cp-btn-secondary mt-3 !py-2 text-xs"
          @click="copyAccount(acc.accountNumber)"
        >
          {{ copied === acc.accountNumber ? 'Tersalin' : 'Salin Rekening' }}
        </button>
      </article>
    </div>

    <div v-if="gift.wishlistEnabled" class="space-y-2">
      <article
        v-for="(item, idx) in gift.wishlistItems"
        :key="idx"
        class="cp-card !p-4"
      >
        <p class="font-medium text-samasta-charcoal">{{ item.name }}</p>
        <p class="mt-1 text-sm text-[#E85D75]">
          Rp{{ item.price.toLocaleString('id-ID') }}
        </p>
      </article>
    </div>
  </div>
</template>
