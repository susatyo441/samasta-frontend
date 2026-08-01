export const INVITATION_EVENT_TYPES = [
  { value: 'wedding', label: 'Pernikahan' },
  { value: 'birthday', label: 'Ulang Tahun' },
  { value: 'other', label: 'Lainnya' },
] as const

export const THEME_COVER_GRADIENTS = [
  'from-[#f7f1e8] via-[#efe4d2] to-[#e8d5b5]',
  'from-pink-100 to-amber-100',
  'from-sky-100 to-indigo-50',
  'from-violet-100 to-fuchsia-50',
  'from-slate-100 to-sky-50',
  'from-cyan-100 to-emerald-50',
  'from-indigo-900/20 to-slate-200',
  'from-yellow-100 to-rose-50',
  'from-fuchsia-100 to-indigo-100',
  'from-green-100 to-emerald-50',
  'from-rose-100 to-orange-50',
] as const

export const THEME_PERMISSIONS = {
  view: 'invitation-themes.view',
  manage: 'invitation-themes.manage',
} as const
