import { useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ContentCopyOutlined, RefreshOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import {
  changePassword,
  getPersonalStats,
  getPersonalStreamKey,
  regeneratePersonalStreamKey,
  updateProfile,
} from '../../api/profile'

interface ProfileFormValues {
  name: string
  email: string
}

interface PasswordFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const ProfilePage = () => {
  const { user, refreshProfile } = useAuth()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
  } = useForm<ProfileFormValues>()

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
  } = useForm<PasswordFormValues>()

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email })
    }
  }, [reset, user])

  const { data: stats } = useQuery({
    queryKey: ['me', 'stats'],
    queryFn: getPersonalStats,
  })

  const { data: streamKeyData, refetch: refetchStreamKey } = useQuery({
    queryKey: ['me', 'stream-key'],
    queryFn: getPersonalStreamKey,
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Profil berhasil diperbarui')
      refreshProfile()
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password berhasil diganti')
      resetPassword()
    },
  })

  const regenerateStreamKeyMutation = useMutation({
    mutationFn: regeneratePersonalStreamKey,
    onSuccess: async () => {
      toast.success('Stream key berhasil digenerate ulang')
      await refetchStreamKey()
      queryClient.invalidateQueries({ queryKey: ['streams', 'status'] })
    },
  })

  const onSubmitProfile = async (values: ProfileFormValues) => {
    await updateProfileMutation.mutateAsync(values)
  }

  const onSubmitPassword = async (values: PasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error('Konfirmasi password tidak sama')
      return
    }
    await changePasswordMutation.mutateAsync({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
  }

  const handleCopyKey = async () => {
    if (!streamKeyData?.streamKey) return
    try {
      await navigator.clipboard.writeText(streamKeyData.streamKey)
      toast.success('Stream key disalin')
    } catch (error) {
      toast.error('Gagal menyalin stream key')
    }
  }

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" className="font-bold text-slate-900">
          Profil Saya
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola informasi akun, keamanan, dan statistik streaming pribadi
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Informasi Profil
              </Typography>
              <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmitProfile)}>
                <TextField
                  label="Nama Lengkap"
                  fullWidth
                  {...register('name', { required: 'Nama wajib diisi' })}
                  error={Boolean(profileErrors.name)}
                  helperText={profileErrors.name?.message}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register('email', { required: 'Email wajib diisi' })}
                  error={Boolean(profileErrors.email)}
                  helperText={profileErrors.email?.message}
                />
                <Button type="submit" variant="contained" disabled={profileSubmitting || updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Ganti Password
              </Typography>
              <Stack spacing={3} component="form" onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <TextField
                  label="Password Saat Ini"
                  type="password"
                  fullWidth
                  {...registerPassword('currentPassword', { required: 'Password saat ini wajib diisi' })}
                  error={Boolean(passwordErrors.currentPassword)}
                  helperText={passwordErrors.currentPassword?.message}
                />
                <TextField
                  label="Password Baru"
                  type="password"
                  fullWidth
                  {...registerPassword('newPassword', { required: 'Password baru wajib diisi', minLength: { value: 6, message: 'Minimal 6 karakter' } })}
                  error={Boolean(passwordErrors.newPassword)}
                  helperText={passwordErrors.newPassword?.message}
                />
                <TextField
                  label="Konfirmasi Password Baru"
                  type="password"
                  fullWidth
                  {...registerPassword('confirmPassword', {
                    required: 'Konfirmasi password wajib diisi',
                    validate: (value) => value === watch('newPassword') || 'Password tidak sama',
                  })}
                  error={Boolean(passwordErrors.confirmPassword)}
                  helperText={passwordErrors.confirmPassword?.message}
                />
                <Button type="submit" variant="contained" disabled={passwordSubmitting || changePasswordMutation.isPending}>
                  {changePasswordMutation.isPending ? 'Menyimpan...' : 'Perbarui Password'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-3 font-semibold">
                Stream Key Pribadi
              </Typography>
              <Stack spacing={2}>
                <Box className="rounded-2xl bg-slate-100 p-4">
                  <Typography variant="subtitle2" color="text.secondary">
                    Stream Key
                  </Typography>
                  <Typography variant="h6" className="mt-1 font-mono">
                    {streamKeyData?.streamKey || 'Belum tersedia'}
                  </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button startIcon={<ContentCopyOutlined />} variant="outlined" onClick={handleCopyKey}>
                    Salin Stream Key
                  </Button>
                  <Button
                    startIcon={<RefreshOutlined />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => regenerateStreamKeyMutation.mutate()}
                    disabled={regenerateStreamKeyMutation.isPending}
                  >
                    {regenerateStreamKeyMutation.isPending ? 'Memproses...' : 'Generate Ulang'}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-3 font-semibold">
                Statistik Pribadi
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box className="rounded-xl bg-slate-100 p-4 text-center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Streaming
                    </Typography>
                    <Typography variant="h5" className="font-bold text-slate-900">
                      {stats?.totalStreams ?? 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="rounded-xl bg-slate-100 p-4 text-center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Rata-rata Viewers
                    </Typography>
                    <Typography variant="h5" className="font-bold text-slate-900">
                      {stats?.averageViewers ?? 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="rounded-xl bg-slate-100 p-4 text-center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Watch Time
                    </Typography>
                    <Typography variant="h6" className="font-bold text-slate-900">
                      {Math.round((stats?.totalWatchTime ?? 0) / 60)} m
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="rounded-xl bg-slate-100 p-4 text-center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Pengikut
                    </Typography>
                    <Typography variant="h5" className="font-bold text-slate-900">
                      {stats?.followers ?? 0}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
