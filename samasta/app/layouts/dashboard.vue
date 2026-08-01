<script setup lang="ts">
const { mainOffsetClass } = useDashboardSidebar()
</script>

<template>
  <div class="min-h-screen bg-dash-warm">
    <DashboardSidebar />

    <div
      class="flex min-h-screen min-w-0 flex-col pb-24 transition-[padding] duration-200 ease-out lg:pb-0"
      :class="mainOffsetClass"
    >
      <slot />
    </div>

    <DashboardBottomNav />
  </div>
</template>
