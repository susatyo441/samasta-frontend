// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],

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
})
