import { useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { ContentCopyOutlined, LiveTvOutlined, StopOutlined } from '@mui/icons-material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getStreamingStatus, startStream, stopStream } from '../../api/streams'

export const StreamingPage = () => {
  const queryClient = useQueryClient()

  const { data: streamingStatus, isLoading } = useQuery({
    queryKey: ['streams', 'status'],
    queryFn: getStreamingStatus,
    refetchInterval: 5000,
  })

  const startMutation = useMutation({
    mutationFn: startStream,
    onSuccess: () => {
      toast.success('Streaming dimulai')
      queryClient.invalidateQueries({ queryKey: ['streams', 'status'] })
    },
  })

  const stopMutation = useMutation({
    mutationFn: stopStream,
    onSuccess: () => {
      toast.success('Streaming dihentikan')
      queryClient.invalidateQueries({ queryKey: ['streams', 'status'] })
    },
  })

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} disalin ke clipboard`)
    } catch (error) {
      toast.error('Gagal menyalin ke clipboard')
    }
  }

  const healthLevel = useMemo(() => {
    if (!streamingStatus) return 0
    if (!streamingStatus.bitrate) return 0
    const bitrate = streamingStatus.bitrate
    if (bitrate >= 6000) return 100
    if (bitrate >= 4500) return 80
    if (bitrate >= 3000) return 60
    if (bitrate >= 1500) return 40
    return 20
  }, [streamingStatus])

  const isLive = streamingStatus?.status === 'live'

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" className="font-bold text-slate-900">
          Kontrol Streaming
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pantau status streaming, kelola RTMP server, dan akses stream key pribadi
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Stack spacing={3}>
                <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Box>
                    <Typography variant="h6" className="font-semibold">
                      Status Streaming
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Informasi terkini mengenai sesi streaming Anda saat ini
                    </Typography>
                  </Box>
                  <Chip
                    label={streamingStatus?.status.toUpperCase() || 'UNKNOWN'}
                    color={isLive ? 'success' : streamingStatus?.status === 'scheduled' ? 'warning' : 'default'}
                    variant={isLive ? 'filled' : 'outlined'}
                  />
                </Box>

                {isLoading ? (
                  <Box className="flex items-center justify-center py-12">
                    <CircularProgress />
                  </Box>
                ) : streamingStatus ? (
                  <Stack spacing={3}>
                    <Box className="rounded-2xl bg-slate-100 p-4">
                      <Typography variant="body2" color="text.secondary">
                        RTMP Server URL
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} className="mt-2">
                        <Typography variant="h6" className="font-semibold">
                          {streamingStatus.serverUrl}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCopy(streamingStatus.serverUrl, 'RTMP server URL')}
                          startIcon={<ContentCopyOutlined />}
                        >
                          Salin
                        </Button>
                      </Stack>
                    </Box>

                    <Box className="rounded-2xl bg-white p-4 shadow-sm">
                      <Typography variant="body2" color="text.secondary">
                        Stream Key Pribadi
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} className="mt-2">
                        <Typography variant="h6" className="font-mono font-semibold">
                          {streamingStatus.streamKey}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCopy(streamingStatus.streamKey, 'Stream key')}
                          startIcon={<ContentCopyOutlined />}
                        >
                          Salin
                        </Button>
                      </Stack>
                    </Box>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" className="font-semibold">
                          Kesehatan Streaming
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {streamingStatus.health.toUpperCase()}
                        </Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={healthLevel} className="mt-2 h-3 rounded-full" />
                      <Stack direction="row" spacing={3} className="mt-3 text-sm text-slate-600">
                        <span>Bitrate: {streamingStatus.bitrate ?? '-'} kbps</span>
                        <span>Drop Frames: {streamingStatus.dropFrames ?? 0}</span>
                        <span>Viewers: {streamingStatus.viewerCount ?? 0}</span>
                      </Stack>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LiveTvOutlined />}
                        onClick={() => startMutation.mutate()}
                        disabled={isLive || startMutation.isPending}
                      >
                        {startMutation.isPending ? 'Memulai...' : 'Mulai Streaming'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<StopOutlined />}
                        onClick={() => stopMutation.mutate()}
                        disabled={!isLive || stopMutation.isPending}
                      >
                        {stopMutation.isPending ? 'Menghentikan...' : 'Hentikan Streaming'}
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Belum ada data streaming.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card elevation={0} className="border border-slate-100 shadow-sm">
            <CardContent>
              <Typography variant="h6" className="mb-3 font-semibold">
                Instruksi Setup OBS
              </Typography>
              <Stack spacing={2} className="text-sm text-slate-600">
                <Box>
                  <Typography variant="subtitle2" className="font-semibold uppercase tracking-wide text-slate-500">
                    1. Pengaturan Output
                  </Typography>
                  <Typography>
                    Gunakan bitrate 4500-6000 kbps, encoder x264, serta audio bitrate minimal 160 kbps untuk hasil terbaik.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" className="font-semibold uppercase tracking-wide text-slate-500">
                    2. Pengaturan Video
                  </Typography>
                  <Typography>
                    Base canvas 1920x1080 dengan FPS 60. Pastikan Scale Filtering menggunakan Lanczos.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" className="font-semibold uppercase tracking-wide text-slate-500">
                    3. Uji Koneksi
                  </Typography>
                  <Typography>
                    Lakukan test streaming privat sebelum tayang untuk memastikan kestabilan jaringan dan audio.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" className="font-semibold uppercase tracking-wide text-slate-500">
                    4. Monitoring
                  </Typography>
                  <Typography>
                    Pantau panel indikator di atas secara berkala. Hindari multitasking berat saat streaming untuk menjaga bitrate stabil.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
