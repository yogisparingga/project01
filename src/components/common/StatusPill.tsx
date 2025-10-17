import { Chip } from '@mui/material'

interface StatusPillProps {
  status: string
}

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
  live: 'success',
  scheduled: 'info',
  upcoming: 'info',
  completed: 'default',
  cancelled: 'error',
  failed: 'error',
  active: 'success',
  inactive: 'default',
  banned: 'error',
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const key = status.toLowerCase()
  const color = statusColors[key] || 'default'
  return <Chip label={status} color={color} variant={color === 'default' ? 'outlined' : 'filled'} size="small" sx={{ textTransform: 'capitalize' }} />
}
