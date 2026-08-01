export interface InvitationGift {
  cashlessEnabled?: boolean
  shippingEnabled?: boolean
  wishlistEnabled?: boolean
  bankAccounts?: Array<{ bankName: string; accountNumber: string; accountHolder: string }>
  shippingAddress?: string
  wishlistItems?: Array<{ name: string; price: number }>
}

export interface InvitationGuest {
  id: string
  name: string
  phone?: string
  group?: string
  quota?: number
  rsvp?: string
  message?: string
}

export interface InvitationMedia {
  id: string
  type: string
  label?: string
  path?: string
  url?: string
}

/** @deprecated Prefer InvitationMedia */
export type InvitationMediaItem = InvitationMedia

export interface Invitation {
  id: number
  userId: number
  eventType: string
  title: string
  slug: string
  publicUrl: string
  accessCode?: string
  status: string
  themeId?: string
  coverGradient?: string
  hosts?: Array<{ name: string; role?: string }>
  greeting?: string
  quote?: string
  loveStory?: Array<{ year?: string; title?: string; description?: string }>
  events?: Array<{
    name: string
    date: string
    startTime?: string
    endTime?: string
    venueName?: string
    venueAddress?: string
    mapsUrl?: string
  }>
  gallery?: InvitationMedia[]
  coverImage?: InvitationMedia | null
  music?: { title?: string; autoplay?: boolean; url?: string }
  streamingUrl?: string
  rsvpDeadline?: string | null
  gift?: InvitationGift
  stats?: { guests: number; attending: number; messages: number }
  guests?: InvitationGuest[]
  managers?: Array<{ name: string; role?: string }>
  settings?: Record<string, unknown>
}

export interface InvitationTransaction {
  id: number | string
  userId: number
  invitationId: number
  referenceNumber?: string
  plan: string
  amount: number
  status: string
  paidAt?: string | null
}

export interface InvitationPlan {
  id: string
  name: string
  amount: number
  description?: string
}

export type InvitationUpdatePayload = Partial<
  Pick<
    Invitation,
    | 'title'
    | 'slug'
    | 'eventType'
    | 'status'
    | 'themeId'
    | 'coverGradient'
    | 'hosts'
    | 'greeting'
    | 'quote'
    | 'loveStory'
    | 'events'
    | 'music'
    | 'streamingUrl'
    | 'rsvpDeadline'
    | 'gift'
    | 'settings'
  >
>

export interface CreateInvitationPayload {
  title: string
  eventType?: string
  slug?: string
}

export interface PublishInvitationResult {
  transaction: InvitationTransaction
  snapToken: string | null
  clientKey: string | null
  invitationStatus: string
}

export interface GuestPayload {
  name: string
  phone?: string
  group?: string
  quota?: number
  rsvp?: string
  message?: string
}

export interface PublicRsvpPayload {
  name: string
  rsvp: 'hadir' | 'tidak' | 'ragu'
  quota?: number
  guestId?: string
}

export interface PublicWishPayload {
  name: string
  message: string
  guestId?: string
}

export interface EditorModule {
  id: string
  label: Record<string, string>
  icon: string
  description: string
  highlight?: boolean
}

export interface PaginatedInvitations {
  data: Invitation[]
}
