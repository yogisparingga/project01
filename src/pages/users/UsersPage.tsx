import { useDeferredValue, useMemo, useState } from 'react'
import {
  AddOutlined,
  DeleteOutline,
  EditOutlined,
  KeyOutlined,
  RefreshOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
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
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import {
  createUser,
  deleteUser,
  getUserStreamKey,
  getUsers,
  regenerateStreamKey,
  updateUser,
  type CreateUserPayload,
  type UpdateUserPayload,
} from '../../api/users'
import { UserFormDialog } from '../../components/forms/UserFormDialog'
import { StatusPill } from '../../components/common/StatusPill'
import type { User } from '../../types'
import { useAuth } from '../../context/AuthContext'

interface StreamKeyDialogState {
  open: boolean
  user?: User
  streamKey?: string
}

export const UsersPage = () => {
  const { user: currentUser } = useAuth()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDeferredValue(search)
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [formOpen, setFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [streamKeyDialog, setStreamKeyDialog] = useState<StreamKeyDialogState>({ open: false })
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<User | null>(null)

  const filters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      role: roleFilter === 'all' ? undefined : roleFilter,
      status: statusFilter === 'all' ? undefined : statusFilter,
      page: page + 1,
      limit: rowsPerPage,
    }),
    [debouncedSearch, page, roleFilter, rowsPerPage, statusFilter],
  )

  const { data, isLoading } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
    keepPreviousData: true,
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      toast.success('User berhasil dibuat')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) => updateUser(id, payload),
    onSuccess: () => {
      toast.success('User berhasil diperbarui')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success('User berhasil dihapus')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const fetchStreamKeyMutation = useMutation({
    mutationFn: (id: string) => getUserStreamKey(id),
    onSuccess: (data) => {
      setStreamKeyDialog((prev) => ({ ...prev, streamKey: data.streamKey }))
    },
  })

  const regenerateStreamKeyMutation = useMutation({
    mutationFn: (id: string) => regenerateStreamKey(id),
    onSuccess: (data) => {
      toast.success('Stream key berhasil digenerate ulang')
      setStreamKeyDialog((prev) => ({
        open: true,
        user: prev?.user,
        streamKey: data.streamKey,
      }))
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const isLoadingStreamKey = fetchStreamKeyMutation.isPending || regenerateStreamKeyMutation.isPending

  const handleCreateClick = () => {
    setFormMode('create')
    setSelectedUser(null)
    setFormOpen(true)
  }

  const handleEditClick = (user: User) => {
    setFormMode('edit')
    setSelectedUser(user)
    setFormOpen(true)
  }

  const handleStreamKeyClick = (user: User) => {
    setStreamKeyDialog({ open: true, user })
    fetchStreamKeyMutation.mutate(user.id)
  }

  const handleRegenerateKey = (user: User) => {
    setStreamKeyDialog({ open: true, user })
    regenerateStreamKeyMutation.mutate(user.id)
  }

  const handleDelete = () => {
    if (!confirmDeleteUser) return
    deleteMutation.mutate(confirmDeleteUser.id)
    setConfirmDeleteUser(null)
  }

  const handleSubmitUser = async (values: CreateUserPayload | UpdateUserPayload) => {
    if (formMode === 'create') {
      await createMutation.mutateAsync(values as CreateUserPayload)
    } else if (selectedUser) {
      await updateMutation.mutateAsync({ id: selectedUser.id, payload: values as UpdateUserPayload })
    }
  }

  if (currentUser?.role !== 'admin') {
    return (
      <Paper className="p-8 text-center">
        <Typography variant="h6" className="font-semibold">
          Akses ditolak
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Anda tidak memiliki izin untuk mengelola data user.
        </Typography>
      </Paper>
    )
  }

  return (
    <Stack spacing={3}>
      <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Box>
          <Typography variant="h4" className="font-bold text-slate-900">
            Manajemen User
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Kelola seluruh user dan akses streaming
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreateClick}>
          User Baru
        </Button>
      </Box>

      <Paper className="p-4">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <TextField
            placeholder="Cari berdasarkan nama atau email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="role-filter-label">Role</InputLabel>
            <Select
              labelId="role-filter-label"
              value={roleFilter}
              label="Role"
              onChange={(event) => setRoleFilter(event.target.value as typeof roleFilter)}
            >
              <MenuItem value="all">Semua Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="streamer">Streamer</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            >
              <MenuItem value="all">Semua Status</MenuItem>
              <MenuItem value="active">Aktif</MenuItem>
              <MenuItem value="inactive">Nonaktif</MenuItem>
              <MenuItem value="banned">Diblokir</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pengguna</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Terakhir Login</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="py-10">
                    Memuat data user...
                  </TableCell>
                </TableRow>
              ) : (data?.data || []).length ? (
                data?.data.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="subtitle1" className="font-semibold">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <StatusPill status={user.status} />
                    </TableCell>
                    <TableCell>
                      {user.lastLoginAt ? format(new Date(user.lastLoginAt), "dd MMM yyyy HH:mm") : 'Belum pernah'}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton color="primary" onClick={() => handleStreamKeyClick(user)}>
                          <KeyOutlined />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleRegenerateKey(user)}>
                          <RefreshOutlined />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditClick(user)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton color="error" onClick={() => setConfirmDeleteUser(user)}>
                          <DeleteOutline />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="py-12 text-slate-500">
                    Tidak ada data user
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data?.pagination.total || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>

      <UserFormDialog
        open={formOpen}
        mode={formMode}
        initialData={selectedUser}
        loading={createMutation.isPending || updateMutation.isPending}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitUser}
      />

      <Dialog open={streamKeyDialog.open} onClose={() => setStreamKeyDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>Stream Key</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="font-semibold">
            {streamKeyDialog.user?.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {streamKeyDialog.user?.email}
          </Typography>
          <Typography variant="body2" className="mt-4 break-all rounded-lg bg-slate-100 p-3 font-mono">
            {isLoadingStreamKey ? 'Mengambil stream key...' : streamKeyDialog.streamKey || 'Stream key belum tersedia'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStreamKeyDialog({ open: false })}>Tutup</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(confirmDeleteUser)} onClose={() => setConfirmDeleteUser(null)}>
        <DialogTitle>Hapus User</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Apakah Anda yakin ingin menghapus user <strong>{confirmDeleteUser?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteUser(null)}>Batal</Button>
          <Button color="error" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
