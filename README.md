# Portal Data - Landing Page

Portal data dan informasi terpadu untuk pelayanan publik yang lebih baik.

## Fitur

### Halaman Beranda
- ✅ Slider Swiper dengan fade transition
- ✅ Section Pengumuman
- ✅ Section Layanan
- ✅ Section Fasilitas Umum dan Agenda
- ✅ Section Galeri Foto

### Halaman
- ✅ Layanan (List & Detail)
- ✅ Pengumuman (List & Detail)
- ✅ Fasilitas Umum (List & Detail)
- ✅ CCTV (List & Detail)
- ✅ Agenda (List & Detail)
- ✅ Data Sectoral (List & Detail)
- ✅ Dokumen (List & Detail)
- ✅ Pelaporan (List & Detail)
- ✅ Bantuan / Kontak

## Teknologi

- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component Library
- **Lucide Icons** - Icon Library
- **Swiper** - Slider Component

## Responsive Design

✅ Desktop (1920px+)
✅ Laptop (1024px - 1919px)
✅ Tablet (768px - 1023px)
✅ Mobile (320px - 767px)

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── agenda/          # Agenda pages
│   ├── bantuan/         # Help/Contact page
│   ├── cctv/            # CCTV pages
│   ├── data-sectoral/   # Data Sectoral pages
│   ├── dokumen/         # Document pages
│   ├── fasilitas-umum/  # Public Facilities pages
│   ├── layanan/         # Services pages
│   ├── pelaporan/       # Reporting pages
│   ├── pengumuman/      # Announcements pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # React components
│   ├── sections/        # Homepage sections
│   ├── ui/              # Shadcn UI components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Footer
├── data/                # Mock data
│   └── mock-data.ts
└── lib/                 # Utilities
    └── utils.ts
```

## License

MIT License
