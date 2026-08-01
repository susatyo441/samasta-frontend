<script setup lang="ts">
import type { InvitationManager } from '~/types'
import { instagramHandleLabel, instagramProfileUrl } from '~/utils/instagramUrl'

defineProps<{
  vendors: InvitationManager[]
}>()
</script>

<template>
  <div v-if="vendors.length" class="inv-section-card text-center">
    <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-samasta-muted">
      Didukung Oleh
    </p>
    <h2 class="inv-section-title mt-2 !mb-0">Vendor & Tim</h2>

    <ul class="mt-5 space-y-4">
      <li v-for="(vendor, idx) in vendors" :key="`${vendor.name}-${idx}`">
        <p class="font-medium text-samasta-charcoal">{{ vendor.name }}</p>
        <p v-if="vendor.role" class="mt-0.5 text-xs uppercase tracking-[0.14em] text-samasta-muted">
          {{ vendor.role }}
        </p>
        <a
          v-if="instagramProfileUrl(vendor.instagram)"
          :href="instagramProfileUrl(vendor.instagram)!"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-1 inline-block text-sm font-semibold text-samasta-burgundy hover:underline"
        >
          {{ instagramHandleLabel(vendor.instagram) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style src="./sections.css"></style>
