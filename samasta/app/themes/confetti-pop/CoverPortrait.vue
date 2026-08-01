<script setup lang="ts">
defineProps<{
  photoUrl?: string | null
  alt?: string
  placeholder?: string
}>()
</script>

<template>
  <div class="cp-portrait" role="img" :aria-label="alt || 'Foto cover'">
    <!-- Soft scenic wash behind frame only (not full-page bg) -->
    <div class="cp-portrait-glow" aria-hidden="true" />

    <!-- Janur -->
    <svg class="cp-portrait-janur cp-portrait-janur--left" viewBox="0 0 80 220" aria-hidden="true">
      <path d="M58 210 C40 150 18 110 22 40 C34 90 48 130 58 210 Z" fill="#e2b84a" />
      <path d="M48 205 C28 145 8 100 10 28 C24 85 38 125 48 205 Z" fill="#f0c85a" opacity="0.92" />
      <path d="M40 198 C22 140 6 95 8 36 C20 88 30 120 40 198 Z" fill="#c9962f" opacity="0.88" />
      <ellipse cx="18" cy="30" rx="11" ry="15" fill="#f6d56a" transform="rotate(-25 18 30)" />
      <ellipse cx="28" cy="22" rx="7" ry="10" fill="#ffe08a" transform="rotate(-10 28 22)" />
    </svg>
    <svg class="cp-portrait-janur cp-portrait-janur--right" viewBox="0 0 80 220" aria-hidden="true">
      <path d="M58 210 C40 150 18 110 22 40 C34 90 48 130 58 210 Z" fill="#e2b84a" />
      <path d="M48 205 C28 145 8 100 10 28 C24 85 38 125 48 205 Z" fill="#f0c85a" opacity="0.92" />
      <path d="M40 198 C22 140 6 95 8 36 C20 88 30 120 40 198 Z" fill="#c9962f" opacity="0.88" />
      <ellipse cx="18" cy="30" rx="11" ry="15" fill="#f6d56a" transform="rotate(-25 18 30)" />
      <ellipse cx="28" cy="22" rx="7" ry="10" fill="#ffe08a" transform="rotate(-10 28 22)" />
    </svg>

    <!-- Ornate oval frame + photo as one unit -->
    <div class="cp-portrait-frame">
      <div class="cp-portrait-ring" aria-hidden="true" />
      <div class="cp-portrait-photo">
        <img
          v-if="photoUrl"
          :src="photoUrl"
          :alt="alt || 'Cover'"
          class="h-full w-full object-cover"
        >
        <div v-else class="cp-portrait-placeholder">
          <p class="font-script text-[clamp(1.5rem,5vw,2rem)] text-[#6b2f2f]">
            {{ placeholder || 'Foto' }}
          </p>
          <p class="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8a7b6c]">Unggah cover</p>
        </div>
      </div>
      <!-- Carved metal ornament accents on frame -->
      <svg class="cp-portrait-filigree" viewBox="0 0 200 250" aria-hidden="true">
        <ellipse
          cx="100"
          cy="125"
          rx="92"
          ry="116"
          fill="none"
          stroke="url(#cpFrameGold)"
          stroke-width="3.5"
        />
        <ellipse
          cx="100"
          cy="125"
          rx="84"
          ry="108"
          fill="none"
          stroke="#2f343a"
          stroke-width="2"
          opacity="0.45"
        />
        <defs>
          <linearGradient id="cpFrameGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e8d5b5" />
            <stop offset="40%" stop-color="#8a9098" />
            <stop offset="70%" stop-color="#f0e6d2" />
            <stop offset="100%" stop-color="#5a6068" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Gunungan -->
    <svg class="cp-portrait-gunungan cp-portrait-gunungan--left" viewBox="0 0 90 140" aria-hidden="true">
      <path fill="#4a3424" d="M45 6 C58 34 78 58 82 100 C70 92 58 98 45 132 C32 98 20 92 8 100 C12 58 32 34 45 6 Z" />
      <path fill="#6b4a32" d="M45 18 C55 40 68 58 70 88 C60 82 52 88 45 114 C38 88 30 82 20 88 C22 58 35 40 45 18 Z" opacity="0.9" />
      <path fill="#c4a574" d="M45 40 C50 52 56 62 56 74 C52 70 48 72 45 84 C42 72 38 70 34 74 C34 62 40 52 45 40 Z" opacity="0.55" />
    </svg>
    <svg class="cp-portrait-gunungan cp-portrait-gunungan--right" viewBox="0 0 90 140" aria-hidden="true">
      <path fill="#4a3424" d="M45 6 C58 34 78 58 82 100 C70 92 58 98 45 132 C32 98 20 92 8 100 C12 58 32 34 45 6 Z" />
      <path fill="#6b4a32" d="M45 18 C55 40 68 58 70 88 C60 82 52 88 45 114 C38 88 30 82 20 88 C22 58 35 40 45 18 Z" opacity="0.9" />
      <path fill="#c4a574" d="M45 40 C50 52 56 62 56 74 C52 70 48 72 45 84 C42 72 38 70 34 74 C34 62 40 52 45 40 Z" opacity="0.55" />
    </svg>

    <!-- Floral base attached to portrait cluster -->
    <svg class="cp-portrait-florals" viewBox="0 0 320 90" aria-hidden="true">
      <ellipse cx="160" cy="70" rx="150" ry="28" fill="#2f5a3a" opacity="0.85" />
      <circle cx="50" cy="48" r="16" fill="#e8a0b4" />
      <circle cx="78" cy="38" r="12" fill="#fff7f0" />
      <circle cx="110" cy="44" r="14" fill="#f0c85a" />
      <circle cx="145" cy="36" r="15" fill="#e88aa4" />
      <circle cx="180" cy="42" r="13" fill="#fff7f0" />
      <circle cx="215" cy="38" r="15" fill="#f0c85a" />
      <circle cx="250" cy="46" r="14" fill="#e8a0b4" />
      <circle cx="280" cy="50" r="11" fill="#7ec8a0" />
      <circle cx="95" cy="55" r="9" fill="#5fa87a" />
      <circle cx="200" cy="56" r="10" fill="#3d6b46" />
    </svg>
  </div>
</template>
