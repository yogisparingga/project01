import Link from "next/link";
import { ArrowLeft, MapPin, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cctvData } from "@/data/mock-data";

export default async function CCTVDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cctv = cctvData.find((item) => item.id === parseInt(id));
  if (!cctv) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">CCTV tidak ditemukan</h1>
          <Button asChild className="mt-4">
            <Link href="/cctv">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke CCTV
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/cctv">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke CCTV
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="mb-4">
              <Badge variant={cctv.status === "Online" ? "default" : "destructive"}>
                <Circle className="mr-1 h-3 w-3 fill-current" />
                {cctv.status}
              </Badge>
            </div>
            <h1 className="mb-2 text-3xl font-bold">{cctv.name}</h1>
            <div className="flex items-start text-muted-foreground">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{cctv.location}</span>
            </div>
          </div>

          {cctv.status === "Online" ? (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-black">
              <div className="flex h-full items-center justify-center text-white">
                <p className="text-lg">Live Stream CCTV</p>
                {/* In production, you would embed actual stream here */}
                {/* <iframe
                  src={cctv.streamUrl}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                /> */}
              </div>
            </div>
          ) : (
            <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
              <div className="text-center">
                <Circle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-semibold">CCTV Offline</p>
                <p className="text-sm text-muted-foreground">
                  Kamera sedang tidak aktif atau dalam pemeliharaan
                </p>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Informasi CCTV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Nama Lokasi</p>
                <p className="text-sm text-muted-foreground">{cctv.name}</p>
              </div>
              <div>
                <p className="font-medium">Alamat</p>
                <p className="text-sm text-muted-foreground">{cctv.location}</p>
              </div>
              <div>
                <p className="font-medium">Status Operasional</p>
                <Badge variant={cctv.status === "Online" ? "default" : "destructive"}>
                  {cctv.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Kontrol</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" disabled={cctv.status === "Offline"}>
                Refresh Stream
              </Button>
              <Button variant="outline" className="w-full">
                Lihat di Peta
              </Button>
              <Button variant="outline" className="w-full">
                Laporkan Masalah
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>CCTV Terdekat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cctvData
                .filter((c) => c.id !== cctv.id)
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/cctv/${c.id}`}
                    className="block rounded-md border p-3 transition-colors hover:bg-accent"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-medium">{c.name}</p>
                      <Badge
                        variant={c.status === "Online" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {c.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.location}</p>
                  </Link>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
