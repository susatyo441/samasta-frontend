import type { InjectionKey } from 'vue'

/** Provided by `/demo/[theme]` so RSVP/wish skip the API. */
export const STATIC_THEME_DEMO_KEY: InjectionKey<boolean> = Symbol('staticThemeDemo')
