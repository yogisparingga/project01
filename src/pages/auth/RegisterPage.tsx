import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import type { RegisterPayload } from '../../api/auth'

interface RegisterFormValues extends RegisterPayload {
  confirmPassword: string
}

export const RegisterPage = () => {
  const { register: registerUser } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'streamer',
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true)
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      })
      toast.success('Registrasi berhasil, selamat datang!')
    } catch (error) {
      toast.error('Gagal melakukan registrasi')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Buat Akun Admin" subtitle="Daftarkan akun Anda untuk mulai mengelola streaming">
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Nama Lengkap"
            fullWidth
            {...register('name', { required: 'Nama wajib diisi' })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email', { required: 'Email wajib diisi' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password', { required: 'Password wajib diisi', minLength: { value: 6, message: 'Minimal 6 karakter' } })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <TextField
            label="Konfirmasi Password"
            type="password"
            fullWidth
            {...register('confirmPassword', {
              required: 'Konfirmasi password wajib diisi',
              validate: (value) => value === watch('password') || 'Password tidak sama',
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <Controller
            control={control}
            name="role"
            rules={{ required: 'Role wajib dipilih' }}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.role)}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select labelId="role-label" label="Role" {...field}>
                  <MenuItem value="streamer">Streamer</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                {errors.role && (
                  <Typography variant="caption" color="error" className="ml-3 mt-1">
                    {errors.role.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            {submitting ? 'Memproses...' : 'Daftar'}
          </Button>
        </Stack>
      </Box>
      <Typography align="center" variant="body2" color="text.secondary" className="mt-6">
        Sudah punya akun?{' '}
        <Link component={RouterLink} to="/login" underline="hover">
          Masuk di sini
        </Link>
      </Typography>
    </AuthLayout>
  )
}
