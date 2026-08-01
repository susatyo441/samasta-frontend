<script setup lang="ts">
import type { Invitation } from '~/types'

const props = defineProps<{
  invitation: Invitation
}>()

const greeting = ref('')
const quote = ref('')

watch(
  () => [props.invitation.greeting, props.invitation.quote] as const,
  ([nextGreeting, nextQuote]) => {
    greeting.value = nextGreeting ?? ''
    quote.value = nextQuote ?? ''
  },
  { immediate: true },
)

function getPayload() {
  return {
    greeting: greeting.value.trim() || null,
    quote: quote.value.trim() || null,
  }
}

defineExpose({ getPayload })
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="text-xs font-medium text-samasta-muted">Sambutan</label>
      <textarea
        v-model="greeting"
        class="input mt-1 w-full"
        rows="4"
        placeholder="Dengan memohon rahmat Tuhan..."
      />
    </div>
    <div>
      <label class="text-xs font-medium text-samasta-muted">Kutipan</label>
      <textarea
        v-model="quote"
        class="input mt-1 w-full"
        rows="3"
        placeholder="Dan di antara tanda-tanda kekuasaan-Nya..."
      />
    </div>
  </div>
</template>
