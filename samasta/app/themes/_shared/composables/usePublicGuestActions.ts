import { useQueryCache } from '@pinia/colada'
import { INVITATION_QUERY_KEYS, submitPublicRsvp, submitPublicWish } from '~/queries/invitations'
import type { Invitation, InvitationGuest } from '~/types'
import { extractErrorMessage } from '~/utils/handleMutationError'

type PublicInvitationPayload = { data: Invitation }

function mergeGuestIntoInvitation(invitation: Invitation, guest: InvitationGuest): Invitation {
  const guests = [...(invitation.guests || [])]
  const index = guests.findIndex((item) => item.id === guest.id)

  if (index >= 0) {
    guests[index] = { ...guests[index], ...guest }
  } else if (guest.message?.trim()) {
    guests.unshift(guest)
  }

  const withMessages = guests.filter((item) => Boolean(item.message?.trim()))

  return {
    ...invitation,
    guests: withMessages,
    stats: {
      guests: invitation.stats?.guests ?? guests.length,
      attending: invitation.stats?.attending ?? 0,
      messages: withMessages.length,
    },
  }
}

export function usePublicGuestActions(slug: MaybeRefOrGetter<string>) {
  const route = useRoute()
  const queryCache = useQueryCache()

  const guestId = computed(() => {
    const raw = route.query.guestId ?? route.query.guest
    return raw ? String(raw) : undefined
  })

  const rsvpSubmitting = ref(false)
  const rsvpSuccess = ref(false)
  const rsvpError = ref('')

  const wishSubmitting = ref(false)
  const wishSuccess = ref(false)
  const wishError = ref('')

  function patchInvitationCache(guest: InvitationGuest) {
    const resolvedSlug = toValue(slug)
    if (!resolvedSlug) return

    queryCache.setQueryData<PublicInvitationPayload>(
      INVITATION_QUERY_KEYS.bySlug(resolvedSlug),
      (old) => {
        if (!old?.data) return old as PublicInvitationPayload
        return {
          ...old,
          data: mergeGuestIntoInvitation(old.data, guest),
        }
      },
    )
  }

  async function submitRsvp(payload: {
    name: string
    status: 'hadir' | 'tidak' | 'ragu'
    quota?: number
  }) {
    const resolvedSlug = toValue(slug)
    if (!resolvedSlug) return false

    rsvpSubmitting.value = true
    rsvpError.value = ''

    try {
      const result = await submitPublicRsvp(resolvedSlug, {
        name: payload.name,
        rsvp: payload.status,
        quota: payload.quota,
        guestId: guestId.value,
      })
      patchInvitationCache(result.data)
      rsvpSuccess.value = true
      return true
    } catch (err) {
      rsvpError.value = extractErrorMessage(err, 'Gagal mengirim RSVP.')
      return false
    } finally {
      rsvpSubmitting.value = false
    }
  }

  async function submitWish(payload: { name: string; message: string }) {
    const resolvedSlug = toValue(slug)
    if (!resolvedSlug) return false

    wishSubmitting.value = true
    wishError.value = ''

    try {
      const result = await submitPublicWish(resolvedSlug, {
        name: payload.name,
        message: payload.message,
        guestId: guestId.value,
      })
      patchInvitationCache(result.data)
      wishSuccess.value = true
      return true
    } catch (err) {
      wishError.value = extractErrorMessage(err, 'Gagal mengirim ucapan.')
      return false
    } finally {
      wishSubmitting.value = false
    }
  }

  return {
    guestId,
    rsvpSubmitting,
    rsvpSuccess,
    rsvpError,
    wishSubmitting,
    wishSuccess,
    wishError,
    submitRsvp,
    submitWish,
  }
}
