import type { Invitation } from '~/types'

/** Static marketing demos — not loaded from the API. */
export const themeDemoInvitations: Record<string, Invitation> = {
  'aurora-pastel': {
    id: 0,
    userId: 0,
    eventType: 'wedding',
    title: 'Pernikahan Nara & Bimas',
    slug: 'demo-aurora-pastel',
    publicUrl: '/demo/aurora-pastel',
    status: 'active',
    themeId: 'aurora-pastel',
    coverGradient: 'from-fuchsia-100 via-violet-50 to-indigo-100',
    hosts: [
      { name: 'Nara Ayudia', role: 'Mempelai Wanita' },
      { name: 'Bimas Aditya', role: 'Mempelai Pria' },
    ],
    greeting:
      'Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam hari bahagia kami.',
    quote:
      'Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat kebesaran Allah.',
    loveStory: [
      {
        year: '2018',
        title: 'Awal Bertemu',
        description: 'Bertemu di acara komunitas buku dan saling bertukar rekomendasi novel.',
      },
      {
        year: '2021',
        title: 'Menjadi Pasangan',
        description: 'Memutuskan untuk saling menjaga dan merencanakan masa depan bersama.',
      },
      {
        year: '2026',
        title: 'Menuju Pelaminan',
        description: 'Siap mengikat janji suci di hadapan keluarga dan sahabat.',
      },
    ],
    events: [
      {
        name: 'Akad Nikah',
        date: '2026-11-14',
        startTime: '09:00',
        endTime: '10:30',
        venueName: 'Masjid Al-Falah',
        venueAddress: 'Jl. Cendana No. 8, Yogyakarta',
        mapsUrl: 'https://maps.google.com/?q=Yogyakarta',
      },
      {
        name: 'Resepsi',
        date: '2026-11-14',
        startTime: '18:00',
        endTime: '21:00',
        venueName: 'Garden Pavilion Samasta',
        venueAddress: 'Jl. Merapi Raya No. 12, Yogyakarta',
        mapsUrl: 'https://maps.google.com/?q=Yogyakarta',
      },
    ],
    gallery: [
      {
        id: 'demo-g1',
        type: 'image',
        label: 'Engagement',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      },
      {
        id: 'demo-g2',
        type: 'image',
        label: 'Prewedding',
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
      },
      {
        id: 'demo-g3',
        type: 'image',
        label: 'Momen bersama',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      },
    ],
    coverImage: {
      id: 'demo-cover',
      type: 'image',
      label: 'Cover',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80',
    },
    music: {
      title: 'Demo — tanpa audio',
      autoplay: false,
    },
    streamingUrl: '',
    rsvpDeadline: '2026-11-01',
    gift: {
      cashlessEnabled: true,
      shippingEnabled: true,
      wishlistEnabled: true,
      qrisEnabled: false,
      bankAccounts: [
        {
          bankName: 'BCA',
          accountNumber: '0123456789',
          accountHolder: 'Nara Ayudia',
        },
      ],
      shippingAddress: 'Jl. Cendana No. 8, Yogyakarta',
      wishlistItems: [
        { name: 'Set peralatan makan', price: 450000 },
        { name: 'Vacuum cleaner mini', price: 780000 },
      ],
    },
    guests: [
      {
        id: 'demo-w1',
        name: 'Rania Putri',
        message: 'Selamat menempuh hidup baru! Semoga selalu diberkahi.',
        rsvp: 'hadir',
        quota: 2,
        checkInToken: 'rania1',
      },
      {
        id: 'demo-w2',
        name: 'Farhan Malik',
        message: 'Bahagia selalu untuk Nara & Bimas. Sampai jumpa di resepsi!',
        rsvp: 'hadir',
        quota: 1,
        checkInToken: 'farhn2',
      },
    ],
    managers: [
      { name: 'Atelier Bunga', role: 'Dekorasi', instagram: 'atelierbunga' },
      { name: 'Lens & Light', role: 'Fotografer', instagram: 'lensandlight' },
    ],
    settings: {
      showCountdown: true,
      showGuestBook: true,
      isStaticDemo: true,
    },
  },

  'confetti-pop': {
    id: 0,
    userId: 0,
    eventType: 'birthday',
    title: 'Ultah ke-27 Mira',
    slug: 'demo-confetti-pop',
    publicUrl: '/demo/confetti-pop',
    status: 'active',
    themeId: 'confetti-pop',
    coverGradient: 'from-amber-100 via-rose-50 to-orange-100',
    hosts: [{ name: 'Mira Santika', role: 'Yang berulang tahun' }],
    greeting: 'Yuk rayakan usia baru Mira bersama keluarga dan sahabat tercinta!',
    quote: 'Hari ini adalah hadiah. Rayakan dengan penuh syukur.',
    loveStory: [],
    events: [
      {
        name: 'Birthday Party',
        date: '2026-10-05',
        startTime: '16:00',
        endTime: '21:00',
        venueName: 'Rooftop Luna Cafe',
        venueAddress: 'Jl. Asia Afrika No. 5, Bandung',
        mapsUrl: 'https://maps.google.com/?q=Bandung',
      },
    ],
    gallery: [
      {
        id: 'demo-c1',
        type: 'image',
        label: 'Highlight',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
      },
      {
        id: 'demo-c2',
        type: 'image',
        label: 'Teman-teman',
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
      },
    ],
    coverImage: {
      id: 'demo-c-cover',
      type: 'image',
      label: 'Cover',
      url: 'https://images.unsplash.com/photo-1464347491790-59144774f5a5?w=900&q=80',
    },
    music: { title: 'Demo — tanpa audio', autoplay: false },
    rsvpDeadline: '2026-09-28',
    gift: {
      cashlessEnabled: true,
      shippingEnabled: false,
      wishlistEnabled: true,
      qrisEnabled: false,
      bankAccounts: [
        {
          bankName: 'Mandiri',
          accountNumber: '9876543210',
          accountHolder: 'Mira Santika',
        },
      ],
      wishlistItems: [
        { name: 'Buku catatan kulit', price: 180000 },
        { name: 'Diffuser aroma', price: 250000 },
      ],
    },
    guests: [
      {
        id: 'demo-cw1',
        name: 'Salsa',
        message: 'Happy birthday Miraaa! Semoga makin glowing ✨',
        rsvp: 'hadir',
        quota: 1,
      },
    ],
    managers: [],
    settings: {
      showCountdown: true,
      showGuestBook: true,
      isStaticDemo: true,
    },
  },
}

export function getThemeDemo(themeKey: string): Invitation | null {
  return themeDemoInvitations[themeKey] ?? null
}
