export type UserRole = 'admin' | 'streamer' | 'moderator' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'banned'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  streamKey?: string
  lastLoginAt?: string
}

export type ScheduleStatus = 'upcoming' | 'live' | 'completed' | 'cancelled'

export interface Schedule {
  id: string
  title: string
  description?: string
  streamUrl: string
  scheduledAt: string
  streamerId: string
  streamerName: string
  status: ScheduleStatus
  createdAt: string
  updatedAt: string
}

export type StreamHealth = 'excellent' | 'good' | 'fair' | 'poor'

export interface StreamingStatus {
  status: 'offline' | 'live' | 'scheduled'
  isLive: boolean
  streamKey: string
  serverUrl: string
  startedAt?: string
  viewerCount?: number
  health: StreamHealth
  bitrate?: number
  dropFrames?: number
}

export interface StreamHistoryItem {
  id: string
  title: string
  streamerName: string
  startedAt: string
  endedAt: string
  duration: number
  peakViewers: number
  averageViewers: number
  status: 'completed' | 'cancelled' | 'failed'
  recordingUrl?: string
}

export interface Activity {
  id: string
  message: string
  createdAt: string
  type: 'info' | 'warning' | 'error' | 'success'
  userName?: string
}

export interface AppSettings {
  appName: string
  rtmpServerUrl: string
  youtubeApiKey: string
  youtubeChannelId?: string
  notifyOnStreamStart: boolean
  notifyOnStreamEnd: boolean
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  branding?: {
    primaryColor: string
    secondaryColor: string
    logoUrl?: string
  }
}

export interface StreamKeyResponse {
  streamKey: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface UserFilters {
  search?: string
  role?: UserRole
  status?: UserStatus
  page?: number
  limit?: number
}

export interface ScheduleFilters {
  status?: ScheduleStatus
  streamerId?: string
  from?: string
  to?: string
  page?: number
  limit?: number
}

export interface StreamHistoryFilters {
  from?: string
  to?: string
  streamerId?: string
  status?: 'completed' | 'failed' | 'cancelled'
  search?: string
  page?: number
  limit?: number
}
