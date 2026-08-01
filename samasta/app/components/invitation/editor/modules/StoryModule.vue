<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

type StoryRow = NonNullable<Invitation['loveStory']>[number]

const stories = ref<StoryRow[]>([])

const emptyStory = (): StoryRow => ({
  year: '',
  title: '',
  description: '',
})

watch(
  () => props.invitation.loveStory,
  (value) => {
    stories.value = structuredClone(value?.length ? value : [emptyStory()])
  },
  { immediate: true },
)

function addStory() {
  stories.value.push(emptyStory())
}

function removeStory(index: number) {
  stories.value.splice(index, 1)
}

function getPayload() {
  return {
    loveStory: stories.value.filter((item) => item.title?.trim() || item.description?.trim()),
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, idx) in stories"
      :key="idx"
      class="space-y-2 rounded-2xl border-l-4 border-samasta-gold bg-samasta-cream p-4"
    >
      <input v-model="item.year" class="input w-full" placeholder="Tahun">
      <input v-model="item.title" class="input w-full" placeholder="Judul">
      <textarea v-model="item.description" class="input w-full" rows="3" placeholder="Cerita" />
      <button type="button" class="text-xs font-medium text-red-600" @click="removeStory(idx)">
        Hapus
      </button>
    </div>

    <button type="button" class="btn-secondary w-full" @click="addStory">
      + Tambah Cerita
    </button>
  </div>
</template>
