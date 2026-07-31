export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { user, ready, loadFromStorage } = useAuth()
  if (!ready.value) loadFromStorage()

  if (!user.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }

  if (user.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})
