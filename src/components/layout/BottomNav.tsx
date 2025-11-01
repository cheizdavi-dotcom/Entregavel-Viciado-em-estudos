"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, LayoutGrid, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Principal", icon: Home },
  { href: "/continue", label: "Continuar", icon: PlaySquare },
  { href: "/more", label: "Mais", icon: LayoutGrid },
  { href: "/settings", label: "Ajustes", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 text-muted-foreground hover:bg-muted/50"
            >
              <item.icon
                className={cn(
                  "h-6 w-6 mb-1",
                  isActive ? "text-primary" : "text-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
