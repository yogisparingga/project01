import { useState } from 'react'
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parseISO, startOfMonth, startOfWeek } from 'date-fns'
import { id } from 'date-fns/locale'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import type { Schedule } from '../../types'

interface ScheduleCalendarProps {
  schedules: Schedule[]
  onSelectSchedule?: (schedule: Schedule) => void
}

const weekdays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export const ScheduleCalendar = ({ schedules, onSelectSchedule }: ScheduleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const eventsByDay = schedules.reduce<Record<string, Schedule[]>>((acc, schedule) => {
    const dateKey = format(parseISO(schedule.scheduledAt), 'yyyy-MM-dd')
    acc[dateKey] = acc[dateKey] || []
    acc[dateKey].push(schedule)
    return acc
  }, {})

  const handlePrevMonth = () => setCurrentDate((date) => addMonths(date, -1))
  const handleNextMonth = () => setCurrentDate((date) => addMonths(date, 1))

  return (
    <Card elevation={0} className="border border-slate-100 shadow-sm">
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} className="mb-4">
          <Box>
            <Typography variant="h6" className="font-semibold">
              Kalender Streaming
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format(currentDate, 'MMMM yyyy', { locale: id })}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={handlePrevMonth}>
              Bulan Sebelumnya
            </Button>
            <Button variant="outlined" size="small" onClick={handleNextMonth}>
              Bulan Berikutnya
            </Button>
          </Stack>
        </Stack>
        <Box className="mb-2 grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <Box key={day} className="text-center">
              <Typography variant="subtitle2" className="font-semibold uppercase text-slate-500">
                {day}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const dayEvents = eventsByDay[dateKey] || []
            const inCurrentMonth = isSameMonth(day, currentDate)
            const isToday = isSameDay(day, new Date())

            return (
              <Box key={dateKey}>
                <Box
                  className={`min-h-[110px] rounded-xl border p-2 ${inCurrentMonth ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50'} ${isToday ? 'ring-2 ring-primary/60' : ''}`}
                >
                  <Typography variant="subtitle2" className={`font-semibold ${inCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>
                    {format(day, 'd')}
                  </Typography>
                  <Stack spacing={1} className="mt-2">
                    {dayEvents.slice(0, 3).map((event) => (
                      <Box
                        key={event.id}
                        className="cursor-pointer rounded-lg bg-primary/5 px-2 py-1"
                        onClick={() => onSelectSchedule?.(event)}
                      >
                        <Typography variant="body2" className="line-clamp-1 font-medium text-primary">
                          {event.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(parseISO(event.scheduledAt), 'HH:mm')} • {event.streamerName}
                        </Typography>
                      </Box>
                    ))}
                    {dayEvents.length > 3 && (
                      <Typography variant="caption" color="text.secondary" className="text-right">
                        +{dayEvents.length - 3} lainnya
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}
