import type { ThemeLoader } from './types'

export const themeRegistry: Record<string, ThemeLoader> = {
  'confetti-pop': () => import('~/themes/confetti-pop/index.vue'),
}

export const defaultThemeKey = 'confetti-pop'

export function resolveTheme(themeId?: string | null, componentKey?: string | null) {
  const preferred = componentKey || themeId
  const key = preferred && themeRegistry[preferred] ? preferred : defaultThemeKey
  return { key, loader: themeRegistry[key] }
}
