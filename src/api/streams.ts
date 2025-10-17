import { apiClient } from './client'
import type {
  Activity,
  PaginatedResponse,
  StreamHistoryFilters,
  StreamHistoryItem,
  StreamingStatus,
} from '../types'

export interface DashboardStats {
  totalStreams: number
  activeUsers: number
  scheduledStreams: number
  liveNow: number
}

export const getStreamingStatus = async () => {
  const { data } = await apiClient.get<StreamingStatus>('/streams/status')
  return data
}

export const startStream = async () => {
  const { data } = await apiClient.post<StreamingStatus>('/streams/start')
  return data
}

export const stopStream = async () => {
  const { data } = await apiClient.post<StreamingStatus>('/streams/stop')
  return data
}

export const getStreamHistory = async (filters: StreamHistoryFilters = {}) => {
  const { data } = await apiClient.get<PaginatedResponse<StreamHistoryItem>>('/streams/history', {
    params: filters,
  })
  return data
}

export const exportStreamHistory = async (filters: StreamHistoryFilters = {}) => {
  const { data } = await apiClient.get<Blob>('/streams/history/export', {
    params: filters,
    responseType: 'blob',
  })
  return data
}

export const getDashboardStats = async () => {
  const { data } = await apiClient.get<DashboardStats>('/streams/overview')
  return data
}

export const getRecentActivities = async () => {
  const { data } = await apiClient.get<Activity[]>('/activities/recent')
  return data
}
