<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { toast } from 'vue-sonner'
import type { InvitationGuest } from '~/types'
import { useInvitationGuestMutations } from '~/composables/useInvitationMutations'
import { handleMutationError } from '~/utils/handleMutationError'
import { rsvpStatusClasses } from '~/utils/invitationDisplay'

definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

const route = useRoute()
const invitationId = computed(() => String(route.params.id))
const { invitation } = useInvitationById(invitationId)
const { checkInByToken } = useInvitationGuestMutations(invitationId)

useSeoMeta({
  title: computed(() =>
    invitation.value ? `Check-in – ${invitation.value.title}` : 'Check-in Venue',
  ),
})

const scannerHostId = 'venue-check-in-scanner'
const scanning = ref(false)
const manualToken = ref('')
const scanError = ref('')
const lastResult = ref<{
  guest: InvitationGuest
  alreadyCheckedIn: boolean
  message: string
} | null>(null)

let scanner: { stop: () => Promise<void>; isScanning: boolean } | null = null
let lastScannedAt = 0

const rsvpLabels: Record<string, string> = {
  belum: 'Belum',
  hadir: 'Hadir',
  tidak: 'Tidak',
  ragu: 'Ragu',
}

const { mutate: submitToken, isLoading: submitting } = useMutation({
  mutation: (token: string) => checkInByToken(token.trim()),
  onSuccess: (result) => {
    lastResult.value = {
      guest: result.data,
      alreadyCheckedIn: result.alreadyCheckedIn,
      message: result.message,
    }
    toast.success(result.message)
    manualToken.value = ''
  },
  onError: (err) => handleMutationError(err),
})

async function stopScanner() {
  if (!scanner) return
  try {
    if (scanner.isScanning) await scanner.stop()
  } catch {
    // ignore stop races
  }
  scanning.value = false
}

async function startScanner() {
  if (!import.meta.client) return
  scanError.value = ''
  await stopScanner()

  try {
    const { Html5Qrcode } = await import('html5-qrcode')
    const instance = new Html5Qrcode(scannerHostId)
    scanner = instance
    scanning.value = true

    await instance.start(
      { facingMode: 'environment' },
      { fps: 8, qrbox: { width: 240, height: 240 } },
      (decoded) => {
        const now = Date.now()
        if (now - lastScannedAt < 2500 || submitting.value) return
        lastScannedAt = now
        submitToken(decoded)
      },
      () => undefined,
    )
  } catch (err) {
    scanning.value = false
    scanError.value =
      err instanceof Error ? err.message : 'Kamera tidak tersedia. Pakai input manual.'
  }
}

onMounted(() => {
  startScanner()
})

onBeforeUnmount(() => {
  stopScanner()
})
</script>

<template>
  <div>
    <DashboardHeader
      title="Check-in Venue"
      :subtitle="invitation?.title || 'Scan QR tamu di pintu masuk'"
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
          <NuxtLink
            :to="`/dashboard/undangan/${invitationId}/rsvp`"
            class="btn-secondary !px-4 !py-2 text-xs"
          >
            Daftar tamu
          </NuxtLink>
          <button
            type="button"
            class="btn-primary !px-4 !py-2 text-xs"
            :disabled="scanning"
            @click="startScanner"
          >
            {{ scanning ? 'Kamera aktif' : 'Aktifkan kamera' }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <section class="rounded-2xl border border-samasta-burgundy/10 bg-white p-4 sm:p-5">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Scan QR</h3>
          <p class="mt-1 text-sm text-samasta-muted">
            Arahkan kamera ke QR check-in tamu, atau tempel kode 6 karakter.
          </p>

          <div :id="scannerHostId" class="mt-4 overflow-hidden rounded-xl bg-samasta-cream" />
          <p v-if="scanError" class="mt-3 text-sm text-rose-600">{{ scanError }}</p>

          <form class="mt-4 flex gap-2" @submit.prevent="submitToken(manualToken)">
            <input
              v-model="manualToken"
              type="text"
              maxlength="6"
              class="input min-w-0 flex-1 font-mono text-xs uppercase tracking-wider"
              placeholder="Kode 6 karakter"
              :disabled="submitting"
            >
            <button
              type="submit"
              class="btn-primary shrink-0 !px-4 !py-2 text-xs"
              :disabled="submitting || manualToken.trim().length < 6"
            >
              {{ submitting ? '...' : 'Check-in' }}
            </button>
          </form>
        </section>

        <section class="rounded-2xl border border-samasta-burgundy/10 bg-white p-4 sm:p-5">
          <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Hasil terakhir</h3>

          <div
            v-if="!lastResult"
            class="mt-6 rounded-xl bg-samasta-cream px-4 py-10 text-center text-sm text-samasta-muted"
          >
            Belum ada scan. Hasil check-in akan muncul di sini.
          </div>

          <div v-else class="mt-4 space-y-3">
            <div
              class="rounded-xl px-4 py-3 text-sm font-medium"
              :class="
                lastResult.alreadyCheckedIn
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-green-50 text-green-800'
              "
            >
              {{ lastResult.message }}
            </div>

            <div class="rounded-xl border border-samasta-burgundy/10 px-4 py-4">
              <p class="font-display text-2xl font-semibold text-samasta-burgundy">
                {{ lastResult.guest.name }}
              </p>
              <dl class="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt class="text-xs text-samasta-muted">Grup</dt>
                  <dd class="font-medium text-samasta-charcoal">
                    {{ lastResult.guest.group || '—' }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-samasta-muted">Kuota</dt>
                  <dd class="font-medium text-samasta-charcoal">
                    {{ lastResult.guest.quota ?? 1 }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-samasta-muted">RSVP</dt>
                  <dd>
                    <span
                      class="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      :class="rsvpStatusClasses(lastResult.guest.rsvp || 'belum')"
                    >
                      {{ rsvpLabels[lastResult.guest.rsvp || 'belum'] || lastResult.guest.rsvp }}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-samasta-muted">Check-in</dt>
                  <dd class="font-medium text-samasta-charcoal">
                    {{
                      lastResult.guest.checkedInAt
                        ? new Date(lastResult.guest.checkedInAt).toLocaleString('id-ID')
                        : '—'
                    }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
