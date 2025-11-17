import Link from "next/link";
import { FileText, Download, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dokumenData } from "@/data/mock-data";

export default function DokumenPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Dokumen</h1>
            <p className="text-muted-foreground">
              Dokumen publik dan regulasi
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer">Semua</Badge>
        <Badge variant="outline" className="cursor-pointer">Peraturan</Badge>
        <Badge variant="outline" className="cursor-pointer">Laporan</Badge>
        <Badge variant="outline" className="cursor-pointer">Perencanaan</Badge>
      </div>

      <div className="space-y-4">
        {dokumenData.map((item) => (
          <Card key={item.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-2">
                    <Badge>{item.category}</Badge>
                    <Badge variant="outline">{item.fileType}</Badge>
                  </div>
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(item.uploadDate).toLocaleDateString("id-ID")}
                    </span>
                    <span>Ukuran: {item.fileSize}</span>
                    <span className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      {item.downloads} downloads
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dokumen/${item.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Lihat
                    </Link>
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
