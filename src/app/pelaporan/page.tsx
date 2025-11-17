import Link from "next/link";
import { Flag, Calendar, User, ArrowRight, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pelaporanData } from "@/data/mock-data";

const statusColors = {
  "Dalam Proses": "default",
  Selesai: "secondary",
  Menunggu: "outline",
} as const;

const priorityColors = {
  Tinggi: "destructive",
  Sedang: "default",
  Rendah: "secondary",
} as const;

export default function PelaporanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Flag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Pelaporan</h1>
              <p className="text-muted-foreground">
                Sampaikan laporan dan keluhan Anda
              </p>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Laporan Baru
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pelaporanData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {pelaporanData.filter((p) => p.status === "Dalam Proses").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {pelaporanData.filter((p) => p.status === "Selesai").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {pelaporanData.map((item) => (
          <Card key={item.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant={statusColors[item.status as keyof typeof statusColors]}>
                      {item.status}
                    </Badge>
                    <Badge variant={priorityColors[item.priority as keyof typeof priorityColors]}>
                      {item.priority}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {item.reporter}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(item.date).toLocaleDateString("id-ID")}
                    </span>
                  </CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/pelaporan/${item.id}`}>
                    Lihat Detail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
