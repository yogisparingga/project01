import { useState, MouseEvent } from 'react'
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { Logout, Settings, PersonOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProfileMenu = () => {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleNavigate = (path: string) => {
    navigate(path)
    handleClose()
  }

  return (
    <Box>
      <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
        <Avatar src={user?.avatarUrl} alt={user?.name} sx={{ width: 40, height: 40 }}>
          {user?.name?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Box className="px-4 py-3">
          <Typography variant="subtitle1" className="font-semibold">
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
          <Typography variant="caption" color="primary" className="mt-1 block uppercase tracking-wide">
            {user?.role}
          </Typography>
        </Box>
        <MenuItem onClick={() => handleNavigate('/profile')}>
          <ListItemIcon>
            <PersonOutline fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>
        {user?.role === 'admin' && (
          <MenuItem onClick={() => handleNavigate('/settings')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Pengaturan
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            logout()
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Keluar
        </MenuItem>
      </Menu>
    </Box>
  )
}
