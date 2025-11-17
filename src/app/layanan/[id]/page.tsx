import Link from "next/link";
import { ArrowLeft, Users, FileCheck, MessageSquare, Info, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { layananData } from "@/data/mock-data";

const iconMap: { [key: string]: any } = {
  Users,
  FileCheck,
  MessageSquare,
  Info,
};

export default async function LayananDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const layanan = layananData.find((item) => item.id === parseInt(id));
  if (!layanan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Layanan tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/layanan">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Layanan
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[layanan.icon];

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/layanan">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Layanan
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="mb-8 h-[400px] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${layanan.image})` }}
          />

          <div className="mb-6 flex items-start space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-bold">{layanan.title}</h1>
              <p className="text-lg text-muted-foreground">{layanan.description}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Deskripsi Layanan</h2>
            <p className="mb-4 text-muted-foreground">
              Layanan ini menyediakan akses mudah dan cepat untuk kebutuhan Anda. Dengan sistem
              yang terintegrasi, kami memastikan proses yang efisien dan transparan untuk semua
              pengguna.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Fitur Layanan</h3>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Proses online yang mudah dan cepat</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Akses 24/7 dari mana saja</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Tracking status real-time</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Notifikasi otomatis via email/SMS</span>
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Persyaratan</h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
              <li>KTP yang masih berlaku</li>
              <li>Dokumen pendukung sesuai jenis layanan</li>
              <li>Email aktif untuk notifikasi</li>
              <li>Nomor telepon yang dapat dihubungi</li>
            </ul>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Akses Layanan</CardTitle>
              <CardDescription>
                Mulai gunakan layanan ini sekarang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Waktu proses: 1-3 hari kerja</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Gratis</Badge>
                <Badge>Online</Badge>
              </div>
              <Button className="w-full" size="lg">
                Mulai Layanan
              </Button>
              <Button variant="outline" className="w-full">
                Hubungi Bantuan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
