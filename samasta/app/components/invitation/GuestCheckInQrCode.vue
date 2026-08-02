<script setup lang="ts">
const props = defineProps<{
  token: string
  size?: number
}>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const copyOk = ref(false)

async function renderQr() {
  if (!import.meta.client || !canvasEl.value || !props.token) return
  const { default: QRCode } = await import('qrcode')
  await QRCode.toCanvas(canvasEl.value, props.token, {
    width: props.size ?? 200,
    margin: 1,
    color: { dark: '#3D1F24', light: '#FFFFFF' },
  })
}

async function copyToken() {
  if (!import.meta.client || !props.token) return
  try {
    await navigator.clipboard.writeText(props.token)
    copyOk.value = true
    setTimeout(() => {
      copyOk.value = false
    }, 2000)
  } catch {
    copyOk.value = false
  }
}

watch(
  () => [props.token, props.size] as const,
  async () => {
    await nextTick()
    await renderQr()
  },
  { immediate: true },
)
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center">
      <canvas
        ref="canvasEl"
        class="rounded-xl border border-samasta-burgundy/10 bg-white p-2 shadow-sm"
      />
    </div>
    <p class="mt-3 break-all font-mono text-[11px] tracking-wider text-samasta-muted uppercase">
      {{ token }}
    </p>
    <button
      type="button"
      class="mt-3 text-xs font-semibold text-samasta-burgundy hover:underline"
      @click="copyToken"
    >
      {{ copyOk ? 'Tersalin!' : 'Salin kode' }}
    </button>
  </div>
</template>
