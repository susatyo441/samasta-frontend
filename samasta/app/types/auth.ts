export interface RoleResource {
  id: number
  name: string
  label?: string
}

export interface AuthUserResource {
  id: number
  name: string
  email: string
  phone?: string | null
  avatarInitials?: string
  plan?: string
  createdAt?: string
  roles?: RoleResource[]
  permissions?: string[]
}
