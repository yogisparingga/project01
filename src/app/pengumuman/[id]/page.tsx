import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pengumumanData } from "@/data/mock-data";

export default async function PengumumanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pengumuman = pengumumanData.find((item) => item.id === parseInt(id));
  if (!pengumuman) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Pengumuman tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/pengumuman">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Pengumuman
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/pengumuman">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Pengumuman
        </Link>
      </Button>

      <article className="mx-auto max-w-4xl">
        <div
          className="mb-8 h-[400px] rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${pengumuman.image})` }}
        />

        <div className="mb-6 flex items-center space-x-4">
          <Badge>{pengumuman.category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(pengumuman.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-bold">{pengumuman.title}</h1>

        <div className="prose max-w-none">
          <p className="mb-4 text-lg font-medium text-muted-foreground">
            {pengumuman.excerpt}
          </p>

          <div className="text-muted-foreground">
            <p className="mb-4">{pengumuman.content}</p>

            <p className="mb-4">
              Untuk informasi lebih lanjut, silakan hubungi layanan bantuan kami melalui halaman
              kontak atau telepon ke nomor yang tertera di bagian footer website ini.
            </p>

            <p>
              Terima kasih atas perhatian dan kerjasamanya. Mari bersama-sama kita tingkatkan
              kualitas pelayanan publik untuk masyarakat yang lebih baik.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Kategori: {pengumuman.category}
              </span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/pengumuman">
                Lihat Pengumuman Lainnya
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
