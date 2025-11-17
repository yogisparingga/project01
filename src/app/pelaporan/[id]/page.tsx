import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pelaporanData } from "@/data/mock-data";

const statusColors = {
  "Dalam Proses": "default",
  Selesai: "secondary",
  Menunggu: "outline",
} as const;

const priorityColors = {
  Tinggi: "destructive",
  Sedang: "default",
  Rendah: "secondary",
} as const;

export default async function PelaporanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const laporan = pelaporanData.find((item) => item.id === parseInt(id));
  if (!laporan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Laporan tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/pelaporan">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Pelaporan
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/pelaporan">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Pelaporan
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="mb-4 flex items-center space-x-2">
              <Badge variant={statusColors[laporan.status as keyof typeof statusColors]}>
                {laporan.status}
              </Badge>
              <Badge variant={priorityColors[laporan.priority as keyof typeof priorityColors]}>
                Prioritas: {laporan.priority}
              </Badge>
            </div>
            <h1 className="mb-4 text-3xl font-bold">{laporan.title}</h1>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Detail Laporan</h2>
            <p className="mb-4 text-muted-foreground">
              Laporan ini telah diterima dan sedang dalam proses penanganan oleh tim terkait. Kami
              berkomitmen untuk menyelesaikan setiap laporan dengan sebaik-baiknya.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Deskripsi</h3>
            <p className="mb-4 text-muted-foreground">
              Kondisi {laporan.title.toLowerCase()} yang memerlukan perhatian dan penanganan segera
              dari pihak berwenang. Lokasi telah diidentifikasi dan tim lapangan akan melakukan
              pengecekan langsung.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Timeline Penanganan</h3>
            <div className="mb-6 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">Laporan Diterima</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(laporan.date).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
              {laporan.status !== "Menunggu" && (
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Dalam Penanganan</p>
                    <p className="text-sm text-muted-foreground">
                      Tim sudah melakukan pengecekan lapangan
                    </p>
                  </div>
                </div>
              )}
              {laporan.status === "Selesai" && (
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  <div>
                    <p className="font-medium">Selesai</p>
                    <p className="text-sm text-muted-foreground">
                      Permasalahan telah ditangani dengan baik
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Informasi Laporan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Pelapor</p>
                  <p className="text-sm text-muted-foreground">{laporan.reporter}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Tanggal Laporan</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(laporan.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Tag className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Kategori</p>
                  <p className="text-sm text-muted-foreground">{laporan.category}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Tag className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Status</p>
                  <Badge variant={statusColors[laporan.status as keyof typeof statusColors]}>
                    {laporan.status}
                  </Badge>
                </div>
              </div>
              <Button className="w-full">Hubungi Tim</Button>
              <Button variant="outline" className="w-full">
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
