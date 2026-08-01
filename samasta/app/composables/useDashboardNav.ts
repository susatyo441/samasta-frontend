import { DASHBOARD_NAV_LINKS } from '~/constants/dashboardNav'

export function useDashboardNav() {
  const route = useRoute()
  const { hasPermission } = useAuth()

  const links = computed(() =>
    DASHBOARD_NAV_LINKS.filter((link) => !link.permission || hasPermission(link.permission)),
  )

  function isActive(match: string[]) {
    return match.some((path) => route.path === path || route.path.startsWith(`${path}/`))
  }

  return {
    links,
    isActive,
  }
}
