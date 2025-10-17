import { Menu as MenuIcon, NotificationsNone } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { ProfileMenu } from './ProfileMenu'

interface HeaderProps {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme()
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const location = useLocation()

  const activeNavItem = navigationItems.find((item) => item.path === location.pathname)

  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar className="flex items-center justify-between">
        <Box className="flex items-center gap-2">
          {!isLgUp && (
            <IconButton onClick={onMenuClick} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="h6" className="font-semibold">
              {activeNavItem?.label || 'Dashboard'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Panel kontrol admin live streaming
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-2">
          <IconButton>
            <NotificationsNone />
          </IconButton>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
