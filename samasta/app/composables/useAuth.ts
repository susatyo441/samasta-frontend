import type { AuthUserResource } from '~/types'
import { extractErrorMessage } from '~/utils/handleMutationError'

export const useAuth = () => {
  const sanctumAuth = useSanctumAuth<{
    data: AuthUserResource
  }>()

  const user = computed(() => {
    const raw = sanctumAuth.user.value
    if (!raw) return null
    // Support both { data: user } (JsonResource) and flat user payloads.
    return ('data' in raw ? raw.data : raw) as AuthUserResource
  })

  const hasPermission = (permission: string | string[]) => {
    if (!user.value) return false

    const permissions = user.value.permissions || []

    if (Array.isArray(permission)) {
      return permission.every((p) => permissions.includes(p))
    }

    return permissions.includes(permission)
  }

  const login = async (credentials: { email: string; password: string }) => {
    await sanctumAuth.login(credentials)
  }

  const register = async (payload: {
    name: string
    email: string
    password: string
    phone?: string
  }) => {
    const $larafetch = useSanctumClient()
    await $larafetch('/api/register', {
      method: 'POST',
      body: payload,
    })
    await sanctumAuth.refreshIdentity()
  }

  const logout = async () => {
    await sanctumAuth.logout()
  }

  return {
    ...sanctumAuth,
    user,
    isAuthenticated: sanctumAuth.isAuthenticated,
    hasPermission,
    login,
    register,
    logout,
    extractErrorMessage,
  }
}
