# StreamHub Admin Dashboard

StreamHub Admin Dashboard adalah aplikasi frontend berbasis React yang digunakan untuk mengelola platform live streaming YouTube. Aplikasi ini menyediakan panel kontrol komprehensif untuk mengatur autentikasi, manajemen user, jadwal streaming, pemantauan sesi live, riwayat streaming, profil streamer, hingga konfigurasi aplikasi.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) dengan bundler [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) untuk navigasi
- [Tailwind CSS](https://tailwindcss.com/) dan [Material UI](https://mui.com/) untuk antarmuka
- [React Query](https://tanstack.com/query/latest) untuk data fetching dan cache
- [Axios](https://axios-http.com/) untuk komunikasi API
- [Recharts](https://recharts.org/) untuk visualisasi data
- [React Hook Form](https://react-hook-form.com/) untuk pengelolaan form

## Fitur Utama

### Autentikasi
- Halaman login, register, dan lupa password
- Proteksi route menggunakan guard dengan validasi JWT
- Penyimpanan session aman berbasis token

### Dashboard
- Ringkasan statistik streaming dan user
- Status live streaming realtime dengan indikator kesehatan
- Aktivitas terbaru dan tombol aksi cepat
- Grafik performa penonton menggunakan Recharts

### Manajemen User (Admin)
- Tabel user dengan pencarian, filter role & status
- CRUD user, termasuk set role dan status
- Melihat dan regenerate stream key setiap user

### Manajemen Jadwal
- Kalender streaming interaktif dan list view
- Form penjadwalan lengkap (judul, deskripsi, URL, tanggal, streamer)
- Filter status dan aksi edit/hapus

### Kontrol Streaming
- Monitoring status live, server RTMP, dan stream key
- Copy ke clipboard & kontrol start/stop streaming manual
- Indikator kesehatan streaming dan panduan setup OBS

### Riwayat Streaming
- Tabel riwayat dengan filter tanggal, status, dan pencarian
- Detail performa (durasi, viewers, status)
- Ekspor data ke CSV

### Profil Pengguna
- Update profil dan perubahan password
- Akses stream key personal & statistik streaming pribadi

### Pengaturan Aplikasi (Admin)
- Konfigurasi RTMP server, YouTube API, dan notifikasi
- Preferensi pemberitahuan (email, push, SMS)

## Memulai Pengembangan

1. **Install dependensi**
   ```bash
   npm install
   ```

2. **Salin file environment**
   ```bash
   cp .env.example .env
   ```
   Atur `VITE_API_BASE_URL` sesuai endpoint backend Anda.

3. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Build produksi**
   ```bash
   npm run build
   ```

## Struktur Direktori

```
src/
├─ api/              // Abstraksi komunikasi API
├─ components/       // Komponen UI reusable (layout, form, dsb.)
├─ context/          // Context global (autentikasi, dsb.)
├─ data/             // Konfigurasi statis seperti navigasi
├─ lib/              // Inisialisasi library (mis. React Query)
├─ pages/            // Halaman utama aplikasi
├─ routes/           // Deklarasi routing & guard
├─ types/            // Definisi tipe TypeScript aplikasi
└─ utils/            // Helper & utilitas
```

## Catatan Integrasi API

- Semua permintaan API menggunakan base URL dari `VITE_API_BASE_URL`.
- Pastikan backend mengimplementasikan endpoint sesuai kebutuhan berikut:
  - Autentikasi: `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/me`
  - User manajemen: `/users`, `/users/:id`, `/users/:id/stream-key`
  - Jadwal streaming: `/schedules`
  - Streaming status & kontrol: `/streams/status`, `/streams/start`, `/streams/stop`, `/streams/history`
  - Pengaturan aplikasi: `/settings`
  - Profil pengguna: `/me/profile`, `/me/change-password`, `/me/stream-key`, `/me/statistics`
  - Aktivitas terbaru: `/activities/recent`

## Lisensi

Proyek ini menggunakan lisensi internal perusahaan. Silakan sesuaikan dengan kebutuhan organisasi Anda.
