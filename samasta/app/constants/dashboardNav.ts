export interface DashboardNavLink {
  to: string
  label: string
  icon: string
  match: string[]
  /** If set, link only shows when user has this permission */
  permission?: string
}

export const DASHBOARD_NAV_LINKS: DashboardNavLink[] = [
  { to: '/dashboard', label: 'Home', icon: '⌂', match: ['/dashboard'] },
  { to: '/dashboard/undangan', label: 'Undangan', icon: '✉', match: ['/dashboard/undangan'] },
  {
    to: '/dashboard/tema',
    label: 'Tema',
    icon: '◐',
    match: ['/dashboard/tema'],
    permission: 'invitation-themes.view',
  },
  { to: '/dashboard/transaksi', label: 'Transaksi', icon: '◈', match: ['/dashboard/transaksi'] },
  { to: '/dashboard/bantuan', label: 'Bantuan', icon: '?', match: ['/dashboard/bantuan'] },
]
