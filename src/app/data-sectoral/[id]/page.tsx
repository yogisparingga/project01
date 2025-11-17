import Link from "next/link";
import { ArrowLeft, Calendar, Database, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dataSectoralData } from "@/data/mock-data";

export default async function DataSectoralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = dataSectoralData.find((item) => item.id === parseInt(id));
  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/data-sectoral">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Data Sectoral
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/data-sectoral">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Data Sectoral
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>
            <p className="text-lg text-muted-foreground">{data.description}</p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.records}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Last Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">
                  {new Date(data.lastUpdate).toLocaleDateString("id-ID")}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Format</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge>CSV, JSON, Excel</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Tentang Data</h2>
            <p className="mb-4 text-muted-foreground">
              Data ini dikumpulkan dan dikelola untuk mendukung perencanaan pembangunan dan
              pengambilan keputusan berbasis data. Semua data telah diverifikasi dan divalidasi
              sesuai dengan standar yang berlaku.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Kategori Data</h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Data statistik agregat</li>
              <li>Data historis 5 tahun terakhir</li>
              <li>Data proyeksi dan tren</li>
              <li>Data komparasi regional</li>
            </ul>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Cara Menggunakan Data</h3>
            <ol className="mb-6 list-inside list-decimal space-y-2 text-muted-foreground">
              <li>Pilih format data yang diinginkan</li>
              <li>Klik tombol download untuk mengunduh</li>
              <li>Baca dokumentasi penggunaan data</li>
              <li>Gunakan data sesuai lisensi yang berlaku</li>
            </ol>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Download Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Excel
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Informasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Database className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Total Records</p>
                  <p className="text-sm text-muted-foreground">{data.records} data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Update Terakhir</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(data.lastUpdate).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
