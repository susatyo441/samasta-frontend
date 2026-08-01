<script setup lang="ts">
import { useMutation, useQueryCache } from '@pinia/colada'
import { toast } from 'vue-sonner'
import type { Invitation } from '~/types'
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { EDITOR_INPUT_CLASS } from '~/utils/invitationEditor'
import {
  deleteInvitationMedia,
  INVITATION_QUERY_KEYS,
  uploadInvitationMedia,
} from '~/queries/invitations'
import { handleMutationError } from '~/utils/handleMutationError'

const props = defineProps<{
  invitation: Invitation
  draft: InvitationEditorDraft
}>()

const queryCache = useQueryCache()
const qrisInput = ref<HTMLInputElement | null>(null)

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

async function refreshInvitation() {
  await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.root })
}

const { mutate: uploadQris, isLoading: uploadingQris } = useMutation({
  mutation: async (file: File) =>
    uploadInvitationMedia(props.invitation.id, file, 'qris', 'QRIS'),
  onSuccess: async (result) => {
    props.draft.gift.qrisImage = result.data
    props.draft.gift.qrisEnabled = true
    toast.success('Gambar QRIS diunggah')
    await refreshInvitation()
  },
  onError: (err) => handleMutationError(err),
})

const { mutate: removeQris, isLoading: deletingQris } = useMutation({
  mutation: async () => {
    const id = props.draft.gift.qrisImage?.id
    if (!id) throw new Error('QRIS belum diunggah')
    return deleteInvitationMedia(props.invitation.id, id)
  },
  onSuccess: async () => {
    props.draft.gift.qrisImage = null
    toast.success('QRIS dihapus')
    await refreshInvitation()
  },
  onError: (err) => handleMutationError(err),
})

function onQrisChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) uploadQris(file)
  ;(event.target as HTMLInputElement).value = ''
}
</script>

<template>
  <div class="space-y-4 text-sm">
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.cashlessEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Amplop digital (rekening)
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.qrisEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Tampilkan QRIS
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.shippingEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Kirim kado ke alamat
    </label>
    <label class="flex items-center gap-2 rounded-2xl border border-samasta-burgundy/10 px-3 py-3">
      <input v-model="draft.gift.wishlistEnabled" type="checkbox" class="rounded border-samasta-burgundy/30">
      Wishlist
    </label>

    <div v-if="draft.gift.qrisEnabled" class="space-y-2 rounded-2xl border border-samasta-burgundy/10 p-3">
      <p class="font-semibold text-samasta-burgundy">QRIS</p>
      <p class="text-xs text-samasta-muted">
        Unggah gambar QRIS dari aplikasi bank / e-wallet. Tamu bisa scan dari undangan.
      </p>
      <div
        v-if="draft.gift.qrisImage?.url"
        class="mx-auto aspect-square w-40 overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white"
      >
        <img
          :src="draft.gift.qrisImage.url"
          alt="QRIS"
          class="h-full w-full object-contain p-2"
        >
      </div>
      <input ref="qrisInput" type="file" accept="image/*" class="hidden" @change="onQrisChange">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn-secondary !px-3 !py-1.5 text-xs"
          :disabled="uploadingQris"
          @click="qrisInput?.click()"
        >
          {{ uploadingQris ? 'Mengunggah...' : draft.gift.qrisImage ? 'Ganti QRIS' : 'Unggah QRIS' }}
        </button>
        <button
          v-if="draft.gift.qrisImage"
          type="button"
          class="text-xs font-semibold text-rose-600"
          :disabled="deletingQris"
          @click="() => removeQris()"
        >
          Hapus
        </button>
      </div>
    </div>

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

    <div v-if="draft.gift.shippingEnabled" class="space-y-2">
      <p class="font-semibold text-samasta-burgundy">Alamat pengiriman</p>
      <textarea
        v-model="draft.gift.shippingAddress"
        rows="3"
        :class="EDITOR_INPUT_CLASS"
        placeholder="Alamat lengkap untuk kirim kado"
      />
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
