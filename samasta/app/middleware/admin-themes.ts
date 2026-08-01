import { THEME_PERMISSIONS } from '~/constants/themes'

export default defineNuxtRouteMiddleware(() => {
  const { hasPermission } = useAuth()

  if (!hasPermission(THEME_PERMISSIONS.view)) {
    return navigateTo('/dashboard')
  }
})
