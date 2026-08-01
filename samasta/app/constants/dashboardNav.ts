export interface DashboardNavLink {
  to: string
  label: string
  icon: string
  match: string[]
}

export const DASHBOARD_NAV_LINKS: DashboardNavLink[] = [
  { to: '/dashboard', label: 'Home', icon: '⌂', match: ['/dashboard'] },
  { to: '/dashboard/undangan', label: 'Undangan', icon: '✉', match: ['/dashboard/undangan'] },
  { to: '/dashboard/transaksi', label: 'Transaksi', icon: '◈', match: ['/dashboard/transaksi'] },
  { to: '/dashboard/bantuan', label: 'Bantuan', icon: '?', match: ['/dashboard/bantuan'] },
]
