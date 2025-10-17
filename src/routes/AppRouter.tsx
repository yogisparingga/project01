import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { DashboardHomePage } from '../pages/dashboard/DashboardHomePage'
import { UsersPage } from '../pages/users/UsersPage'
import { SchedulesPage } from '../pages/schedules/SchedulesPage'
import { StreamingPage } from '../pages/streaming/StreamingPage'
import { StreamHistoryPage } from '../pages/history/StreamHistoryPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { SettingsPage } from '../pages/settings/SettingsPage'
import { NotFoundPage } from '../pages/NotFoundPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route
            path="users"
            element={
              <ProtectedRoute roles={['admin']}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route path="schedules" element={<SchedulesPage />} />
          <Route path="streaming" element={<StreamingPage />} />
          <Route path="stream-history" element={<StreamHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute roles={['admin']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
