<script setup lang="ts">
const props = defineProps<{
  eventType: 'wedding' | 'birthday' | 'other'
  modules: Array<{
    id: string
    label: Record<string, string>
    icon: string
    description: string
    highlight?: boolean
  }>
}>()

const emit = defineEmits<{
  select: [moduleId: string]
}>()

const iconMap: Record<string, string> = {
  hosts: '👫',
  theme: '🎨',
  events: '📅',
  gallery: '🖼️',
  music: '🎵',
  messages: '💬',
  gift: '🎁',
  rsvp: '✅',
  streaming: '📡',
  story: '📖',
  ig: '📱',
  quote: '✨',
  settings: '⚙️',
  guestbook: '📝',
  share: '✈️',
}

function labelOf(mod: (typeof props.modules)[number]) {
  return mod.label[props.eventType] || mod.label.other || mod.id
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
    <button
      v-for="mod in modules"
      :key="mod.id"
      type="button"
      class="feature-tile"
      :class="mod.highlight ? '!bg-samasta-gold !text-samasta-charcoal hover:!brightness-95' : ''"
      @click="emit('select', mod.id)"
    >
      <span class="text-xl sm:text-2xl">{{ iconMap[mod.icon] || '•' }}</span>
      <span class="text-[11px] font-semibold leading-tight sm:text-xs">{{ labelOf(mod) }}</span>
    </button>
  </div>
</template>
