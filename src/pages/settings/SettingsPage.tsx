import { useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getSettings, updateSettings } from '../../api/settings'
import type { AppSettings } from '../../types'
import { useAuth } from '../../context/AuthContext'

interface SettingsFormValues extends AppSettings {}

export const SettingsPage = () => {
  const { user } = useAuth()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SettingsFormValues>()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  const updateMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => toast.success('Pengaturan berhasil disimpan'),
  })

  useEffect(() => {
    if (settings) {
      reset(settings)
    }
  }, [reset, settings])

  const onSubmit = async (values: SettingsFormValues) => {
    await updateMutation.mutateAsync(values)
  }

  if (user?.role !== 'admin') {
    return (
      <Card className="p-8 text-center">
        <Typography variant="h6" className="font-semibold">
          Akses ditolak
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Anda memerlukan hak admin untuk mengakses pengaturan aplikasi.
        </Typography>
      </Card>
    )
  }

  return (
    <Stack spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h4" className="font-bold text-slate-900">
          Pengaturan Aplikasi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sesuaikan konfigurasi aplikasi, RTMP server, serta integrasi YouTube
        </Typography>
      </Box>

      <Card elevation={0} className="border border-slate-100 shadow-sm">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Konfigurasi Umum
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Nama Aplikasi" fullWidth disabled={isLoading} {...register('appName')} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="YouTube Channel ID" fullWidth disabled={isLoading} {...register('youtubeChannelId')} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} className="border border-slate-100 shadow-sm">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Pengaturan RTMP Server
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField label="RTMP Server URL" fullWidth disabled={isLoading} {...register('rtmpServerUrl', { required: true })} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} className="border border-slate-100 shadow-sm">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Integrasi YouTube API
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField label="YouTube API Key" fullWidth disabled={isLoading} {...register('youtubeApiKey', { required: true })} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} className="border border-slate-100 shadow-sm">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Notifikasi
          </Typography>
          <Stack spacing={2}>
            <Controller
              name="notifyOnStreamStart"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                  label="Kirim notifikasi saat streaming dimulai"
                />
              )}
            />
            <Controller
              name="notifyOnStreamEnd"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                  label="Kirim notifikasi saat streaming selesai"
                />
              )}
            />
            <Controller
              name="notifications.email"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Switch {...field} checked={Boolean(field.value)} />} label="Email" />
              )}
            />
            <Controller
              name="notifications.push"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Switch {...field} checked={Boolean(field.value)} />} label="Push Notification" />
              )}
            />
            <Controller
              name="notifications.sms"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Switch {...field} checked={Boolean(field.value)} />} label="SMS" />
              )}
            />
          </Stack>
        </CardContent>
      </Card>

      <Box className="flex justify-end">
        <Button type="submit" variant="contained" disabled={isSubmitting || updateMutation.isPending}>
          {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </Box>
    </Stack>
  )
}
