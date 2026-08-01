<script setup lang="ts">
defineProps<{
  guests: number
  attending: number
  messages: number
  variant?: 'card' | 'compact' | 'header'
}>()
</script>

<template>
  <div
    class="grid grid-cols-3 gap-2"
    :class="variant === 'compact' ? 'text-center text-[11px] text-samasta-muted' : ''"
  >
    <div
      :class="
        variant === 'header'
          ? 'rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal'
          : variant === 'compact'
            ? ''
            : 'dash-card text-center'
      "
    >
      <p
        class="font-display font-semibold text-samasta-burgundy"
        :class="variant === 'header' ? 'text-2xl sm:text-3xl' : variant === 'compact' ? 'text-lg' : 'text-2xl sm:text-3xl'"
      >
        {{ guests }}
      </p>
      <p
        class="text-samasta-muted"
        :class="variant === 'header' ? 'mt-0.5 text-[10px] sm:text-xs' : variant === 'compact' ? '' : 'mt-1 text-[11px] sm:text-xs'"
      >
        {{ variant === 'compact' ? 'Tamu' : variant === 'header' ? 'Tamu' : 'Tamu' }}
      </p>
    </div>
    <div
      :class="
        variant === 'header'
          ? 'rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal'
          : variant === 'compact'
            ? ''
            : 'dash-card text-center'
      "
    >
      <p
        class="font-display font-semibold text-samasta-burgundy"
        :class="variant === 'header' ? 'text-2xl sm:text-3xl' : variant === 'compact' ? 'text-lg' : 'text-2xl sm:text-3xl'"
      >
        {{ attending }}
      </p>
      <p
        class="text-samasta-muted"
        :class="variant === 'header' ? 'mt-0.5 text-[10px] sm:text-xs' : variant === 'compact' ? '' : 'mt-1 text-[11px] sm:text-xs'"
      >
        {{ variant === 'compact' ? 'Hadir' : variant === 'header' ? 'Akan Hadir' : 'Akan Hadir' }}
      </p>
    </div>
    <div
      :class="
        variant === 'header'
          ? 'rounded-xl bg-white px-2 py-3 text-center text-samasta-charcoal'
          : variant === 'compact'
            ? ''
            : 'dash-card text-center'
      "
    >
      <p
        class="font-display font-semibold text-samasta-burgundy"
        :class="variant === 'header' ? 'text-2xl sm:text-3xl' : variant === 'compact' ? 'text-lg' : 'text-2xl sm:text-3xl'"
      >
        {{ messages }}
      </p>
      <p
        class="text-samasta-muted"
        :class="variant === 'header' ? 'mt-0.5 text-[10px] sm:text-xs' : variant === 'compact' ? '' : 'mt-1 text-[11px] sm:text-xs'"
      >
        Ucapan
      </p>
    </div>
  </div>
</template>
