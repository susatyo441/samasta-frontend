// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NUXT_DEVTOOLS_ENABLED === 'true' },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      sanctum: {
        baseUrl: import.meta.env.NUXT_PUBLIC_SANCTUM_BASE_URL || 'http://localhost:8000',
        csrf: {
          cookie: import.meta.env.NUXT_PUBLIC_SANCTUM_CSRF_COOKIE || 'XSRF-TOKEN',
        },
      },
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
  ],

  fonts: {
    families: [
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Outfit', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
  },

  app: {
    head: {
      title: 'Samasta – Undangan Digital Elegan & Personal',
      meta: [
        {
          name: 'description',
          content:
            'Samasta membantu Anda membuat undangan digital yang hangat, personal, dan siap dibagikan dalam hitungan menit — lengkap dengan RSVP, galeri, musik, dan wishlist kado.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['~/assets/css/main.css'],

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
    },
  },

  sanctum: {
    redirectIfUnauthenticated: true,
    endpoints: {
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/user',
    },
    redirect: {
      onLogin: '/dashboard',
      onLogout: '/login',
      onAuthOnly: '/login',
      onGuestOnly: '/dashboard',
    },
  },
})
