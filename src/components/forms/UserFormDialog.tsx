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
import { useForm, Controller } from 'react-hook-form'
import type { CreateUserPayload, UpdateUserPayload } from '../../api/users'
import type { User } from '../../types'

interface UserFormDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  onClose: () => void
  onSubmit: (values: CreateUserPayload | UpdateUserPayload) => Promise<void> | void
  loading?: boolean
  initialData?: User | null
}

type UserFormValues = {
  name: string
  email: string
  password?: string
  role: User['role']
  status: User['status']
}

export const UserFormDialog = ({ open, onClose, mode, onSubmit, loading, initialData }: UserFormDialogProps) => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'streamer',
      status: 'active',
    },
  })

  useEffect(() => {
    if (initialData && mode === 'edit') {
      reset({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      })
    } else if (mode === 'create') {
      reset({
        name: '',
        email: '',
        password: '',
        role: 'streamer',
        status: 'active',
      })
    }
  }, [initialData, mode, reset])

  const submitHandler = async (values: UserFormValues) => {
    try {
      if (mode === 'create') {
        await onSubmit({
          name: values.name,
          email: values.email,
          password: values.password || '',
          role: values.role,
          status: values.status,
        })
      } else {
        await onSubmit({
          name: values.name,
          email: values.email,
          role: values.role,
          status: values.status,
        })
      }
      onClose()
    } catch (error) {
      // Error handling ditangani di level yang lebih tinggi
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'Tambah User Baru' : 'Edit User'}</DialogTitle>
      <DialogContent>
        <Box component="form" id="user-form" onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={3} className="pt-2">
            <TextField
              label="Nama"
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
            {mode === 'create' && (
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', {
                  required: 'Password wajib diisi',
                  minLength: { value: 6, message: 'Minimal 6 karakter' },
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
            <Controller
              control={control}
              name="role"
              rules={{ required: 'Role wajib dipilih' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.role)}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select labelId="role-label" label="Role" {...field}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="streamer">Streamer</MenuItem>
                    <MenuItem value="moderator">Moderator</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error" className="ml-3 mt-1">
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="status"
              rules={{ required: 'Status wajib dipilih' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.status)}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select labelId="status-label" label="Status" {...field}>
                    <MenuItem value="active">Aktif</MenuItem>
                    <MenuItem value="inactive">Nonaktif</MenuItem>
                    <MenuItem value="banned">Diblokir</MenuItem>
                  </Select>
                  {errors.status && (
                    <Typography variant="caption" color="error" className="ml-3 mt-1">
                      {errors.status.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions className="px-6 pb-6">
        <Button onClick={onClose} color="inherit">
          Batal
        </Button>
        <Button type="submit" form="user-form" variant="contained" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
