declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void
          onPending?: (result: unknown) => void
          onError?: (result: unknown) => void
          onClose?: () => void
        },
      ) => void
    }
  }
}

const SNAP_SCRIPT = {
  sandbox: 'https://app.sandbox.midtrans.com/snap/snap.js',
  production: 'https://app.midtrans.com/snap/snap.js',
}

let scriptPromise: Promise<void> | null = null

export function loadMidtransSnap(clientKey: string, production = false): Promise<void> {
  if (import.meta.server) return Promise.resolve()
  if (window.snap) return Promise.resolve()

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = production ? SNAP_SCRIPT.production : SNAP_SCRIPT.sandbox
      script.setAttribute('data-client-key', clientKey)
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Gagal memuat Midtrans Snap.'))
      document.body.appendChild(script)
    })
  }

  return scriptPromise
}

export async function openMidtransSnap(
  snapToken: string,
  clientKey: string,
  handlers?: {
    onSuccess?: (result: unknown) => void
    onPending?: (result: unknown) => void
    onError?: (result: unknown) => void
    onClose?: () => void
  },
  production = false,
) {
  await loadMidtransSnap(clientKey, production)
  window.snap?.pay(snapToken, handlers)
}
