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

const showQris = computed(
  () => Boolean(props.gift.qrisEnabled && props.gift.qrisImage?.url),
)

const showBanks = computed(
  () => Boolean(props.gift.cashlessEnabled && props.gift.bankAccounts?.length),
)

const showWishlist = computed(
  () => Boolean(props.gift.wishlistEnabled && props.gift.wishlistItems?.length),
)

const showShipping = computed(
  () => Boolean(props.gift.shippingEnabled && props.gift.shippingAddress?.trim()),
)

const hasGift = computed(
  () => showQris.value || showBanks.value || showWishlist.value || showShipping.value,
)
</script>

<template>
  <div v-if="hasGift" class="space-y-3">
    <h2 class="cp-section-title">Kado & Amplop</h2>

    <article v-if="showQris" class="cp-card !p-4 text-center">
      <p class="text-xs uppercase tracking-wider text-samasta-muted">QRIS</p>
      <p class="mt-1 text-sm text-samasta-muted">Scan untuk transfer</p>
      <div class="mx-auto mt-4 aspect-square w-48 overflow-hidden rounded-xl border border-[var(--cp-line)] bg-white">
        <img
          :src="gift.qrisImage!.url"
          :alt="gift.qrisImage?.label || 'QRIS'"
          class="h-full w-full object-contain p-3"
        >
      </div>
    </article>

    <div v-if="showBanks" class="space-y-2">
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

    <article v-if="showShipping" class="cp-card !p-4">
      <p class="text-xs uppercase tracking-wider text-samasta-muted">Kirim Kado</p>
      <p class="mt-2 whitespace-pre-line text-sm text-samasta-charcoal">
        {{ gift.shippingAddress }}
      </p>
    </article>

    <div v-if="showWishlist" class="space-y-2">
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
