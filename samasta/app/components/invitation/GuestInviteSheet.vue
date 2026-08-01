<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { InvitationGuest } from '~/types'
import {
  buildGuestInvitationUrl,
  buildGuestWhatsappUrl,
  buildWhatsappInviteMessage,
} from '~/utils/invitationUrl'

const props = defineProps<{
  guests: InvitationGuest[]
  publicPath: string
  invitationTitle: string
}>()

const emit = defineEmits<{
  close: []
}>()

function guestLink(guest: InvitationGuest) {
  return buildGuestInvitationUrl(props.publicPath, {
    guestId: guest.id,
    guestName: guest.name,
  })
}

function whatsappUrl(guest: InvitationGuest) {
  return buildGuestWhatsappUrl(props.publicPath, guest, props.invitationTitle)
}

async function copyLink(guest: InvitationGuest) {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(guestLink(guest))
    toast.success(`Link ${guest.name} disalin.`)
  } catch {
    toast.error('Gagal menyalin link.')
  }
}

async function copyAllLinks() {
  if (!import.meta.client || !props.guests.length) return
  const text = props.guests
    .map((guest) => `${guest.name}: ${guestLink(guest)}`)
    .join('\n')
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`${props.guests.length} link disalin.`)
  } catch {
    toast.error('Gagal menyalin link.')
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <div class="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-6">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">Kirim Undangan</h3>
          <p class="mt-1 text-xs text-samasta-muted">
            Setiap tamu mendapat link personal dengan nama mereka.
          </p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <button type="button" class="btn-secondary mb-4 w-full text-xs" @click="copyAllLinks">
        Salin semua link
      </button>

      <div class="space-y-2">
        <div
          v-for="guest in guests"
          :key="guest.id"
          class="rounded-2xl border border-samasta-burgundy/10 p-3"
        >
          <p class="font-medium text-samasta-charcoal">{{ guest.name }}</p>
          <p class="mt-0.5 text-xs text-samasta-muted">{{ guest.phone || 'Tanpa nomor WA' }}</p>
          <p class="mt-2 line-clamp-2 break-all text-[11px] text-samasta-muted">
            {{ buildWhatsappInviteMessage(guest.name, invitationTitle, guestLink(guest)) }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button type="button" class="btn-secondary !px-3 !py-1.5 text-xs" @click="copyLink(guest)">
              Salin link
            </button>
            <a
              :href="whatsappUrl(guest)"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !px-3 !py-1.5 text-xs"
            >
              Kirim WA
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
