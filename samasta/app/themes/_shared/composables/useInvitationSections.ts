import type { Invitation, InvitationGift } from '~/types'

export function useInvitationSections(invitation: MaybeRefOrGetter<Invitation>) {
  const invite = computed(() => toValue(invitation))

  const gift = computed(() => (invite.value.gift || {}) as InvitationGift)

  const guestMessages = computed(() =>
    (invite.value.guests || []).filter((guest) => Boolean(guest.message?.trim())),
  )

  const coverUrl = computed(() => invite.value.coverImage?.url || null)

  const galleryItems = computed(() => invite.value.gallery || [])

  const primaryEvent = computed(() => invite.value.events?.[0] ?? null)

  const showCountdown = computed(() => Boolean(invite.value.settings?.showCountdown))

  const showGuestBook = computed(() => invite.value.settings?.showGuestBook !== false)

  const gradientClass = computed(
    () => invite.value.coverGradient || 'from-pink-100 via-amber-50 to-rose-100',
  )

  return {
    invite,
    gift,
    guestMessages,
    coverUrl,
    galleryItems,
    primaryEvent,
    showCountdown,
    showGuestBook,
    gradientClass,
  }
}
