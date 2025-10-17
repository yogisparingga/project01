import { useMemo, useState } from 'react'
import { AddOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material'
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
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { ScheduleCalendar } from '../../components/calendar/ScheduleCalendar'
import { StatusPill } from '../../components/common/StatusPill'
import { ScheduleFormDialog } from '../../components/forms/ScheduleFormDialog'
import { createSchedule, deleteSchedule, getSchedules, updateSchedule, type CreateSchedulePayload, type UpdateSchedulePayload } from '../../api/schedules'
import { getUsers } from '../../api/users'
import type { Schedule, User } from '../../types'

export const SchedulesPage = () => {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<'all' | Schedule['status']>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Schedule | null>(null)

  const filters = useMemo(
    () => ({
      status: statusFilter === 'all' ? undefined : statusFilter,
      limit: 50,
    }),
    [statusFilter],
  )

  const { data: scheduleData, isLoading } = useQuery({
    queryKey: ['schedules', filters],
    queryFn: () => getSchedules(filters),
  })

  const { data: streamerData } = useQuery({
    queryKey: ['users', 'streamers'],
    queryFn: () => getUsers({ role: 'streamer', limit: 100 }),
  })

  const schedules = scheduleData?.data || []
  const streamers = (streamerData?.data || []) as User[]

  const createMutation = useMutation({
    mutationFn: (payload: CreateSchedulePayload) => createSchedule(payload),
    onSuccess: () => {
      toast.success('Jadwal berhasil dibuat')
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSchedulePayload }) => updateSchedule(id, payload),
    onSuccess: () => {
      toast.success('Jadwal berhasil diperbarui')
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      toast.success('Jadwal berhasil dihapus')
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })

  const handleCreate = () => {
    setFormMode('create')
    setSelectedSchedule(null)
    setFormOpen(true)
  }

  const handleEdit = (schedule: Schedule) => {
    setFormMode('edit')
    setSelectedSchedule(schedule)
    setFormOpen(true)
  }

  const handleDelete = () => {
    if (!confirmDelete) return
    deleteMutation.mutate(confirmDelete.id)
    setConfirmDelete(null)
  }

  const handleSubmitSchedule = async (payload: CreateSchedulePayload | UpdateSchedulePayload) => {
    if (formMode === 'create') {
      await createMutation.mutateAsync(payload as CreateSchedulePayload)
    } else if (selectedSchedule) {
      await updateMutation.mutateAsync({ id: selectedSchedule.id, payload: payload as UpdateSchedulePayload })
    }
  }

  const handleSelectSchedule = (schedule: Schedule) => {
    handleEdit(schedule)
  }

  return (
    <Stack spacing={3}>
      <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Box>
          <Typography variant="h4" className="font-bold text-slate-900">
            Jadwal Streaming
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pantau dan kelola seluruh jadwal streaming yang akan datang
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate}>
          Jadwal Baru
        </Button>
      </Box>

      <Paper className="p-4">
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            >
              <MenuItem value="all">Semua Status</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <ScheduleCalendar schedules={schedules} onSelectSchedule={handleSelectSchedule} />

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Streamer</TableCell>
                <TableCell>Waktu</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>URL Streaming</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-12">
                    Memuat data jadwal...
                  </TableCell>
                </TableRow>
              ) : schedules.length ? (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id} hover>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="subtitle1" className="font-semibold">
                          {schedule.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {schedule.description}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{schedule.streamerName}</TableCell>
                    <TableCell>{format(new Date(schedule.scheduledAt), "dd MMM yyyy HH:mm")}</TableCell>
                    <TableCell>
                      <StatusPill status={schedule.status} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="max-w-xs truncate">
                        {schedule.streamUrl}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" size="small" startIcon={<EditOutlined />} onClick={() => handleEdit(schedule)}>
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteOutline />}
                          onClick={() => setConfirmDelete(schedule)}
                        >
                          Hapus
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-12 text-slate-500">
                    Belum ada jadwal streaming
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ScheduleFormDialog
        open={formOpen}
        mode={formMode}
        initialData={selectedSchedule}
        streamers={streamers}
        loading={createMutation.isPending || updateMutation.isPending}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitSchedule}
      />

      <Dialog open={Boolean(confirmDelete)} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Hapus Jadwal</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Apakah Anda yakin ingin menghapus jadwal <strong>{confirmDelete?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Batal</Button>
          <Button color="error" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
