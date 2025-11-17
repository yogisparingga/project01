import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agendaData } from "@/data/mock-data";

export default async function AgendaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = agendaData.find((item) => item.id === parseInt(id));

  if (!agenda) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Agenda tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/agenda">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Agenda
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/agenda">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Agenda
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="mb-4">
              <Badge>{agenda.category}</Badge>
            </div>
            <h1 className="mb-4 text-3xl font-bold">{agenda.title}</h1>
            <p className="text-lg text-muted-foreground">{agenda.description}</p>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Detail Acara</h2>
            <p className="mb-4 text-muted-foreground">
              Acara ini merupakan salah satu kegiatan rutin yang diadakan untuk meningkatkan
              kualitas pelayanan dan koordinasi antar unit. Kehadiran peserta sangat diharapkan
              untuk kelancaran acara.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Tujuan Acara</h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Meningkatkan koordinasi dan sinergi antar unit kerja</li>
              <li>Evaluasi program dan capaian kinerja</li>
              <li>Penyampaian informasi dan kebijakan terbaru</li>
              <li>Diskusi dan brainstorming solusi permasalahan</li>
            </ul>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Susunan Acara</h3>
            <div className="mb-6 space-y-2 text-muted-foreground">
              <p>• 08.00 - 08.30: Registrasi peserta</p>
              <p>• 08.30 - 09.00: Pembukaan</p>
              <p>• 09.00 - 12.00: Sesi presentasi dan diskusi</p>
              <p>• 12.00 - 13.00: Ishoma</p>
              <p>• 13.00 - 16.00: Lanjutan sesi dan penutupan</p>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Informasi Acara</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Tanggal</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(agenda.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Waktu</p>
                  <p className="text-sm text-muted-foreground">{agenda.time}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Lokasi</p>
                  <p className="text-sm text-muted-foreground">{agenda.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Tag className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Kategori</p>
                  <p className="text-sm text-muted-foreground">{agenda.category}</p>
                </div>
              </div>
              <Button className="w-full">Daftar Hadir</Button>
              <Button variant="outline" className="w-full">
                Tambah ke Kalender
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
