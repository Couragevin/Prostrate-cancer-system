"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TestTube,
  ShieldCheck,
  LogOut
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// Only routes that actually exist. Dashboard / Patients / Analytics / Reports /
// Settings were listed here but have no corresponding page, so all five 404'd.
// Add each back as its route lands.
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Risk Check", href: "/assessment", icon: TestTube },
];

export function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-40 shadow-sm ${className}`}>
      
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">ProsCancX</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Clinic Portal
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-600">
          <LogOut className="w-4 h-4" />
          Exit
        </Link>
      </div>

    </aside>
  );
}
