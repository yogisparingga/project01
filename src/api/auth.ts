import { apiClient } from './client'
import type { User } from '../types'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: 'admin' | 'streamer' | 'moderator' | 'viewer'
}

export interface ForgotPasswordPayload {
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
  return data
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
  return data
}

export const requestPasswordReset = async (payload: ForgotPasswordPayload) => {
  const { data } = await apiClient.post<{ message: string }>('/auth/forgot-password', payload)
  return data
}

export const getProfile = async () => {
  const { data } = await apiClient.get<User>('/auth/me')
  return data
}
