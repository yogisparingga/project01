# Portal Data - Landing Page

Portal Data adalah website landing page untuk portal data pemerintah dengan berbagai fitur dan halaman.

## Fitur Utama

### Halaman Beranda (index.html)
- **Slider Swiper** dengan efek fade transition
- **Section Pengumuman** - Menampilkan pengumuman terbaru
- **Section Layanan** - Menampilkan layanan yang tersedia
- **Section Fasilitas Umum & Agenda** - Informasi fasilitas dan jadwal kegiatan
- **Section Galeri Foto** - Galeri foto dalam grid layout

### Halaman List
1. **Layanan** (`pages/layanan.html`) - Daftar layanan publik
2. **Pengumuman** (`pages/pengumuman.html`) - Daftar pengumuman
3. **Fasilitas Umum** (`pages/fasilitas.html`) - Daftar fasilitas umum
4. **CCTV** (`pages/cctv.html`) - Live monitoring CCTV
5. **Agenda** (`pages/agenda.html`) - Jadwal kegiatan
6. **Data Sektoral** (`pages/data-sectoral.html`) - Data terbuka sektoral
7. **Dokumen** (`pages/dokumen.html`) - Dokumen publik
8. **Pelaporan** (`pages/pelaporan.html`) - Form pelaporan dan pengaduan

### Halaman Detail
Setiap fitur memiliki halaman detail:
- `layanan-detail.html` - Detail layanan
- `pengumuman-detail.html` - Detail pengumuman
- `fasilitas-detail.html` - Detail fasilitas
- `cctv-detail.html` - Detail CCTV
- `agenda-detail.html` - Detail agenda
- `data-sectoral-detail.html` - Detail data sektoral
- `dokumen-detail.html` - Detail dokumen
- `pelaporan-detail.html` - Detail pelaporan

### Halaman Kontak
- **Kontak** (`pages/kontak.html`) - Form kontak, informasi kontak, dan FAQ

## Teknologi yang Digunakan

- **TailwindCSS** - Framework CSS utility-first
- **Swiper.js** - Slider dengan fade transition
- **Lucide Icons** - Icon library
- **Vanilla JavaScript** - Untuk interaktivitas

## Struktur Folder

```
project01/
├── index.html              # Halaman beranda
├── css/
│   └── styles.css          # Custom CSS
├── js/
│   └── main.js             # JavaScript utama
└── pages/
    ├── layanan.html
    ├── pengumuman.html
    ├── fasilitas.html
    ├── cctv.html
    ├── agenda.html
    ├── data-sectoral.html
    ├── dokumen.html
    ├── pelaporan.html
    ├── kontak.html
    ├── layanan-detail.html
    ├── pengumuman-detail.html
    ├── fasilitas-detail.html
    ├── cctv-detail.html
    ├── agenda-detail.html
    ├── data-sectoral-detail.html
    ├── dokumen-detail.html
    └── pelaporan-detail.html
```

## Fitur Responsive

Website ini sepenuhnya responsive dan telah dioptimalkan untuk:
- **Desktop** (>1024px)
- **Tablet** (768px - 1024px)
- **Mobile** (<768px)

## Cara Menggunakan

1. Buka `index.html` di browser
2. Navigasi menggunakan menu navigasi
3. Semua halaman sudah terhubung dengan navigasi yang konsisten

## Fitur JavaScript

- Mobile menu toggle
- Swiper slider dengan fade effect
- Search functionality
- Filter items
- Modal windows
- Form validation
- Lucide icons initialization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Catatan

- Semua data yang ditampilkan adalah contoh/dummy data
- Slider menggunakan Swiper.js dengan efek fade
- Icons menggunakan Lucide Icons
- Styling menggunakan TailwindCSS CDN

## Lisensi

© 2025 Portal Data. All rights reserved.