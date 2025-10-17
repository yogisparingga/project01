import { useState } from 'react'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import type { LoginPayload } from '../../api/auth'

interface LoginFormValues extends LoginPayload {}

export const LoginPage = () => {
  const { login } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true)
    try {
      await login(values)
    } catch (error) {
      toast.error('Gagal masuk, periksa kembali kredensial Anda')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Masuk ke Dashboard" subtitle="Kelola live streaming YouTube Anda dengan mudah">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            placeholder="nama@domain.com"
            {...register('email', { required: 'Email wajib diisi' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            placeholder="Masukkan password"
            {...register('password', { required: 'Password wajib diisi' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Box className="flex items-center justify-between">
            <Link component={RouterLink} to="/forgot-password" underline="hover">
              Lupa password?
            </Link>
          </Box>
          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            {submitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </Stack>
      </Box>
      <Typography align="center" variant="body2" color="text.secondary" className="mt-6">
        Belum punya akun?{' '}
        <Link component={RouterLink} to="/register" underline="hover">
          Daftar sekarang
        </Link>
      </Typography>
    </AuthLayout>
  )
}
