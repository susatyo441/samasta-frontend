export function useLogout() {
  const { logout } = useAuth()

  async function signOut() {
    await logout()
    await navigateTo('/login')
  }

  return { signOut }
}
