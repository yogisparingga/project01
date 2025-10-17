import { apiClient } from './client'
import type { PaginatedResponse, StreamKeyResponse, User, UserFilters } from '../types'

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  role: User['role']
  status?: User['status']
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  role?: User['role']
  status?: User['status']
}

export const getUsers = async (filters: UserFilters = {}) => {
  const { data } = await apiClient.get<PaginatedResponse<User>>('/users', {
    params: filters,
  })
  return data
}

export const createUser = async (payload: CreateUserPayload) => {
  const { data } = await apiClient.post<User>('/users', payload)
  return data
}

export const updateUser = async (id: string, payload: UpdateUserPayload) => {
  const { data } = await apiClient.put<User>(`/users/${id}`, payload)
  return data
}

export const deleteUser = async (id: string) => {
  const { data } = await apiClient.delete<{ message: string }>(`/users/${id}`)
  return data
}

export const getUserStreamKey = async (id: string) => {
  const { data } = await apiClient.get<StreamKeyResponse>(`/users/${id}/stream-key`)
  return data
}

export const regenerateStreamKey = async (id: string) => {
  const { data } = await apiClient.post<StreamKeyResponse>(`/users/${id}/stream-key`)
  return data
}
