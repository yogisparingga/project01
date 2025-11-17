import Link from "next/link";
import { Briefcase, ArrowRight, Users, FileCheck, MessageSquare, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { layananData } from "@/data/mock-data";

const iconMap: { [key: string]: any } = {
  Users,
  FileCheck,
  MessageSquare,
  Info,
};

export default function LayananSection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Layanan</h2>
              <p className="text-muted-foreground">Layanan publik yang tersedia</p>
            </div>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/layanan">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {layananData.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Card key={item.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" asChild className="p-0">
                    <Link href={item.link}>
                      Akses Layanan
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/layanan">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
