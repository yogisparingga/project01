import { ReactNode } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: ReactNode
  trend?: {
    value: string
    positive?: boolean
  }
}

export const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => {
  return (
    <Card elevation={0} className="border border-slate-100 shadow-sm">
      <CardContent className="flex items-start gap-4">
        {icon && (
          <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </Box>
        )}
        <Box className="flex-1">
          <Typography variant="subtitle2" color="text.secondary" className="uppercase tracking-wide">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold text-slate-900">
            {value}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
        {trend && (
          <Box className={`rounded-full px-3 py-1 text-sm font-semibold ${trend.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {trend.value}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
