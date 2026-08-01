export function invitationStatusClasses(status: string) {
  return status === 'active'
    ? 'bg-green-100 text-green-700'
    : 'bg-amber-100 text-amber-700'
}

export function rsvpStatusClasses(rsvp: string) {
  if (rsvp === 'hadir') return 'bg-green-100 text-green-700'
  if (rsvp === 'tidak') return 'bg-rose-100 text-rose-700'
  return 'bg-amber-100 text-amber-700'
}

export function eventTypeCoverLabel(eventType: string) {
  if (eventType === 'wedding') return 'The Wedding Of'
  if (eventType === 'birthday') return 'Birthday Invitation'
  return 'You Are Invited'
}

export function eventTypeHeaderLabel(eventType: string) {
  if (eventType === 'wedding') return 'Undangan Pernikahan'
  if (eventType === 'birthday') return 'Undangan Ulang Tahun'
  return 'Undangan Acara'
}

export function eventTypeHostsLabel(eventType: string) {
  if (eventType === 'wedding') return 'Mempelai'
  if (eventType === 'birthday') return 'Yang Merayakan'
  return 'Tamu Undangan'
}

export function eventTypeStoryLabel(eventType: string) {
  return eventType === 'wedding' ? 'Kisah Cinta' : 'Cerita'
}
