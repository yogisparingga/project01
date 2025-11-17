import Link from "next/link";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pengumumanData } from "@/data/mock-data";

export default function PengumumanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Pengumuman</h1>
            <p className="text-muted-foreground">
              Informasi dan berita terkini
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pengumumanData.map((item) => (
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
              <CardDescription className="line-clamp-3">
                {item.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href={`/pengumuman/${item.id}`}>
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
