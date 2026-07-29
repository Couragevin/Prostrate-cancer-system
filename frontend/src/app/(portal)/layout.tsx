"use client";

import { Sidebar } from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Header & Sidebar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-card border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">ProsCancX</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-muted text-foreground rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r border-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div onClick={() => setOpen(false)} className="h-full">
               {/* Pass a relative/static positioned className so Sidebar fills the Sheet cleanly */}
               <Sidebar className="relative w-full border-r-0 shadow-none" />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="md:ml-64 flex flex-col flex-1 min-h-screen">
        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
