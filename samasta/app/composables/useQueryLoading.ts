export function useQueryLoading(query: { status: { value: string }; asyncStatus?: { value: string } }) {
  return computed(() => {
    const asyncStatus = query.asyncStatus?.value
    if (asyncStatus) return asyncStatus === 'loading'
    return query.status.value === 'pending'
  })
}
