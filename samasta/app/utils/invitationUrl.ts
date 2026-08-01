import type { InvitationGuest } from '~/types'

export type GuestInviteParams = {
  guestId?: string
  guestName?: string
}

export function buildInvitationUrl(publicPath: string) {
  if (import.meta.client) {
    return `${window.location.origin}${publicPath}`
  }
  return publicPath
}

export function buildGuestInvitationUrl(publicPath: string, params?: GuestInviteParams) {
  const base = buildInvitationUrl(publicPath)
  if (!params?.guestId && !params?.guestName) return base

  const url = new URL(base, import.meta.client ? window.location.origin : 'http://localhost')
  if (params.guestId) url.searchParams.set('guest', params.guestId)
  if (params.guestName) url.searchParams.set('to', params.guestName)
  return url.toString()
}

export function buildWhatsappInviteMessage(guestName: string, invitationTitle: string, link: string) {
  return `Halo ${guestName},\n\nKami mengundang Anda ke undangan *${invitationTitle}*.\n\nSilakan buka undangan dan konfirmasi kehadiran:\n${link}\n\nTerima kasih 🙏`
}

export function normalizeWhatsappPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  return digits
}

export function buildGuestWhatsappUrl(
  publicPath: string,
  guest: Pick<InvitationGuest, 'id' | 'name' | 'phone'>,
  invitationTitle: string,
) {
  const link = buildGuestInvitationUrl(publicPath, {
    guestId: guest.id,
    guestName: guest.name,
  })
  const message = buildWhatsappInviteMessage(guest.name, invitationTitle, link)
  const encoded = encodeURIComponent(message)

  if (guest.phone?.trim()) {
    const phone = normalizeWhatsappPhone(guest.phone)
    if (phone) return `https://wa.me/${phone}?text=${encoded}`
  }

  return `https://wa.me/?text=${encoded}`
}

export function buildWhatsappShareUrl(publicPath: string, message?: string) {
  const link = buildInvitationUrl(publicPath)
  const text = message ?? `Halo, kamu diundang! Buka undangan: ${link}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function guestInviteParams(guest: Pick<InvitationGuest, 'id' | 'name'>): GuestInviteParams {
  return { guestId: guest.id, guestName: guest.name }
}
