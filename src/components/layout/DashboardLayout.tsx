import { useState } from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar, SIDEBAR_WIDTH } from './Sidebar'
import { Header } from './Header'

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ml: { lg: `${SIDEBAR_WIDTH}px` },
        }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />
        <Box component="section" sx={{ flexGrow: 1, py: { xs: 2, md: 4 }, px: { xs: 2, md: 4 } }}>
          <Container maxWidth="xl" disableGutters>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
