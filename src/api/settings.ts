import { apiClient } from './client'
import type { AppSettings } from '../types'

export const getSettings = async () => {
  const { data } = await apiClient.get<AppSettings>('/settings')
  return data
}

export const updateSettings = async (payload: Partial<AppSettings>) => {
  const { data } = await apiClient.put<AppSettings>('/settings', payload)
  return data
}
