<template>
  <div class="min-h-screen bg-dash-warm lg:flex">
    <DashboardSidebar />

    <div class="flex min-h-screen min-w-0 flex-1 flex-col pb-24 lg:pb-0">
      <slot />
    </div>

    <DashboardBottomNav />
  </div>
</template>
