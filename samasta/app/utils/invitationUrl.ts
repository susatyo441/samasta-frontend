export function buildInvitationUrl(publicPath: string) {
  if (import.meta.client) {
    return `${window.location.origin}${publicPath}`
  }
  return publicPath
}

export function buildWhatsappShareUrl(publicPath: string, message?: string) {
  const link = buildInvitationUrl(publicPath)
  const text = message ?? `Halo, kamu diundang! Buka undangan: ${link}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
