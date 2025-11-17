"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Bell,
  Briefcase,
  Building2,
  Camera,
  Calendar,
  Database,
  FileText,
  HelpCircle,
  Flag
} from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Pengumuman", href: "/pengumuman", icon: Bell },
  { name: "Layanan", href: "/layanan", icon: Briefcase },
  { name: "Fasilitas Umum", href: "/fasilitas-umum", icon: Building2 },
  { name: "CCTV", href: "/cctv", icon: Camera },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Data Sectoral", href: "/data-sectoral", icon: Database },
  { name: "Dokumen", href: "/dokumen", icon: FileText },
  { name: "Pelaporan", href: "/pelaporan", icon: Flag },
  { name: "Bantuan", href: "/bantuan", icon: HelpCircle },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Database className="h-6 w-6" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              Portal Data
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {menuItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Dropdown untuk menu lainnya */}
            <div className="group relative">
              <button className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                <span>Lainnya</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {menuItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
