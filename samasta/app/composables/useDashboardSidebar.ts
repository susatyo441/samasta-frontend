const STORAGE_KEY = 'samasta.dashboard.sidebar.collapsed'

export function useDashboardSidebar() {
  const collapsed = useState('dashboard-sidebar-collapsed', () => false)

  onMounted(() => {
    if (!import.meta.client) return
    collapsed.value = localStorage.getItem(STORAGE_KEY) === '1'
  })

  watch(collapsed, (value) => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  })

  function toggle() {
    collapsed.value = !collapsed.value
  }

  function expand() {
    collapsed.value = false
  }

  function collapse() {
    collapsed.value = true
  }

  const mainOffsetClass = computed(() => (collapsed.value ? 'lg:pl-0' : 'lg:pl-64'))

  return {
    collapsed,
    toggle,
    expand,
    collapse,
    mainOffsetClass,
  }
}
