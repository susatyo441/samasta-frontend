<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Invitation } from '~/types'
import { useInvitationMutations } from '~/composables/useInvitationMutations'
import { handleMutationError } from '~/utils/handleMutationError'

const props = defineProps<{
  invitation: Invitation
}>()

const gallery = computed(() => props.invitation.gallery ?? [])
const { uploadMedia, removeMedia } = useInvitationMutations(() => props.invitation.id)

const uploading = ref(false)
const uploadLabel = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  try {
    await uploadMedia(file, 'gallery', uploadLabel.value.trim() || undefined)
    toast.success('Foto berhasil diunggah.')
    uploadLabel.value = ''
  } catch (err) {
    handleMutationError(err)
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function onDelete(mediaId: string) {
  if (!confirm('Hapus media ini?')) return

  try {
    await removeMedia(mediaId)
    toast.success('Media dihapus.')
  } catch (err) {
    handleMutationError(err)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="item in gallery"
        :key="item.id"
        class="group relative aspect-square overflow-hidden rounded-2xl bg-samasta-cream-dark"
      >
        <img
          v-if="item.url"
          :src="item.url"
          :alt="item.label || 'Galeri'"
          class="h-full w-full object-cover"
        >
        <div v-else class="flex h-full flex-col items-center justify-center p-3 text-center text-xs text-samasta-burgundy">
          <p class="font-medium">{{ item.label }}</p>
          <p class="mt-1 opacity-70">{{ item.type }}</p>
        </div>
        <button
          type="button"
          class="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100"
          @click="onDelete(item.id)"
        >
          Hapus
        </button>
      </div>
    </div>

    <p v-if="!gallery.length" class="text-sm text-samasta-muted">Belum ada foto di galeri.</p>

    <div class="rounded-2xl border border-dashed border-samasta-burgundy/20 p-4">
      <input v-model="uploadLabel" class="input mb-2 w-full" placeholder="Label foto (opsional)">
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelected">
      <button
        type="button"
        class="btn-secondary w-full"
        :disabled="uploading"
        @click="fileInput?.click()"
      >
        {{ uploading ? 'Mengunggah...' : '+ Unggah Foto' }}
      </button>
    </div>
  </div>
</template>
