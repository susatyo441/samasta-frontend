<script setup lang="ts">
import { useMutation, useQuery } from '@pinia/colada'
import { toast } from 'vue-sonner'
import type { InvitationGuest } from '~/types'
import { downloadGuestImportTemplate, invitationGuestsQueryOptions } from '~/queries/invitations'
import { useInvitationGuestMutations } from '~/composables/useInvitationMutations'
import { guestDbId } from '~/utils/guestId'
import { handleMutationError } from '~/utils/handleMutationError'
import { rsvpStatusClasses } from '~/utils/invitationDisplay'

definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

const route = useRoute()
const invitationId = computed(() => String(route.params.id))
const { invitation } = useInvitationById(invitationId)

useSeoMeta({
  title: computed(() =>
    invitation.value ? `RSVP – ${invitation.value.title}` : 'RSVP Tamu',
  ),
})

const guestsQuery = useQuery(() => ({
  ...invitationGuestsQueryOptions(invitationId.value),
  enabled: Boolean(invitationId.value),
}))

const guests = computed(() => guestsQuery.data.value?.data ?? [])

const search = ref('')
const filterRsvp = ref('all')

const filteredGuests = computed(() => {
  const q = search.value.trim().toLowerCase()
  return guests.value.filter((guest) => {
    const matchSearch =
      !q
      || guest.name.toLowerCase().includes(q)
      || (guest.group ?? '').toLowerCase().includes(q)
      || (guest.phone ?? '').includes(q)
    const matchRsvp = filterRsvp.value === 'all' || guest.rsvp === filterRsvp.value
    return matchSearch && matchRsvp
  })
})

const stats = computed(() => {
  const list = guests.value
  return {
    total: list.length,
    hadir: list.filter((g) => g.rsvp === 'hadir').length,
    tidak: list.filter((g) => g.rsvp === 'tidak').length,
    ragu: list.filter((g) => g.rsvp === 'ragu').length,
    belum: list.filter((g) => !g.rsvp || g.rsvp === 'belum').length,
    seats: list.reduce((sum, g) => sum + (g.quota ?? 1), 0),
  }
})

const { createGuest, updateGuest, removeGuest, importCsv } = useInvitationGuestMutations(invitationId)

const showForm = ref(false)
const editingGuest = ref<InvitationGuest | null>(null)
const form = ref({
  name: '',
  phone: '',
  group: '',
  quota: 1,
  rsvp: 'belum',
})

const csvInput = ref<HTMLInputElement | null>(null)
const templateUrl = downloadGuestImportTemplate()

const rsvpLabels: Record<string, string> = {
  belum: 'Belum',
  hadir: 'Hadir',
  tidak: 'Tidak',
  ragu: 'Ragu',
}

function resetForm() {
  form.value = { name: '', phone: '', group: '', quota: 1, rsvp: 'belum' }
  editingGuest.value = null
  showForm.value = false
}

function startCreate() {
  editingGuest.value = null
  form.value = { name: '', phone: '', group: '', quota: 1, rsvp: 'belum' }
  showForm.value = true
}

function startEdit(guest: InvitationGuest) {
  editingGuest.value = guest
  form.value = {
    name: guest.name,
    phone: guest.phone ?? '',
    group: guest.group ?? '',
    quota: guest.quota ?? 1,
    rsvp: guest.rsvp ?? 'belum',
  }
  showForm.value = true
}

const { mutate: saveGuest, isLoading: saving } = useMutation({
  mutation: async () => {
    const payload = {
      name: form.value.name.trim(),
      phone: form.value.phone.trim() || undefined,
      group: form.value.group.trim() || undefined,
      quota: form.value.quota,
      rsvp: form.value.rsvp,
    }

    if (editingGuest.value) {
      await updateGuest(guestDbId(editingGuest.value.id), payload)
    } else {
      await createGuest(payload)
    }
  },
  onSuccess: () => {
    toast.success(editingGuest.value ? 'Tamu diperbarui.' : 'Tamu ditambahkan.')
    resetForm()
  },
  onError: (err) => handleMutationError(err),
})

const { mutate: deleteGuest, isLoading: deleting } = useMutation({
  mutation: (guest: InvitationGuest) => removeGuest(guestDbId(guest.id)),
  onSuccess: () => toast.success('Tamu dihapus.'),
  onError: (err) => handleMutationError(err),
})

const { mutate: importGuests, isLoading: importing } = useMutation({
  mutation: (file: File) => importCsv(file),
  onSuccess: (result) => {
    toast.success(`Import selesai: ${result.data.imported} tamu, ${result.data.skipped} dilewati.`)
  },
  onError: (err) => handleMutationError(err),
})

function onCsvSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) importGuests(file)
  ;(event.target as HTMLInputElement).value = ''
}

function confirmDelete(guest: InvitationGuest) {
  if (!confirm(`Hapus tamu "${guest.name}"?`)) return
  deleteGuest(guest)
}
</script>

<template>
  <div>
    <DashboardHeader
      title="RSVP & Tamu"
      :subtitle="invitation?.title || 'Kelola daftar undangan & konfirmasi kehadiran'"
    />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <NuxtLink
          :to="`/dashboard/undangan/${invitationId}`"
          class="inline-flex items-center gap-1 text-sm font-medium text-samasta-burgundy"
        >
          <span aria-hidden="true">←</span> Kembali ke undangan
        </NuxtLink>

        <div class="flex flex-wrap gap-2">
          <input ref="csvInput" type="file" accept=".csv,text/csv" class="hidden" @change="onCsvSelected">
          <a :href="templateUrl" target="_blank" class="btn-secondary !px-4 !py-2 text-xs">Template CSV</a>
          <button
            type="button"
            class="btn-secondary !px-4 !py-2 text-xs"
            :disabled="importing"
            @click="csvInput?.click()"
          >
            {{ importing ? 'Import...' : 'Import CSV' }}
          </button>
          <button type="button" class="btn-primary !px-4 !py-2 text-xs" @click="startCreate">
            + Tambah Tamu
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
          <p class="text-[11px] text-samasta-muted">Total</p>
          <p class="mt-1 font-display text-2xl font-semibold text-samasta-burgundy">{{ stats.total }}</p>
        </div>
        <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
          <p class="text-[11px] text-samasta-muted">Hadir</p>
          <p class="mt-1 font-display text-2xl font-semibold text-green-700">{{ stats.hadir }}</p>
        </div>
        <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
          <p class="text-[11px] text-samasta-muted">Tidak</p>
          <p class="mt-1 font-display text-2xl font-semibold text-rose-700">{{ stats.tidak }}</p>
        </div>
        <div class="rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3">
          <p class="text-[11px] text-samasta-muted">Belum</p>
          <p class="mt-1 font-display text-2xl font-semibold text-amber-700">{{ stats.belum }}</p>
        </div>
        <div class="col-span-2 rounded-2xl border border-samasta-burgundy/10 bg-white px-3 py-3 sm:col-span-1">
          <p class="text-[11px] text-samasta-muted">Kursi</p>
          <p class="mt-1 font-display text-2xl font-semibold text-samasta-charcoal">{{ stats.seats }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row">
        <input
          v-model="search"
          type="search"
          class="input w-full sm:flex-1"
          placeholder="Cari nama, grup, atau telepon..."
        >
        <select v-model="filterRsvp" class="input w-full sm:w-48">
          <option value="all">Semua status</option>
          <option value="belum">Belum konfirmasi</option>
          <option value="hadir">Hadir</option>
          <option value="tidak">Tidak hadir</option>
          <option value="ragu">Ragu</option>
        </select>
      </div>

      <div
        v-if="guestsQuery.isLoading.value"
        class="rounded-2xl border border-samasta-burgundy/10 bg-white px-4 py-10 text-center text-sm text-samasta-muted"
      >
        Memuat daftar tamu...
      </div>

      <div
        v-else
        class="overflow-hidden rounded-2xl border border-samasta-burgundy/10 bg-white shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="border-b border-samasta-burgundy/10 bg-samasta-cream/60 text-[11px] uppercase tracking-wide text-samasta-muted">
              <tr>
                <th class="px-4 py-3 font-semibold">Nama</th>
                <th class="px-4 py-3 font-semibold">Grup</th>
                <th class="hidden px-4 py-3 font-semibold sm:table-cell">Telepon</th>
                <th class="px-4 py-3 font-semibold">Kuota</th>
                <th class="px-4 py-3 font-semibold">RSVP</th>
                <th class="px-4 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="guest in filteredGuests"
                :key="guest.id"
                class="border-b border-samasta-burgundy/5 last:border-0 hover:bg-samasta-cream/40"
              >
                <td class="px-4 py-3">
                  <p class="font-medium text-samasta-charcoal">{{ guest.name }}</p>
                  <p v-if="guest.message" class="mt-0.5 line-clamp-1 text-xs text-samasta-muted">
                    {{ guest.message }}
                  </p>
                </td>
                <td class="px-4 py-3 text-samasta-muted">{{ guest.group || '—' }}</td>
                <td class="hidden px-4 py-3 text-samasta-muted sm:table-cell">
                  {{ guest.phone || '—' }}
                </td>
                <td class="px-4 py-3">{{ guest.quota ?? 1 }}</td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    :class="rsvpStatusClasses(guest.rsvp || 'belum')"
                  >
                    {{ rsvpLabels[guest.rsvp || 'belum'] || guest.rsvp }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="inline-flex gap-2">
                    <button
                      type="button"
                      class="text-xs font-semibold text-samasta-burgundy hover:underline"
                      @click="startEdit(guest)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="text-xs font-semibold text-rose-600 hover:underline"
                      :disabled="deleting"
                      @click="confirmDelete(guest)"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredGuests.length">
                <td colspan="6" class="px-4 py-10 text-center text-samasta-muted">
                  {{ guests.length ? 'Tidak ada tamu yang cocok dengan filter.' : 'Belum ada tamu. Tambah manual atau import CSV.' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="showForm"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      @click.self="resetForm"
    >
      <form
        class="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-6"
        @submit.prevent="() => saveGuest()"
      >
        <div class="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">
              {{ editingGuest ? 'Edit Tamu' : 'Tambah Tamu' }}
            </h3>
            <p class="mt-1 text-xs text-samasta-muted">Data tamu untuk undangan & RSVP.</p>
          </div>
          <button
            type="button"
            class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
            @click="resetForm"
          >
            Tutup
          </button>
        </div>

        <div class="space-y-3">
          <input v-model="form.name" class="input w-full" placeholder="Nama tamu" required>
          <input v-model="form.phone" class="input w-full" placeholder="Telepon">
          <input v-model="form.group" class="input w-full" placeholder="Grup (Keluarga, Teman, dll)">
          <input
            v-model.number="form.quota"
            type="number"
            min="1"
            max="20"
            class="input w-full"
            placeholder="Kuota"
          >
          <select v-model="form.rsvp" class="input w-full">
            <option value="belum">Belum konfirmasi</option>
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak hadir</option>
            <option value="ragu">Ragu</option>
          </select>
        </div>

        <button type="submit" class="btn-primary mt-5 w-full" :disabled="saving">
          {{ saving ? 'Menyimpan...' : editingGuest ? 'Perbarui' : 'Simpan Tamu' }}
        </button>
      </form>
    </div>
  </div>
</template>
