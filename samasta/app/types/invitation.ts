export interface InvitationGift {
  cashlessEnabled?: boolean
  shippingEnabled?: boolean
  wishlistEnabled?: boolean
  bankAccounts?: Array<{ bankName: string; accountNumber: string; accountHolder: string }>
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
  gallery?: Array<{ id: string; type: string; label?: string }>
  music?: { title?: string; autoplay?: boolean }
  streamingUrl?: string
  rsvpDeadline?: string | null
  gift?: InvitationGift
  stats?: { guests: number; attending: number; messages: number }
  guests?: InvitationGuest[]
  managers?: Array<{ name: string; role?: string }>
  settings?: Record<string, unknown>
}

export interface InvitationTransaction {
  id: string
  userId: number
  invitationId: number
  plan: string
  amount: number
  status: string
  paidAt?: string | null
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
