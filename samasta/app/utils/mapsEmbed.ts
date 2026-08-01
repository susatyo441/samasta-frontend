/**
 * Build a Google Maps iframe embed URL from a share link or venue text.
 * Uses the legacy output=embed endpoint (no API key required).
 */
export function isGenericMapsUrl(mapsUrl: string): boolean {
  try {
    const parsed = new URL(mapsUrl.trim())
    if (!parsed.hostname.includes('google') && !parsed.hostname.includes('maps.app.goo.gl') && !parsed.hostname.includes('goo.gl')) {
      return false
    }
    const path = parsed.pathname.replace(/\/+$/, '') || '/'
    const hasQueryPlace =
      Boolean(parsed.searchParams.get('q') || parsed.searchParams.get('query'))
    const hasPlacePath = /\/maps\/(place|dir|search)\//.test(parsed.pathname)
    const hasCoords = /@-?\d/.test(parsed.pathname + parsed.hash)
    const hasEmbed = parsed.pathname.includes('/maps/embed')
    const isShortLink = parsed.hostname.includes('goo.gl') || parsed.hostname === 'maps.app.goo.gl'

    if (hasQueryPlace || hasPlacePath || hasCoords || hasEmbed || isShortLink) return false

    // Bare homepage /maps with no place info — e.g. https://maps.google.com
    return path === '/' || path === '/maps' || path === '/maps/embed'
  } catch {
    return false
  }
}

export function mapsEmbedFromUrl(mapsUrl: string): string | null {
  const trimmed = mapsUrl.trim()
  if (!trimmed || isGenericMapsUrl(trimmed)) return null

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

    // Short links cannot be resolved client-side without a fetch redirect;
    // fall through so caller can use venue text instead.
    if (parsed.hostname.includes('goo.gl') || parsed.hostname === 'maps.app.goo.gl') {
      return null
    }
  } catch {
    return null
  }

  return null
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
    const fromUrl = mapsEmbedFromUrl(options.mapsUrl)
    if (fromUrl) return fromUrl
  }
  return mapsEmbedFromVenue(options.venueName, options.venueAddress)
}

function embedQuery(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}
