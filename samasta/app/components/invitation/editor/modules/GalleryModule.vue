<script setup lang="ts">
import { useMutation, useQueryCache } from '@pinia/colada'
import {
  deleteInvitationMedia,
  INVITATION_QUERY_KEYS,
  uploadInvitationMedia,
} from '~/queries/invitations'
import type { Invitation } from '~/types'
import type { InvitationEditorDraft } from '~/utils/invitationEditor'
import { handleMutationError } from '~/utils/handleMutationError'
import { toast } from 'vue-sonner'

const props = defineProps<{
  invitation: Invitation
  draft: InvitationEditorDraft
}>()

const queryCache = useQueryCache()
const coverInput = ref<HTMLInputElement | null>(null)
const galleryInput = ref<HTMLInputElement | null>(null)
const galleryLabel = ref('Foto')

async function refreshInvitation() {
  await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.root })
}

const { mutate: uploadCover, isLoading: uploadingCover } = useMutation({
  mutation: async (file: File) => uploadInvitationMedia(props.invitation.id, file, 'cover', 'Cover'),
  onSuccess: async (result) => {
    props.draft.coverImage = result.data
    toast.success('Cover diunggah')
    await refreshInvitation()
  },
  onError: (err) => handleMutationError(err),
})

const { mutate: uploadGallery, isLoading: uploadingGallery } = useMutation({
  mutation: async (file: File) =>
    uploadInvitationMedia(props.invitation.id, file, 'gallery', galleryLabel.value || 'Foto'),
  onSuccess: async (result) => {
    props.draft.gallery = [...props.draft.gallery, result.data]
    toast.success('Foto galeri ditambahkan')
    await refreshInvitation()
  },
  onError: (err) => handleMutationError(err),
})

const { mutate: removeGallery, isLoading: deleting } = useMutation({
  mutation: async (mediaId: string) => deleteInvitationMedia(props.invitation.id, mediaId),
  onSuccess: async (_result, mediaId) => {
    props.draft.gallery = props.draft.gallery.filter((item) => item.id !== mediaId)
    toast.success('Media dihapus')
    await refreshInvitation()
  },
  onError: (err) => handleMutationError(err),
})

function onCoverChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) uploadCover(file)
}

function onGalleryChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) uploadGallery(file)
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm font-semibold text-samasta-burgundy">Cover undangan</p>
      <div
        class="aspect-[5/4] overflow-hidden rounded-2xl bg-gradient-to-br from-samasta-cream-dark to-rose-100"
        :style="draft.coverImage?.url ? { backgroundImage: `url(${draft.coverImage.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined"
      />
      <input ref="coverInput" type="file" accept="image/*" class="hidden" @change="onCoverChange">
      <button
        type="button"
        class="btn-secondary mt-3 w-full !py-2 text-xs"
        :disabled="uploadingCover"
        @click="coverInput?.click()"
      >
        {{ uploadingCover ? 'Mengunggah...' : 'Unggah Cover' }}
      </button>
    </div>

    <div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <p class="text-sm font-semibold text-samasta-burgundy">Galeri</p>
        <input v-model="galleryLabel" type="text" class="w-32 rounded-lg border border-samasta-burgundy/15 px-2 py-1 text-xs" placeholder="Label">
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="item in draft.gallery"
          :key="item.id"
          class="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-samasta-cream-dark to-rose-100"
          :style="item.url ? { backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined"
        >
          <div class="absolute inset-x-0 bottom-0 bg-black/45 p-2 text-white">
            <p class="truncate text-[11px] font-medium">{{ item.label }}</p>
          </div>
          <button
            type="button"
            class="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-rose-600"
            :disabled="deleting"
            @click="removeGallery(item.id)"
          >
            Hapus
          </button>
        </div>
      </div>

      <input ref="galleryInput" type="file" accept="image/*" class="hidden" @change="onGalleryChange">
      <button
        type="button"
        class="btn-secondary mt-3 w-full !py-2 text-xs"
        :disabled="uploadingGallery"
        @click="galleryInput?.click()"
      >
        {{ uploadingGallery ? 'Mengunggah...' : '+ Tambah Foto Galeri' }}
      </button>
      <p class="mt-2 text-[11px] text-samasta-muted">
        Media langsung tersimpan ke server. Tema publik akan menampilkan cover & galeri ini.
      </p>
    </div>
  </div>
</template>
