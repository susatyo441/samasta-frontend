<template>
  <div class="min-h-screen">
    <LandingNavbar />
    <main>
      <LandingHero />
      <LandingWhy />
      <LandingImpact />
      <LandingThemes />
      <LandingGifts />
      <LandingSteps />
      <LandingFeatures />
      <LandingPricing />
      <LandingFaq />
    </main>
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  ogTitle: 'Samasta – Undangan Digital Elegan & Personal',
  ogDescription:
    'Buat undangan digital yang hangat dan personal — RSVP, galeri, musik, dan wishlist kado dalam satu platform.',
  twitterCard: 'summary_large_image',
})
</script>
