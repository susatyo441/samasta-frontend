import { useQueryCache } from '@pinia/colada'
import {
  blastInvitationWhatsapp,
  checkInInvitationGuest,
  checkInInvitationGuestByToken,
  createInvitation,
  createInvitationGuest,
  deleteInvitationGuest,
  deleteInvitationMedia,
  fetchPublishStatus,
  importInvitationGuests,
  INVITATION_QUERY_KEYS,
  publishInvitation,
  sendInvitationGuestWhatsapp,
  undoInvitationGuestCheckIn,
  updateInvitation,
  updateInvitationGuest,
  uploadInvitationMedia,
} from '~/queries/invitations'
import type {
  CreateInvitationPayload,
  GuestPayload,
  InvitationUpdatePayload,
} from '~/types'

export function useInvitationMutations(invitationId?: MaybeRefOrGetter<string | number>) {
  const queryCache = useQueryCache()

  async function invalidateInvitation(id?: string | number) {
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.root })
    const resolvedId = id ?? (invitationId ? toValue(invitationId) : undefined)
    if (resolvedId) {
      await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.byId(resolvedId) })
    }
  }

  async function create(payload: CreateInvitationPayload) {
    const result = await createInvitation(payload)
    await invalidateInvitation()
    return result.data
  }

  async function update(payload: InvitationUpdatePayload) {
    const id = toValue(invitationId!)
    const result = await updateInvitation(id, payload)
    await invalidateInvitation(id)
    return result.data
  }

  async function uploadMedia(file: File, type: 'cover' | 'gallery', label?: string) {
    const id = toValue(invitationId!)
    const result = await uploadInvitationMedia(id, file, type, label)
    await invalidateInvitation(id)
    return result.data
  }

  async function removeMedia(mediaId: string) {
    const id = toValue(invitationId!)
    await deleteInvitationMedia(id, mediaId)
    await invalidateInvitation(id)
  }

  async function publish(planId: string) {
    const id = toValue(invitationId!)
    const result = await publishInvitation(id, planId)
    await invalidateInvitation(id)
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.transactions() })
    return result.data
  }

  async function syncPublishStatus(transactionId: string | number) {
    const id = toValue(invitationId!)
    const result = await fetchPublishStatus(id, transactionId)
    await invalidateInvitation(id)
    return result.data
  }

  return {
    create,
    update,
    uploadMedia,
    removeMedia,
    publish,
    syncPublishStatus,
    invalidateInvitation,
  }
}

export function useInvitationGuestMutations(invitationId: MaybeRefOrGetter<string | number>) {
  const queryCache = useQueryCache()

  async function invalidate() {
    const id = toValue(invitationId)
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.guests(id) })
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.analytics(id) })
    await queryCache.invalidateQueries({ key: INVITATION_QUERY_KEYS.byId(id) })
  }

  async function createGuest(payload: GuestPayload) {
    const id = toValue(invitationId)
    const result = await createInvitationGuest(id, payload)
    await invalidate()
    return result.data
  }

  async function updateGuest(guestId: string | number, payload: GuestPayload) {
    const id = toValue(invitationId)
    const result = await updateInvitationGuest(id, guestId, payload)
    await invalidate()
    return result.data
  }

  async function removeGuest(guestId: string | number) {
    const id = toValue(invitationId)
    await deleteInvitationGuest(id, guestId)
    await invalidate()
  }

  async function importCsv(file: File) {
    const id = toValue(invitationId)
    const result = await importInvitationGuests(id, file)
    await invalidate()
    return result
  }

  async function blastWhatsapp(payload?: { guestIds?: string[]; skipSent?: boolean }) {
    const id = toValue(invitationId)
    const result = await blastInvitationWhatsapp(id, payload)
    await invalidate()
    return result.data
  }

  async function sendWhatsapp(guestId: string | number) {
    const id = toValue(invitationId)
    const result = await sendInvitationGuestWhatsapp(id, guestId)
    await invalidate()
    return result.data
  }

  async function checkInByToken(token: string) {
    const id = toValue(invitationId)
    const result = await checkInInvitationGuestByToken(id, token)
    await invalidate()
    return result
  }

  async function checkInGuest(guestId: string | number) {
    const id = toValue(invitationId)
    const result = await checkInInvitationGuest(id, guestId)
    await invalidate()
    return result
  }

  async function undoCheckIn(guestId: string | number) {
    const id = toValue(invitationId)
    const result = await undoInvitationGuestCheckIn(id, guestId)
    await invalidate()
    return result.data
  }

  return {
    createGuest,
    updateGuest,
    removeGuest,
    importCsv,
    blastWhatsapp,
    sendWhatsapp,
    checkInByToken,
    checkInGuest,
    undoCheckIn,
  }
}
