import Link from "next/link";
import { ArrowLeft, MapPin, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fasilitasData } from "@/data/mock-data";

export default async function FasilitasUmumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fasilitas = fasilitasData.find((item) => item.id === parseInt(id));
  if (!fasilitas) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Fasilitas tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/fasilitas-umum">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Fasilitas Umum
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/fasilitas-umum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Fasilitas Umum
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="mb-8 h-[400px] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${fasilitas.image})` }}
          />

          <div className="mb-6">
            <div className="mb-4">
              <Badge>{fasilitas.category}</Badge>
            </div>
            <h1 className="mb-2 text-3xl font-bold">{fasilitas.title}</h1>
            <p className="text-lg text-muted-foreground">{fasilitas.description}</p>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Tentang Fasilitas</h2>
            <p className="mb-4 text-muted-foreground">
              Fasilitas ini dibangun untuk memberikan kenyamanan dan kemudahan bagi masyarakat
              dalam melakukan berbagai aktivitas. Dengan lokasi yang strategis dan akses yang
              mudah, fasilitas ini menjadi pilihan utama untuk kegiatan sehari-hari.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Fasilitas yang Tersedia</h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Area parkir yang luas</li>
              <li>Toilet dan fasilitas kebersihan</li>
              <li>Area bermain anak</li>
              <li>Jalur aksesibilitas untuk difabel</li>
              <li>Penerangan yang memadai</li>
            </ul>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Jam Operasional</h3>
            <p className="mb-4 text-muted-foreground">
              Senin - Minggu: 06.00 - 22.00 WIB
            </p>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Informasi Lokasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-sm text-muted-foreground">{fasilitas.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Jam Operasional</p>
                  <p className="text-sm text-muted-foreground">06.00 - 22.00 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Tag className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Kategori</p>
                  <p className="text-sm text-muted-foreground">{fasilitas.category}</p>
                </div>
              </div>
              <Button className="w-full">Lihat di Peta</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
