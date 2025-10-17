import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <Box className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-4 text-center">
      <Typography variant="h2" className="font-bold text-slate-800">
        404
      </Typography>
      <Typography variant="h5" className="font-semibold text-slate-700">
        Halaman tidak ditemukan
      </Typography>
      <Typography variant="body1" color="text.secondary" className="max-w-lg">
        Maaf, halaman yang Anda cari tidak tersedia. Pastikan alamat URL sudah benar atau kembali ke dashboard utama.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(isAuthenticated ? '/' : '/login')}
      >
        {isAuthenticated ? 'Kembali ke Dashboard' : 'Kembali ke Login'}
      </Button>
    </Box>
  )
}
