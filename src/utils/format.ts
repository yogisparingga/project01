import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDateTime = (value: string | Date) => {
  return format(new Date(value), 'dd MMM yyyy HH:mm', { locale: id })
}

export const formatDuration = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) return '0m'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const parts: string[] = []
  if (hours) parts.push(`${hours}j`)
  if (minutes) parts.push(`${minutes}m`)
  if (remainingSeconds && hours === 0) parts.push(`${remainingSeconds}d`)

  return parts.join(' ') || '0m'
}
