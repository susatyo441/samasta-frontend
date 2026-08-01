<script setup lang="ts">
defineProps<{
  label: string
  name: string
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <label :for="name" class="mb-1.5 block text-xs font-medium text-samasta-muted">{{ label }}</label>
    <input
      :id="name"
      v-model="model"
      :type="type || 'text'"
      :required="required"
      :placeholder="placeholder"
      class="w-full rounded-2xl border border-samasta-burgundy/15 bg-white px-4 py-3 text-sm outline-none ring-samasta-burgundy/30 focus:ring-2"
      :aria-invalid="Boolean(error)"
    >
    <p v-if="error" class="mt-1 text-xs text-rose-600">{{ error }}</p>
  </div>
</template>
