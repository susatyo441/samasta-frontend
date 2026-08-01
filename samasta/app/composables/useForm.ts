export const useForm = <T extends Record<string, any>>(initialValues: T | (() => T)) => {
  const getInitialValues = () =>
    typeof initialValues === 'function' ? initialValues() : structuredClone(initialValues)

  const form = ref<T>(getInitialValues())
  const validationErrors = ref<Partial<Record<keyof T, string[]>>>({})

  const reset = () => {
    form.value = getInitialValues()
    validationErrors.value = {}
  }

  const hasError = (field: keyof T) => {
    return Boolean(validationErrors.value[field]?.length)
  }

  return {
    form,
    validationErrors,
    reset,
    hasError,
  }
}
