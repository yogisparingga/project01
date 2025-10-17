import {
  BoltOutlined,
  LiveTvOutlined,
  ScheduleOutlined,
  SupervisorAccountOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  getDashboardStats,
  getRecentActivities,
  getStreamHistory,
  getStreamingStatus,
} from '../../api/streams'
import { StatsCard } from '../../components/common/StatsCard'
import { StatusPill } from '../../components/common/StatusPill'
import type { Activity } from '../../types'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export const DashboardHomePage = () => {
  const navigate = useNavigate()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
  })

  const { data: streamingStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['streams', 'status'],
    queryFn: getStreamingStatus,
  })

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities', 'recent'],
    queryFn: getRecentActivities,
  })

  const { data: historyData } = useQuery({
    queryKey: ['streams', 'history', { limit: 10 }],
    queryFn: () => getStreamHistory({ limit: 10 }),
  })

  const historyChartData = (historyData?.data || []).map((item) => ({
    date: format(new Date(item.startedAt), 'dd MMM', { locale: id }),
    viewers: item.peakViewers,
    duration: Math.round(item.duration / 60),
  }))

  const renderActivities = (items: Activity[]) => {
    if (!items.length) {
      return (
        <Box className="flex flex-col items-center justify-center gap-2 py-10 text-center text-slate-500">
          <Typography variant="body1">Belum ada aktivitas terbaru</Typography>
          <Typography variant="body2">Aktivitas terbaru akan muncul di sini</Typography>
        </Box>
      )
    }

    return (
      <List>
        {items.map((activity) => (
          <ListItem key={activity.id} className="border-b border-slate-100 last:border-b-0">
            <ListItemAvatar>
              <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BoltOutlined />
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={activity.message}
              secondary={format(new Date(activity.createdAt), "dd MMM yyyy HH:mm", { locale: id })}
            />
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Stack spacing={4}>
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box>
          <Typography variant="h4" className="font-bold text-slate-900">
            Selamat datang kembali!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pantau performa platform streaming Anda secara real-time
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" startIcon={<ScheduleOutlined />} onClick={() => navigate('/schedules')}>
            Buat Jadwal Baru
          </Button>
          <Button variant="outlined" startIcon={<LiveTvOutlined />} onClick={() => navigate('/streaming')}>
            Kelola Streaming
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Streaming"
            value={statsLoading ? '...' : stats?.totalStreams ?? 0}
            description="Jumlah seluruh sesi streaming"
            icon={<LiveTvOutlined />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="User Aktif"
            value={statsLoading ? '...' : stats?.activeUsers ?? 0}
            description="User yang aktif 30 hari terakhir"
            icon={<SupervisorAccountOutlined />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Jadwal Terdaftar"
            value={statsLoading ? '...' : stats?.scheduledStreams ?? 0}
            description="Streaming yang sudah terjadwal"
            icon={<ScheduleOutlined />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Box className="mb-4 flex items-center justify-between">
                <Typography variant="h6" className="font-semibold">
                  Statistik Penonton
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data berdasarkan riwayat streaming terakhir
                </Typography>
              </Box>
              <Box className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyChartData}>
                    <defs>
                      <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="viewers" stroke="#2563eb" fill="url(#colorViewers)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="h6" className="font-semibold">
                    Status Streaming Saat Ini
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pantau status dan kesehatan streaming
                  </Typography>
                </Box>
                {statusLoading ? (
                  <CircularProgress size={28} />
                ) : streamingStatus ? (
                  <StatusPill status={streamingStatus.status} />
                ) : null
              }
              </Box>
              {streamingStatus && (
                <Stack spacing={3} className="mt-6">
                  <Box className="rounded-2xl bg-slate-100 p-4">
                    <Typography variant="body2" color="text.secondary">
                      RTMP Server
                    </Typography>
                    <Typography variant="subtitle1" className="font-semibold">
                      {streamingStatus.serverUrl}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Box className="flex-1">
                      <Typography variant="body2" color="text.secondary">
                        Stream Key
                      </Typography>
                      <Typography variant="subtitle1" className="truncate font-semibold">
                        {streamingStatus.streamKey}
                      </Typography>
                    </Box>
                    <Box className="rounded-xl bg-green-100 px-4 py-2 text-green-600">
                      {streamingStatus.health.toUpperCase()}
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Box className="flex-1 rounded-xl bg-white p-3 text-center">
                      <Typography variant="caption" color="text.secondary" className="uppercase tracking-wide">
                        Viewers
                      </Typography>
                      <Typography variant="h5" className="font-bold text-slate-900">
                        {streamingStatus.viewerCount ?? 0}
                      </Typography>
                    </Box>
                    <Box className="flex-1 rounded-xl bg-white p-3 text-center">
                      <Typography variant="caption" color="text.secondary" className="uppercase tracking-wide">
                        Bitrate
                      </Typography>
                      <Typography variant="h5" className="font-bold text-slate-900">
                        {streamingStatus.bitrate ?? 0} kbps
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Aktivitas Terbaru
              </Typography>
              {activitiesLoading ? (
                <Box className="flex items-center justify-center py-10">
                  <CircularProgress />
                </Box>
              ) : (
                renderActivities(activities || [])
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Aksi Cepat
              </Typography>
              <Stack spacing={2}>
                <Button variant="outlined" startIcon={<SupervisorAccountOutlined />} onClick={() => navigate('/users')}>
                  Kelola User
                </Button>
                <Button variant="outlined" startIcon={<ScheduleOutlined />} onClick={() => navigate('/schedules')}>
                  Lihat Jadwal Streaming
                </Button>
                <Button variant="outlined" startIcon={<LiveTvOutlined />} onClick={() => navigate('/streaming')}>
                  Monitoring Streaming
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
