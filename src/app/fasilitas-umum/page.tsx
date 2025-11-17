import Link from "next/link";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fasilitasData } from "@/data/mock-data";

export default function FasilitasUmumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Fasilitas Umum</h1>
            <p className="text-muted-foreground">
              Daftar fasilitas publik yang tersedia
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fasilitasData.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <CardHeader>
              <div className="mb-2">
                <Badge>{item.category}</Badge>
              </div>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-2">{item.location}</span>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/fasilitas-umum/${item.id}`}>
                  Lihat Detail
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
