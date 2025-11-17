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

export default function LayananPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Layanan</h1>
            <p className="text-muted-foreground">
              Semua layanan publik yang tersedia untuk Anda
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {layananData.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Card
              key={item.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/layanan/${item.id}`}>
                    Akses Layanan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
