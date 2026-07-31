import dummyInvitations from '~/data/dummy-invitations.json'

export type Invitation = (typeof dummyInvitations.invitations)[number]

export function useInvitations() {
  function getById(id: string) {
    return dummyInvitations.invitations.find((item) => item.id === id) || null
  }

  function getBySlug(slug: string) {
    return dummyInvitations.invitations.find((item) => item.slug === slug) || null
  }

  function publicPath(slug: string) {
    return `/u/${slug}`
  }

  return {
    invitations: dummyInvitations.invitations,
    editorModules: dummyInvitations.editorModules,
    getById,
    getBySlug,
    publicPath,
  }
}
