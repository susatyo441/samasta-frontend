import { DASHBOARD_NAV_LINKS } from '~/constants/dashboardNav'

export function useDashboardNav() {
  const route = useRoute()

  function isActive(match: string[]) {
    return match.some((path) => route.path === path || route.path.startsWith(`${path}/`))
  }

  return {
    links: DASHBOARD_NAV_LINKS,
    isActive,
  }
}
