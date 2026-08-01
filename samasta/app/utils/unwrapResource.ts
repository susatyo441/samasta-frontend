/** Unwrap Laravel JsonResource `{ data: T }` or return flat payloads as-is. */
export function unwrapResource<T>(payload: T | { data: T } | null | undefined): T | null {
  if (!payload) return null
  if (typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }
  return payload
}
