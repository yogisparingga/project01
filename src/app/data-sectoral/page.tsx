import Link from "next/link";
import { Database, ArrowRight, Calendar, Heart, GraduationCap, TrendingUp, Building } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dataSectoralData } from "@/data/mock-data";

const iconMap: { [key: string]: any } = {
  Heart,
  GraduationCap,
  TrendingUp,
  Building,
};

export default function DataSectoralPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Data Sectoral</h1>
            <p className="text-muted-foreground">
              Data dan statistik berbagai sektor pembangunan
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dataSectoralData.map((item) => {
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Data</p>
                    <p className="text-lg font-bold">{item.records}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Update</p>
                    <p className="text-sm font-medium">
                      {new Date(item.lastUpdate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/data-sectoral/${item.id}`}>
                    Lihat Data
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
