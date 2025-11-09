'use client';

import {
  Home,
  PlaySquare,
  LayoutGrid,
  Info,
  Star,
  Mic,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Principal', icon: Home },
  { href: '/continue', label: 'Continuar', icon: PlaySquare },
  { href: '/podcasts', label: 'Podcasts', icon: Mic },
  { href: '/bonus', label: 'Bônus', icon: Star },
  { href: '/more', label: 'Mais', icon: LayoutGrid },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image src="https://i.imgur.com/9Nv3sGO.png" alt="Logo" width={28} height={28} />
          <span className="font-bold text-lg">O Fim da Procrastinação</span>
        </div>
      </header>
      <main className="flex-1 pb-20">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-sm">
        <nav className="grid h-16 items-center grid-cols-5 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 text-xs font-medium',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
