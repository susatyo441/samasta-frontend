<script setup lang="ts">
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'

const props = defineProps<{
  draft: InvitationEditorDraft
}>()

function addAccount() {
  if (!props.draft.gift.bankAccounts) props.draft.gift.bankAccounts = []
  props.draft.gift.bankAccounts.push({ bankName: '', accountNumber: '', accountHolder: '' })
}

function removeAccount(index: number) {
  props.draft.gift.bankAccounts?.splice(index, 1)
}

function addWishlist() {
  if (!props.draft.gift.wishlistItems) props.draft.gift.wishlistItems = []
  props.draft.gift.wishlistItems.push({ name: '', price: 0 })
}

function removeWishlist(index: number) {
  props.draft.gift.wishlistItems?.splice(index, 1)
}
</script>

<template>
  <div class="space-y-4 text-sm">
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.cashlessEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Amplop digital
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.shippingEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Kirim kado ke alamat
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.wishlistEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Wishlist
    </label>

    <div v-if="draft.gift.cashlessEnabled" class="space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-semibold text-samasta-burgundy">Rekening</p>
        <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addAccount">+ Tambah</button>
      </div>
      <div
        v-for="(acc, idx) in draft.gift.bankAccounts"
        :key="idx"
        class="space-y-2 rounded-2xl bg-samasta-cream p-3"
      >
        <div class="flex justify-end">
          <button type="button" class="text-[11px] text-rose-600" @click="removeAccount(idx)">Hapus</button>
        </div>
        <input v-model="acc.bankName" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Bank">
        <input v-model="acc.accountNumber" type="text" :class="EDITOR_INPUT_CLASS" placeholder="No. rekening">
        <input v-model="acc.accountHolder" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Atas nama">
      </div>
    </div>

    <div v-if="draft.gift.wishlistEnabled" class="space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-semibold text-samasta-burgundy">Wishlist</p>
        <button type="button" class="text-xs font-semibold text-samasta-burgundy" @click="addWishlist">+ Tambah</button>
      </div>
      <div
        v-for="(item, idx) in draft.gift.wishlistItems"
        :key="idx"
        class="space-y-2 rounded-2xl bg-samasta-cream p-3"
      >
        <div class="flex justify-end">
          <button type="button" class="text-[11px] text-rose-600" @click="removeWishlist(idx)">Hapus</button>
        </div>
        <input v-model="item.name" type="text" :class="EDITOR_INPUT_CLASS" placeholder="Nama barang">
        <input v-model.number="item.price" type="number" min="0" :class="EDITOR_INPUT_CLASS" placeholder="Harga">
      </div>
    </div>
  </div>
</template>
