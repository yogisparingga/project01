import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const TOKEN_STORAGE_KEY = 'streamhub_token'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } else {
    delete apiClient.defaults.headers.common.Authorization
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null)
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    }

    return Promise.reject(error)
  },
)

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)
