<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({ title: 'Bantuan – Samasta' })
</script>

<template>
  <div>
    <DashboardHeader title="Bantuan" subtitle="Customer service Samasta" />

    <div class="space-y-4 px-4 py-5 sm:px-6">
      <section class="dash-card">
        <h3 class="font-display text-xl font-semibold text-samasta-burgundy">Chat WhatsApp</h3>
        <p class="mt-2 text-sm text-samasta-muted">
          Tim kami siap membantu setup undangan, pembayaran, dan kustomisasi tema.
        </p>
        <a href="#" class="btn-primary mt-4 inline-flex">Hubungi CS</a>
      </section>

      <section class="dash-card space-y-3 text-sm text-samasta-muted">
        <p><strong class="text-samasta-charcoal">Jam operasional:</strong> Senin–Sabtu, 09.00–18.00 WIB</p>
        <p><strong class="text-samasta-charcoal">Email:</strong> halo@samasta.app</p>
        <p><strong class="text-samasta-charcoal">Akun demo:</strong> demo@samasta.app / samasta123</p>
      </section>
    </div>
  </div>
</template>
