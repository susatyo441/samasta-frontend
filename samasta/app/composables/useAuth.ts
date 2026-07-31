import dummyAuth from '~/data/dummy-auth.json'
import dummyInvitations from '~/data/dummy-invitations.json'

export type DummyUser = Omit<(typeof dummyAuth.users)[number], 'password'> & {
  password?: string
}

const STORAGE_KEY = 'samasta_auth_user'

export function useAuth() {
  const user = useState<DummyUser | null>('auth-user', () => null)
  const ready = useState('auth-ready', () => false)

  function loadFromStorage() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      user.value = raw ? (JSON.parse(raw) as DummyUser) : null
    } catch {
      user.value = null
    } finally {
      ready.value = true
    }
  }

  function persist(next: DummyUser | null) {
    user.value = next
    if (!import.meta.client) return
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }

  function login(email: string, password: string) {
    const found = dummyAuth.users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )

    if (!found) {
      return { ok: false as const, message: 'Email atau kata sandi salah.' }
    }

    const { password: _password, ...safeUser } = found
    persist(safeUser as DummyUser)
    return { ok: true as const, user: safeUser as DummyUser }
  }

  function register(payload: { name: string; email: string; password: string; phone?: string }) {
    const exists = dummyAuth.users.some(
      (item) => item.email.toLowerCase() === payload.email.toLowerCase(),
    )

    if (exists) {
      return { ok: false as const, message: 'Email sudah terdaftar. Silakan masuk.' }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone || '',
      avatarInitials: payload.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      plan: 'Gratis',
      createdAt: new Date().toISOString().slice(0, 10),
    }

    // Demo only: keep in memory + localStorage session
    dummyAuth.users.push(newUser)
    const { password: _password, ...safeUser } = newUser
    persist(safeUser as DummyUser)
    return { ok: true as const, user: safeUser as DummyUser }
  }

  function logout() {
    persist(null)
  }

  function getUserInvitations() {
    if (!user.value) return []
    return dummyInvitations.invitations.filter((item) => item.userId === user.value?.id)
  }

  function getInvitationById(id: string) {
    return dummyInvitations.invitations.find((item) => item.id === id) || null
  }

  function getTransactions() {
    if (!user.value) return []
    return dummyInvitations.transactions.filter((item) => item.userId === user.value?.id)
  }

  return {
    user,
    ready,
    loadFromStorage,
    login,
    register,
    logout,
    getUserInvitations,
    getInvitationById,
    getTransactions,
    editorModules: dummyInvitations.editorModules,
  }
}
