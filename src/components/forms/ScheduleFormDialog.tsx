import { useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import type { CreateSchedulePayload, UpdateSchedulePayload } from '../../api/schedules'
import type { Schedule, User } from '../../types'

interface ScheduleFormDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  onClose: () => void
  onSubmit: (payload: CreateSchedulePayload | UpdateSchedulePayload) => Promise<void> | void
  loading?: boolean
  initialData?: Schedule | null
  streamers: User[]
}

type ScheduleFormValues = {
  title: string
  description?: string
  streamUrl: string
  scheduledAt: Dayjs
  streamerId: string
  status: Schedule['status']
}

export const ScheduleFormDialog = ({ open, mode, onClose, onSubmit, loading, initialData, streamers }: ScheduleFormDialogProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    defaultValues: {
      title: '',
      description: '',
      streamUrl: '',
      scheduledAt: dayjs(),
      streamerId: '',
      status: 'upcoming',
    },
  })

  useEffect(() => {
    if (initialData && mode === 'edit') {
      reset({
        title: initialData.title,
        description: initialData.description,
        streamUrl: initialData.streamUrl,
        scheduledAt: dayjs(initialData.scheduledAt),
        streamerId: initialData.streamerId,
        status: initialData.status,
      })
    } else if (mode === 'create') {
      reset({
        title: '',
        description: '',
        streamUrl: '',
        scheduledAt: dayjs(),
        streamerId: '',
        status: 'upcoming',
      })
    }
  }, [initialData, mode, reset])

  const submitHandler = async (values: ScheduleFormValues) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        streamUrl: values.streamUrl,
        scheduledAt: values.scheduledAt.toISOString(),
        streamerId: values.streamerId,
        status: values.status,
      }
      await onSubmit(payload)
      onClose()
    } catch (error) {
      // error ditangani di level atas
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'Buat Jadwal Streaming' : 'Edit Jadwal Streaming'}</DialogTitle>
      <DialogContent>
        <Box component="form" id="schedule-form" onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={3} className="pt-2">
            <TextField
              label="Judul Streaming"
              fullWidth
              {...register('title', { required: 'Judul wajib diisi' })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
            <TextField
              label="Deskripsi"
              fullWidth
              multiline
              minRows={3}
              {...register('description')}
            />
            <TextField
              label="URL / Key Streaming YouTube"
              fullWidth
              {...register('streamUrl', { required: 'URL streaming wajib diisi' })}
              error={Boolean(errors.streamUrl)}
              helperText={errors.streamUrl?.message}
            />
            <Controller
              control={control}
              name="scheduledAt"
              rules={{ required: 'Waktu streaming wajib diisi' }}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="Tanggal & Waktu Streaming"
                  value={field.value}
                  onChange={(date) => field.onChange(date || dayjs())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors.scheduledAt),
                      helperText: errors.scheduledAt?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="streamerId"
              rules={{ required: 'Streamer wajib dipilih' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.streamerId)}>
                  <InputLabel id="streamer-label">Streamer</InputLabel>
                  <Select labelId="streamer-label" label="Streamer" {...field}>
                    {streamers.map((streamer) => (
                      <MenuItem key={streamer.id} value={streamer.id}>
                        {streamer.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.streamerId && (
                    <Typography variant="caption" color="error" className="ml-3 mt-1">
                      {errors.streamerId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select labelId="status-label" label="Status" {...field}>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions className="px-6 pb-6">
        <Button onClick={onClose}>Batal</Button>
        <Button type="submit" form="schedule-form" variant="contained" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Jadwal'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
