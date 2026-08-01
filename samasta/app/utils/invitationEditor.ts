import type {
  Invitation,
  InvitationGift,
  InvitationMedia,
} from '~/types'

export interface InvitationEditorDraft {
  title: string
  greeting: string
  quote: string
  themeId: string
  coverGradient: string
  streamingUrl: string
  rsvpDeadline: string
  hosts: Array<{ name: string; role?: string }>
  events: Array<{
    name: string
    date: string
    startTime?: string
    endTime?: string
    venueName?: string
    venueAddress?: string
    mapsUrl?: string
  }>
  loveStory: Array<{ year?: string; title?: string; description?: string }>
  music: { title?: string; autoplay?: boolean; url?: string }
  gift: InvitationGift
  settings: {
    showCountdown?: boolean
    showGuestBook?: boolean
    passwordProtected?: boolean
  }
  gallery: InvitationMedia[]
  coverImage: InvitationMedia | null
}

export function createInvitationDraft(invitation: Invitation): InvitationEditorDraft {
  return {
    title: invitation.title || '',
    greeting: invitation.greeting || '',
    quote: invitation.quote || '',
    themeId: invitation.themeId || '',
    coverGradient: invitation.coverGradient || 'from-pink-100 to-amber-100',
    streamingUrl: invitation.streamingUrl || '',
    rsvpDeadline: invitation.rsvpDeadline ? String(invitation.rsvpDeadline).slice(0, 10) : '',
    hosts: structuredClone(invitation.hosts || [{ name: '', role: '' }]),
    events: structuredClone(
      invitation.events || [
        {
          name: '',
          date: '',
          startTime: '',
          endTime: '',
          venueName: '',
          venueAddress: '',
          mapsUrl: '',
        },
      ],
    ),
    loveStory: structuredClone(invitation.loveStory || []),
    music: {
      title: invitation.music?.title || '',
      autoplay: Boolean(invitation.music?.autoplay),
      url: invitation.music?.url || '',
    },
    gift: structuredClone({
      cashlessEnabled: Boolean(invitation.gift?.cashlessEnabled),
      shippingEnabled: Boolean(invitation.gift?.shippingEnabled),
      wishlistEnabled: Boolean(invitation.gift?.wishlistEnabled),
      bankAccounts: invitation.gift?.bankAccounts?.length
        ? invitation.gift.bankAccounts
        : [{ bankName: '', accountNumber: '', accountHolder: '' }],
      wishlistItems: invitation.gift?.wishlistItems?.length
        ? invitation.gift.wishlistItems
        : [{ name: '', price: 0 }],
    }),
    settings: {
      showCountdown: Boolean(invitation.settings?.showCountdown ?? true),
      showGuestBook: invitation.settings?.showGuestBook !== false,
      passwordProtected: Boolean(invitation.settings?.passwordProtected),
    },
    gallery: structuredClone(invitation.gallery || []),
    coverImage: invitation.coverImage ? structuredClone(invitation.coverImage) : null,
  }
}

export function buildModulePayload(moduleId: string, draft: InvitationEditorDraft) {
  switch (moduleId) {
    case 'theme':
      return {
        themeId: draft.themeId || null,
        coverGradient: draft.coverGradient || null,
      }
    case 'hosts':
      return {
        title: draft.title.trim(),
        greeting: draft.greeting,
        hosts: draft.hosts
          .map((host) => ({
            name: host.name.trim(),
            role: host.role?.trim() || undefined,
          }))
          .filter((host) => host.name),
      }
    case 'events':
      return {
        events: draft.events
          .map((event) => ({
            name: event.name.trim(),
            date: event.date,
            startTime: event.startTime || undefined,
            endTime: event.endTime || undefined,
            venueName: event.venueName || undefined,
            venueAddress: event.venueAddress || undefined,
            mapsUrl: event.mapsUrl || undefined,
          }))
          .filter((event) => event.name && event.date),
      }
    case 'music':
      return {
        music: {
          title: draft.music.title?.trim() || '',
          autoplay: Boolean(draft.music.autoplay),
          url: draft.music.url?.trim() || undefined,
        },
      }
    case 'story':
      return {
        loveStory: draft.loveStory
          .map((item) => ({
            year: item.year?.trim() || undefined,
            title: item.title?.trim() || undefined,
            description: item.description?.trim() || undefined,
          }))
          .filter((item) => item.title || item.description),
      }
    case 'quote':
      return { quote: draft.quote }
    case 'gift':
      return {
        gift: {
          cashlessEnabled: Boolean(draft.gift.cashlessEnabled),
          shippingEnabled: Boolean(draft.gift.shippingEnabled),
          wishlistEnabled: Boolean(draft.gift.wishlistEnabled),
          bankAccounts: (draft.gift.bankAccounts || [])
            .map((acc) => ({
              bankName: acc.bankName.trim(),
              accountNumber: acc.accountNumber.trim(),
              accountHolder: acc.accountHolder.trim(),
            }))
            .filter((acc) => acc.bankName && acc.accountNumber),
          wishlistItems: (draft.gift.wishlistItems || [])
            .map((item) => ({
              name: item.name.trim(),
              price: Number(item.price) || 0,
            }))
            .filter((item) => item.name),
        },
      }
    case 'rsvp':
      return {
        rsvpDeadline: draft.rsvpDeadline || null,
      }
    case 'streaming':
      return {
        streamingUrl: draft.streamingUrl.trim() || '',
      }
    case 'settings':
      return {
        title: draft.title.trim(),
        greeting: draft.greeting,
        settings: {
          ...draft.settings,
        },
      }
    default:
      return null
  }
}

export const EDITOR_INPUT_CLASS =
  'mt-1 w-full rounded-xl border border-samasta-burgundy/15 bg-white px-3 py-2.5 text-sm outline-none ring-samasta-burgundy/25 focus:ring-2'
