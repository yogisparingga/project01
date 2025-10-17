import { apiClient } from './client'
import type { PaginatedResponse, Schedule, ScheduleFilters } from '../types'

export interface CreateSchedulePayload {
  title: string
  description?: string
  streamUrl: string
  scheduledAt: string
  streamerId: string
  status?: Schedule['status']
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {}

export const getSchedules = async (filters: ScheduleFilters = {}) => {
  const { data } = await apiClient.get<PaginatedResponse<Schedule>>('/schedules', {
    params: filters,
  })
  return data
}

export const createSchedule = async (payload: CreateSchedulePayload) => {
  const { data } = await apiClient.post<Schedule>('/schedules', payload)
  return data
}

export const updateSchedule = async (id: string, payload: UpdateSchedulePayload) => {
  const { data } = await apiClient.put<Schedule>(`/schedules/${id}`, payload)
  return data
}

export const deleteSchedule = async (id: string) => {
  const { data } = await apiClient.delete<{ message: string }>(`/schedules/${id}`)
  return data
}
