import Link from "next/link";
import { Camera, MapPin, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cctvData } from "@/data/mock-data";

export default function CCTVPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Camera className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">CCTV Monitoring</h1>
            <p className="text-muted-foreground">
              Sistem pemantauan keamanan kota
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total CCTV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cctvData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {cctvData.filter((c) => c.status === "Online").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {cctvData.filter((c) => c.status === "Offline").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Aktif</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cctvData.map((item) => (
          <Card key={item.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <Badge variant={item.status === "Online" ? "default" : "destructive"}>
                  <Circle className="mr-1 h-3 w-3 fill-current" />
                  {item.status}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2">{item.name}</CardTitle>
              <CardDescription>
                <div className="flex items-start text-sm">
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-2">{item.location}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/cctv/${item.id}`}>
                  Lihat Live Stream
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
