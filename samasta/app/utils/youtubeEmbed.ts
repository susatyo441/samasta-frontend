/**
 * Extract a YouTube video id and return an embed-safe URL.
 */
export function youtubeVideoId(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }

    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtube-nocookie.com')) {
      const fromQuery = parsed.searchParams.get('v')
      if (fromQuery) return fromQuery

      const pathMatch = parsed.pathname.match(/\/(?:embed|live|shorts|v)\/([^/?]+)/)
      if (pathMatch?.[1]) return pathMatch[1]
    }
  } catch {
    // fall through
  }

  return null
}

export function youtubeEmbedUrl(url: string): string | null {
  const id = youtubeVideoId(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}`
}

export function isYoutubeUrl(url: string) {
  return Boolean(youtubeVideoId(url))
}
