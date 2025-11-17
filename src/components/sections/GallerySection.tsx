import Link from "next/link";
import { Image as ImageIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryData } from "@/data/mock-data";

export default function GallerySection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Galeri Foto</h2>
              <p className="text-muted-foreground">Dokumentasi kegiatan</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <div className="flex items-center text-xs text-white/80">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
