import { FetchError } from 'ofetch'
import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

export function handleMutationError<
  TValidation extends Record<string, string[]> = Record<string, string[]>,
>(error: unknown, opts?: { validationErrors?: Ref<Partial<TValidation>>; silent?: boolean }) {
  if (!(error instanceof FetchError)) {
    console.error(error)
    if (opts?.silent) return
    if (error instanceof Error) return toast.error(error.message)
    return toast.error('Terjadi kesalahan yang tidak terduga')
  }

  if (error.statusCode === 422 && opts?.validationErrors) {
    opts.validationErrors.value = (error.data as any)?.errors ?? {}
  }

  if (opts?.silent) return

  if (error.data?.message) return toast.error(error.data.message)
  if (error.message) return toast.error(error.message)

  return toast.error('Terjadi kesalahan yang tidak diketahui')
}

export function extractErrorMessage(error: unknown, fallback: string) {
  if (error instanceof FetchError) {
    if (error.data?.message) return String(error.data.message)

    const firstFieldError = error.data?.errors
      ? Object.values(error.data.errors as Record<string, string[]>)[0]?.[0]
      : undefined

    if (firstFieldError) return firstFieldError
  }

  if (error instanceof Error && error.message) return error.message

  return fallback
}
