import type { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <Box className="flex min-h-screen items-center justify-center bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4 py-8">
      <Paper
        elevation={10}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/90 p-10 shadow-xl backdrop-blur"
      >
        <Box className="mb-8 space-y-2 text-center">
          <Typography variant="h4" className="font-bold text-slate-900">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {children}
      </Paper>
    </Box>
  )
}
