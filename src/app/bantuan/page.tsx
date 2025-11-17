import { HelpCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BantuanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Bantuan & Kontak</h1>
            <p className="text-muted-foreground">
              Hubungi kami untuk informasi lebih lanjut
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nama Lengkap
                    </label>
                    <Input id="name" placeholder="Masukkan nama Anda" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Nomor Telepon
                  </label>
                  <Input id="phone" type="tel" placeholder="08123456789" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subjek
                  </label>
                  <Input id="subject" placeholder="Subjek pesan" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tuliskan pesan Anda di sini..."
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>FAQ - Pertanyaan Umum</CardTitle>
              <CardDescription>Jawaban untuk pertanyaan yang sering diajukan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Bagaimana cara mengakses data?</h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat mengakses data melalui menu Data Sectoral. Pilih kategori yang
                  diinginkan dan download dalam format yang tersedia.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Apakah data dapat digunakan untuk penelitian?</h3>
                <p className="text-sm text-muted-foreground">
                  Ya, semua data yang tersedia dapat digunakan untuk keperluan penelitian dengan
                  mencantumkan sumber yang jelas.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">
                  Bagaimana cara melaporkan masalah atau keluhan?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat menggunakan fitur Pelaporan untuk menyampaikan masalah atau keluhan.
                  Tim kami akan segera menindaklanjuti.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Berapa lama waktu respons untuk laporan?</h3>
                <p className="text-sm text-muted-foreground">
                  Kami berusaha merespons setiap laporan dalam waktu maksimal 2x24 jam kerja.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-sm text-muted-foreground">
                    Jl. Merdeka No. 123
                    <br />
                    Jakarta Pusat, 10110
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-sm text-muted-foreground">(021) 1234-5678</p>
                  <p className="text-sm text-muted-foreground">0800-1234-567 (Toll Free)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">info@portaldata.go.id</p>
                  <p className="text-sm text-muted-foreground">support@portaldata.go.id</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jam Operasional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Senin - Jumat</span>
                <span className="font-medium">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sabtu</span>
                <span className="font-medium">08:00 - 12:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minggu & Libur</span>
                <span className="font-medium">Tutup</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lokasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
                {/* In production, you would embed Google Maps here */}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Buka di Google Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
