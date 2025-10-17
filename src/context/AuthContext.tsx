import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { User } from '../types'
import { getStoredToken, setAuthToken } from '../api/client'
import {
  getProfile,
  login as loginRequest,
  register as registerRequest,
  type LoginPayload,
  type RegisterPayload,
} from '../api/auth'

interface AuthContextValue {
  user: User | null
  token: string | null
  loading: boolean
  initializing: boolean
  isAuthenticated: boolean
  login: (credentials: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [initializing, setInitializing] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const persistToken = useCallback((value: string | null) => {
    setToken(value)
    setAuthToken(value)
  }, [])

  useEffect(() => {
    const stored = getStoredToken()
    if (!stored) {
      setInitializing(false)
      return
    }

    persistToken(stored)

    getProfile()
      .then((profile) => {
        setUser(profile)
      })
      .catch(() => {
        persistToken(null)
        setUser(null)
      })
      .finally(() => setInitializing(false))
  }, [persistToken])

  const login = useCallback(
    async (credentials: LoginPayload) => {
      setLoading(true)
      try {
        const { token: authToken, user: profile } = await loginRequest(credentials)
        persistToken(authToken)
        setUser(profile)
        toast.success('Berhasil masuk')

        const redirectState = location.state as { from?: string } | null
        const redirectPath = redirectState?.from || '/'
        navigate(redirectPath, { replace: true })
      } finally {
        setLoading(false)
      }
    },
    [location.state, navigate, persistToken],
  )

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setLoading(true)
      try {
        const { token: authToken, user: profile } = await registerRequest(payload)
        persistToken(authToken)
        setUser(profile)
        toast.success('Registrasi berhasil')
        navigate('/', { replace: true })
      } finally {
        setLoading(false)
      }
    },
    [navigate, persistToken],
  )

  const logout = useCallback(() => {
    persistToken(null)
    setUser(null)
    toast.success('Berhasil keluar')
    navigate('/login', { replace: true })
  }, [navigate, persistToken])

  const refreshProfile = useCallback(async () => {
    if (!token) return

    const profile = await getProfile()
    setUser(profile)
  }, [token])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      initializing,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      refreshProfile,
    }),
    [initializing, loading, login, logout, refreshProfile, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider')
  }
  return context
}
