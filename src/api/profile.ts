import { apiClient } from './client'

export interface UpdateProfilePayload {
  name?: string
  email?: string
  avatarUrl?: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface PersonalStatsResponse {
  totalStreams: number
  averageViewers: number
  totalWatchTime: number
  followers: number
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data } = await apiClient.put('/me/profile', payload)
  return data
}

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await apiClient.post<{ message: string }>('/me/change-password', payload)
  return data
}

export const getPersonalStreamKey = async () => {
  const { data } = await apiClient.get<{ streamKey: string }>('/me/stream-key')
  return data
}

export const regeneratePersonalStreamKey = async () => {
  const { data } = await apiClient.post<{ streamKey: string }>('/me/stream-key')
  return data
}

export const getPersonalStats = async () => {
  const { data } = await apiClient.get<PersonalStatsResponse>('/me/statistics')
  return data
}
