<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

type HostRow = { name: string; role?: string }

const hosts = ref<HostRow[]>([])

watch(
  () => props.invitation.hosts,
  (value) => {
    hosts.value = structuredClone(value?.length ? value : [{ name: '', role: '' }])
  },
  { immediate: true },
)

function addHost() {
  hosts.value.push({ name: '', role: '' })
}

function removeHost(index: number) {
  hosts.value.splice(index, 1)
  if (!hosts.value.length) hosts.value.push({ name: '', role: '' })
}

function getPayload() {
  return {
    hosts: hosts.value.filter((host) => host.name.trim()),
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(host, idx) in hosts"
      :key="idx"
      class="rounded-2xl border border-samasta-burgundy/10 bg-samasta-cream/70 p-4"
    >
      <label class="text-xs font-medium text-samasta-muted">Nama</label>
      <input v-model="host.name" class="input mt-1 w-full" placeholder="Nama host">
      <label class="mt-3 block text-xs font-medium text-samasta-muted">Peran</label>
      <input v-model="host.role" class="input mt-1 w-full" placeholder="Mempelai pria">
      <button
        v-if="hosts.length > 1"
        type="button"
        class="mt-3 text-xs font-medium text-red-600"
        @click="removeHost(idx)"
      >
        Hapus
      </button>
    </div>

    <button type="button" class="btn-secondary w-full" @click="addHost">
      + Tambah Host
    </button>
  </div>
</template>
