<script setup lang="ts">
import { useMutation, useQuery } from '@pinia/colada'
import { toast } from 'vue-sonner'
import type { Invitation } from '~/types'
import { invitationPlansQueryOptions } from '~/queries/invitations'
import { useInvitationMutations } from '~/composables/useInvitationMutations'
import { handleMutationError } from '~/utils/handleMutationError'
import { openMidtransSnap } from '~/utils/midtransSnap'

const props = defineProps<{
  invitation: Invitation
}>()

const emit = defineEmits<{
  close: []
  published: []
}>()

const plansQuery = useQuery(invitationPlansQueryOptions())
const plans = computed(() => plansQuery.data.value?.plans ?? [])

const selectedPlanId = ref('gratis')
const { publish, syncPublishStatus } = useInvitationMutations(() => props.invitation.id)

watch(
  plans,
  (items) => {
    if (items.length && !items.some((p) => p.id === selectedPlanId.value)) {
      selectedPlanId.value = items[0]!.id
    }
  },
  { immediate: true },
)

const { mutate: handlePublish, isLoading } = useMutation({
  mutation: async () => {
    const result = await publish(selectedPlanId.value)

    if (result.snapToken && result.clientKey) {
      await new Promise<void>((resolve, reject) => {
        openMidtransSnap(result.snapToken!, result.clientKey!, {
          onSuccess: () => resolve(),
          onPending: () => resolve(),
          onError: () => reject(new Error('Pembayaran gagal.')),
          onClose: () => resolve(),
        })
      })

      if (result.transaction.id) {
        await syncPublishStatus(result.transaction.id)
      }
    }

    return result
  },
  onSuccess: (result) => {
    toast.success(
      result.invitationStatus === 'active'
        ? 'Undangan berhasil dipublikasikan!'
        : 'Pembayaran diproses. Status undangan akan diperbarui.',
    )
    emit('published')
    emit('close')
  },
  onError: (err) => handleMutationError(err),
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-6">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-2xl font-semibold text-samasta-burgundy">Publikasikan Undangan</h3>
          <p class="mt-1 text-xs text-samasta-muted">Pilih paket untuk mengaktifkan link undangan.</p>
        </div>
        <button
          type="button"
          class="rounded-full bg-samasta-cream-dark px-3 py-1 text-sm text-samasta-burgundy"
          @click="emit('close')"
        >
          Tutup
        </button>
      </div>

      <div v-if="plansQuery.isLoading.value" class="py-6 text-center text-sm text-samasta-muted">
        Memuat paket...
      </div>

      <div v-else class="space-y-3">
        <label
          v-for="plan in plans"
          :key="plan.id"
          class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition"
          :class="
            selectedPlanId === plan.id
              ? 'border-samasta-burgundy bg-samasta-cream/50'
              : 'border-samasta-burgundy/10'
          "
        >
          <input v-model="selectedPlanId" type="radio" class="mt-1" :value="plan.id">
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <p class="font-medium text-samasta-charcoal">{{ plan.name }}</p>
              <p class="font-semibold text-samasta-burgundy">
                {{ plan.amount === 0 ? 'Gratis' : `Rp${plan.amount.toLocaleString('id-ID')}` }}
              </p>
            </div>
            <p v-if="plan.description" class="mt-1 text-xs text-samasta-muted">{{ plan.description }}</p>
          </div>
        </label>
      </div>

      <button
        type="button"
        class="btn-primary mt-5 w-full"
        :disabled="isLoading || !plans.length"
        @click="() => handlePublish()"
      >
        {{ isLoading ? 'Memproses...' : 'Lanjutkan' }}
      </button>
    </div>
  </div>
</template>
