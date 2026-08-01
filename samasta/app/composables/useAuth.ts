import type { AuthUserResource } from '~/types'
import { unwrapResource } from '~/utils/unwrapResource'

export const useAuth = () => {
  const sanctumAuth = useSanctumAuth<{
    data: AuthUserResource
  }>()

  const user = computed(() => unwrapResource(sanctumAuth.user.value))

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
  }
}
