import Link from "next/link";
import { Bell, ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pengumumanData } from "@/data/mock-data";

export default function PengumumanSection() {
  const latestPengumuman = pengumumanData.slice(0, 3);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Pengumuman</h2>
              <p className="text-muted-foreground">Informasi dan berita terkini</p>
            </div>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/pengumuman">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPengumuman.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge>{item.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href={`/pengumuman/${item.id}`}>
                    Selengkapnya
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/pengumuman">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
