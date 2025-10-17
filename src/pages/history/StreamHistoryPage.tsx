import { useMemo, useState } from 'react'
import { DownloadOutlined, SearchOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { exportStreamHistory, getStreamHistory } from '../../api/streams'
import { StatusPill } from '../../components/common/StatusPill'
import { formatDateTime, formatDuration } from '../../utils/format'
import type { StreamHistoryFilters, StreamHistoryItem } from '../../types'

export const StreamHistoryPage = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | StreamHistoryItem['status']>('all')
  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'))
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs())
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filters = useMemo<StreamHistoryFilters & { search?: string; page: number; limit: number }>(
    () => ({
      status: statusFilter === 'all' ? undefined : statusFilter,
      from: fromDate ? fromDate.startOf('day').toISOString() : undefined,
      to: toDate ? toDate.endOf('day').toISOString() : undefined,
      search: search || undefined,
      page: page + 1,
      limit: rowsPerPage,
    }),
    [fromDate, page, rowsPerPage, search, statusFilter, toDate],
  )

  const { data, isLoading } = useQuery({
    queryKey: ['streams', 'history', filters],
    queryFn: () => getStreamHistory(filters),
    keepPreviousData: true,
  })

  const exportMutation = useMutation({
    mutationFn: () => exportStreamHistory(filters),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `stream-history-${Date.now()}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Riwayat streaming berhasil diekspor')
    },
  })

  const streams = data?.data || []

  return (
    <Stack spacing={3}>
      <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Box>
          <Typography variant="h4" className="font-bold text-slate-900">
            Riwayat Streaming
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Lihat performa sesi streaming sebelumnya dan ekspor data penting
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadOutlined />}
          onClick={() => exportMutation.mutate()}
          disabled={exportMutation.isPending}
        >
          {exportMutation.isPending ? 'Memproses...' : 'Export CSV'}
        </Button>
      </Box>

      <Paper className="p-4">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
          <TextField
            placeholder="Cari judul atau streamer"
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
          <DatePicker label="Dari" value={fromDate} onChange={(value) => setFromDate(value)} />
          <DatePicker label="Sampai" value={toDate} onChange={(value) => setToDate(value)} />
          <FormControl sx={{ minWidth: 160 }}>
            <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} displayEmpty>
              <MenuItem value="all">Semua Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Streamer</TableCell>
                <TableCell>Durasi</TableCell>
                <TableCell>Viewers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Mulai</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-12">
                    Memuat riwayat streaming...
                  </TableCell>
                </TableRow>
              ) : streams.length ? (
                streams.map((stream) => (
                  <TableRow key={stream.id} hover>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="subtitle1" className="font-semibold">
                          {stream.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rata-rata viewers {stream.averageViewers}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{stream.streamerName}</TableCell>
                    <TableCell>{formatDuration(stream.duration)}</TableCell>
                    <TableCell>
                      <Typography variant="body2">Puncak {stream.peakViewers}</Typography>
                    </TableCell>
                    <TableCell>
                      <StatusPill status={stream.status} />
                    </TableCell>
                    <TableCell>{formatDateTime(stream.startedAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-12 text-slate-500">
                    Tidak ada data riwayat streaming
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
    </Stack>
  )
}
