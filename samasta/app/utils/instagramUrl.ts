/**
 * Build a public Instagram profile URL from a handle or full URL.
 */
export function instagramProfileUrl(value?: string | null): string | null {
  const raw = value?.trim()
  if (!raw) return null

  if (/^https?:\/\//i.test(raw)) return raw

  const handle = raw.replace(/^@/, '').replace(/^instagram\.com\//i, '').replace(/\/$/, '')
  if (!handle) return null

  return `https://instagram.com/${encodeURIComponent(handle)}`
}

export function instagramHandleLabel(value?: string | null): string | null {
  const raw = value?.trim()
  if (!raw) return null

  if (/^https?:\/\//i.test(raw)) {
    try {
      const path = new URL(raw).pathname.replace(/^\/+|\/+$/g, '')
      return path ? `@${path.split('/')[0]}` : 'Instagram'
    } catch {
      return 'Instagram'
    }
  }

  return raw.startsWith('@') ? raw : `@${raw}`
}
