import { useState } from 'react'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { requestPasswordReset, type ForgotPasswordPayload } from '../../api/auth'

interface ForgotPasswordFormValues extends ForgotPasswordPayload {}

export const ForgotPasswordPage = () => {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setSubmitting(true)
    try {
      await requestPasswordReset(values)
      toast.success('Instruksi reset password telah dikirim ke email Anda')
      reset()
    } catch (error) {
      toast.error('Gagal mengirim permintaan reset password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Lupa Password" subtitle="Kami akan mengirim tautan reset password ke email Anda">
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email', { required: 'Email wajib diisi' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <Button type="submit" variant="contained" size="large" disabled={submitting}>
            {submitting ? 'Mengirim...' : 'Kirim Instruksi'}
          </Button>
        </Stack>
      </Box>
      <Typography align="center" variant="body2" color="text.secondary" className="mt-6">
        Kembali ke{' '}
        <Link component={RouterLink} to="/login" underline="hover">
          halaman login
        </Link>
      </Typography>
    </AuthLayout>
  )
}
