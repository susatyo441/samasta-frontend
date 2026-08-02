import type { Invitation } from '~/types'

export function usePublicGuestContext(invitation?: MaybeRefOrGetter<Invitation | null | undefined>) {
  const route = useRoute()

  const guestId = computed(() => {
    const raw = route.query.guestId ?? route.query.guest
    return raw ? String(raw) : undefined
  })

  const guestNameFromQuery = computed(() => {
    const raw = route.query.to
    if (!raw) return undefined
    return decodeURIComponent(String(raw))
  })

  const matchedGuest = computed(() => {
    const inv = invitation ? toValue(invitation) : null
    if (inv?.viewerGuest) return inv.viewerGuest
    if (!inv?.guests?.length) return null

    if (guestId.value) {
      return (
        inv.guests.find(
          (guest) => guest.id === guestId.value || guest.id === `gst-${guestId.value}`,
        ) ?? null
      )
    }

    if (guestNameFromQuery.value) {
      const queryName = guestNameFromQuery.value.toLowerCase()
      return inv.guests.find((guest) => guest.name.toLowerCase() === queryName) ?? null
    }

    return null
  })

  const guestName = computed(
    () => matchedGuest.value?.name ?? guestNameFromQuery.value ?? null,
  )

  const checkInGuest = computed(() => {
    const guest = matchedGuest.value
    if (guest?.rsvp !== 'hadir' || !guest.checkInToken) return null
    return guest
  })

  return {
    guestId,
    guestName,
    prefilledName: computed(() => guestName.value ?? ''),
    matchedGuest,
    hasPersonalization: computed(() => Boolean(guestName.value)),
    checkInGuest,
  }
}
