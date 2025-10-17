import { useMemo } from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { useAuth } from '../../context/AuthContext'

export const SIDEBAR_WIDTH = 280

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation()
  const { user } = useAuth()

  const items = useMemo(
    () =>
      navigationItems.filter((item) => {
        if (!item.roles) return true
        if (!user) return false
        return item.roles.includes(user.role)
      }),
    [user],
  )

  const content = (
    <Box className="flex h-full flex-col bg-white">
      <Box className="flex items-center gap-3 px-6 py-6">
        <Typography variant="h6" className="font-semibold">
          StreamHub Admin
        </Typography>
      </Box>
      <List className="flex-1 px-2">
        {items.map((item) => {
          const Icon = item.icon
          const selected = location.pathname === item.path
          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              selected={selected}
              onClick={onClose}
              sx={{
                mb: 1,
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        })}
      </List>
      <Box className="px-6 pb-6 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} StreamHub
      </Box>
    </Box>
  )

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {content}
      </Drawer>
    </>
  )
}
