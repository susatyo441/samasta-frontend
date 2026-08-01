/**
 * Build a Google Maps iframe embed URL from a share link or venue text.
 * Uses the legacy output=embed endpoint (no API key required).
 */
export function mapsEmbedFromUrl(mapsUrl: string): string | null {
  const trimmed = mapsUrl.trim()
  if (!trimmed) return null

  if (trimmed.includes('/maps/embed')) return trimmed

  try {
    const parsed = new URL(trimmed)

    const query = parsed.searchParams.get('q') || parsed.searchParams.get('query')
    if (query) return embedQuery(query)

    const placeMatch = trimmed.match(/\/maps\/place\/([^/@?]+)/)
    if (placeMatch?.[1]) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      return embedQuery(place)
    }

    const coordMatch = trimmed.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (coordMatch) return embedQuery(`${coordMatch[1]},${coordMatch[2]}`)

    if (parsed.hostname.includes('google') && parsed.pathname.includes('/maps')) {
      return embedQuery(trimmed)
    }
  } catch {
    return embedQuery(trimmed)
  }

  return embedQuery(trimmed)
}

export function mapsEmbedFromVenue(venueName?: string, venueAddress?: string): string | null {
  const parts = [venueName, venueAddress].map((part) => part?.trim()).filter(Boolean)
  if (!parts.length) return null
  return embedQuery(parts.join(', '))
}

export function resolveMapsEmbedUrl(options: {
  mapsUrl?: string
  venueName?: string
  venueAddress?: string
}): string | null {
  if (options.mapsUrl?.trim()) {
    return mapsEmbedFromUrl(options.mapsUrl)
  }
  return mapsEmbedFromVenue(options.venueName, options.venueAddress)
}

function embedQuery(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}
