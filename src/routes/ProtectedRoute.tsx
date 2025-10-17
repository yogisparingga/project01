import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types'

interface ProtectedRouteProps {
  roles?: UserRole[]
  children?: ReactNode
}

export const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const { initializing, isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (initializing) {
    return (
      <Box className="flex min-h-screen flex-col items-center justify-center gap-3">
        <CircularProgress color="primary" />
        <Typography variant="body1" color="textSecondary">
          Menyiapkan dashboard...
        </Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  if (children) {
    return <>{children}</>
  }

  return <Outlet />
}
