export type InvitationEventType = 'wedding' | 'birthday' | 'other'

export interface InvitationTheme {
  id: string
  name: string
  tag?: string | null
  coverGradient?: string | null
  previewImage?: string | null
  eventTypes: InvitationEventType[]
  componentKey: string
  isPremium: boolean
  isActive: boolean
  sortOrder: number
}

export interface InvitationThemePayload {
  slug: string
  name: string
  tag?: string | null
  coverGradient?: string | null
  previewImagePath?: string | null
  eventTypes?: InvitationEventType[]
  componentKey?: string | null
  isPremium?: boolean
  isActive?: boolean
  sortOrder?: number
}

export interface PaginatedInvitationThemes {
  data: InvitationTheme[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  links?: {
    first?: string | null
    last?: string | null
    prev?: string | null
    next?: string | null
  }
}

export interface InvitationThemeFilters {
  q?: string
  isActive?: boolean | null
  eventType?: InvitationEventType | ''
  page?: number
  perPage?: number
}
