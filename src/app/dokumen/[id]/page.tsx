import Link from "next/link";
import { ArrowLeft, Download, Calendar, FileType, HardDrive, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dokumenData } from "@/data/mock-data";

export default async function DokumenDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dokumen = dokumenData.find((item) => item.id === parseInt(id));

  if (!dokumen) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Dokumen tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/dokumen">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Dokumen
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/dokumen">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Dokumen
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="mb-4 flex items-center space-x-2">
              <Badge>{dokumen.category}</Badge>
              <Badge variant="outline">{dokumen.fileType}</Badge>
            </div>
            <h1 className="mb-4 text-3xl font-bold">{dokumen.title}</h1>
          </div>

          <div className="mb-8 rounded-lg border bg-muted/50 p-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <FileType className="h-20 w-20 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">Preview Dokumen</p>
                <p className="text-sm text-muted-foreground">
                  {dokumen.fileType} • {dokumen.fileSize}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Eye className="mr-2 h-4 w-4" />
                  Buka Preview
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold">Tentang Dokumen</h2>
            <p className="mb-4 text-muted-foreground">
              Dokumen ini merupakan bagian dari komitmen kami untuk transparansi dan akuntabilitas
              publik. Semua dokumen telah melalui proses verifikasi dan dapat diakses oleh
              masyarakat umum.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Isi Dokumen</h3>
            <p className="mb-4 text-muted-foreground">
              Dokumen ini berisi informasi penting terkait kebijakan dan pelaksanaan program.
              Mohon membaca dengan seksama sebelum menggunakan informasi yang terkandung di
              dalamnya.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold">Cara Menggunakan</h3>
            <ol className="mb-6 list-inside list-decimal space-y-2 text-muted-foreground">
              <li>Klik tombol download untuk mengunduh dokumen</li>
              <li>Gunakan PDF reader untuk membuka dokumen</li>
              <li>Baca dan pahami isi dokumen dengan baik</li>
              <li>Hubungi kami jika ada pertanyaan</li>
            </ol>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileType className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Jenis File</p>
                  <p className="text-sm text-muted-foreground">{dokumen.fileType}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <HardDrive className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Ukuran File</p>
                  <p className="text-sm text-muted-foreground">{dokumen.fileSize}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Upload</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(dokumen.uploadDate).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Download className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Total Download</p>
                  <p className="text-sm text-muted-foreground">{dokumen.downloads} kali</p>
                </div>
              </div>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Dokumen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
