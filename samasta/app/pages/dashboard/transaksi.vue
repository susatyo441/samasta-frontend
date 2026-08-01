<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

useSeoMeta({ title: 'Transaksi – Samasta' })

const { transactions } = useInvitations()
</script>

<template>
  <div>
    <DashboardHeader title="Transaksi" subtitle="Riwayat pembayaran paket undangan" />

    <div class="space-y-3 px-4 py-5 sm:px-6">
      <article
        v-for="trx in transactions"
        :key="trx.id"
        class="dash-card flex items-center justify-between gap-3"
      >
        <div>
          <p class="font-medium text-samasta-charcoal">Paket {{ trx.plan }}</p>
          <p class="mt-1 text-xs text-samasta-muted">{{ trx.paidAt }} · {{ trx.id }}</p>
        </div>
        <div class="text-right">
          <p class="font-display text-xl font-semibold text-samasta-burgundy">
            Rp{{ trx.amount.toLocaleString('id-ID') }}
          </p>
          <p class="text-[11px] font-semibold uppercase text-samasta-sage">{{ trx.status }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
