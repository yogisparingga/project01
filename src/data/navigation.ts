import type { UserRole } from '../types'
import {
  DashboardOutlined,
  EventNoteOutlined,
  GroupOutlined,
  HistoryOutlined,
  LiveTvOutlined,
  PersonOutline,
  SettingsOutlined,
} from '@mui/icons-material'
import type { SvgIconComponent } from '@mui/icons-material'

export interface NavigationItem {
  label: string
  path: string
  icon: SvgIconComponent
  roles?: UserRole[]
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardOutlined,
  },
  {
    label: 'Manajemen User',
    path: '/users',
    icon: GroupOutlined,
    roles: ['admin'],
  },
  {
    label: 'Jadwal Streaming',
    path: '/schedules',
    icon: EventNoteOutlined,
  },
  {
    label: 'Kontrol Streaming',
    path: '/streaming',
    icon: LiveTvOutlined,
  },
  {
    label: 'Riwayat Streaming',
    path: '/stream-history',
    icon: HistoryOutlined,
  },
  {
    label: 'Profil Saya',
    path: '/profile',
    icon: PersonOutline,
  },
  {
    label: 'Pengaturan',
    path: '/settings',
    icon: SettingsOutlined,
    roles: ['admin'],
  },
]
