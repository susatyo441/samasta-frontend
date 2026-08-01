<script setup lang="ts">
import type { Invitation, InvitationGift } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

const gift = ref<InvitationGift>({
  cashlessEnabled: false,
  shippingEnabled: false,
  wishlistEnabled: false,
  bankAccounts: [],
  shippingAddress: '',
  wishlistItems: [],
})

watch(
  () => props.invitation.gift,
  (value) => {
    gift.value = structuredClone({
      cashlessEnabled: false,
      shippingEnabled: false,
      wishlistEnabled: false,
      bankAccounts: [],
      shippingAddress: '',
      wishlistItems: [],
      ...value,
    })
    if (!gift.value.bankAccounts?.length) gift.value.bankAccounts = [{ bankName: '', accountNumber: '', accountHolder: '' }]
    if (!gift.value.wishlistItems?.length) gift.value.wishlistItems = [{ name: '', price: 0 }]
  },
  { immediate: true },
)

function addBankAccount() {
  gift.value.bankAccounts = [...(gift.value.bankAccounts ?? []), { bankName: '', accountNumber: '', accountHolder: '' }]
}

function removeBankAccount(index: number) {
  gift.value.bankAccounts?.splice(index, 1)
}

function addWishlistItem() {
  gift.value.wishlistItems = [...(gift.value.wishlistItems ?? []), { name: '', price: 0 }]
}

function removeWishlistItem(index: number) {
  gift.value.wishlistItems?.splice(index, 1)
}

function getPayload() {
  return {
    gift: {
      ...gift.value,
      bankAccounts: gift.value.bankAccounts?.filter((acc) => acc.bankName.trim() && acc.accountNumber.trim()),
      wishlistItems: gift.value.wishlistItems?.filter((item) => item.name.trim()),
    },
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-4 text-sm">
    <label class="flex items-center gap-2">
      <input v-model="gift.cashlessEnabled" type="checkbox" class="h-4 w-4">
      Amplop digital
    </label>
    <label class="flex items-center gap-2">
      <input v-model="gift.shippingEnabled" type="checkbox" class="h-4 w-4">
      Kirim ke alamat
    </label>
    <label class="flex items-center gap-2">
      <input v-model="gift.wishlistEnabled" type="checkbox" class="h-4 w-4">
      Wishlist
    </label>

    <div v-if="gift.cashlessEnabled" class="space-y-2">
      <p class="text-xs font-medium text-samasta-muted">Rekening bank</p>
      <div
        v-for="(acc, i) in gift.bankAccounts"
        :key="i"
        class="space-y-2 rounded-xl bg-samasta-cream p-3"
      >
        <input v-model="acc.bankName" class="input w-full" placeholder="Nama bank">
        <input v-model="acc.accountNumber" class="input w-full" placeholder="Nomor rekening">
        <input v-model="acc.accountHolder" class="input w-full" placeholder="Atas nama">
        <button type="button" class="text-xs text-red-600" @click="removeBankAccount(i)">Hapus</button>
      </div>
      <button type="button" class="btn-secondary w-full" @click="addBankAccount">+ Tambah rekening</button>
    </div>

    <div v-if="gift.shippingEnabled">
      <label class="text-xs font-medium text-samasta-muted">Alamat pengiriman</label>
      <textarea v-model="gift.shippingAddress" class="input mt-1 w-full" rows="2" />
    </div>

    <div v-if="gift.wishlistEnabled" class="space-y-2">
      <p class="text-xs font-medium text-samasta-muted">Wishlist</p>
      <div
        v-for="(item, i) in gift.wishlistItems"
        :key="i"
        class="grid grid-cols-[1fr_120px] gap-2 rounded-xl bg-samasta-cream p-3"
      >
        <input v-model="item.name" class="input w-full" placeholder="Nama barang">
        <input v-model.number="item.price" type="number" class="input w-full" placeholder="Harga">
        <button type="button" class="col-span-2 text-xs text-red-600" @click="removeWishlistItem(i)">Hapus</button>
      </div>
      <button type="button" class="btn-secondary w-full" @click="addWishlistItem">+ Tambah item</button>
    </div>
  </div>
</template>
