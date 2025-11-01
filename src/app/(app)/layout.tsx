'use client';

import { AppShell } from '@/components/layout/AppShell';
import { ProgressProvider } from '@/hooks/useProgress';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider>
        <AppShell>{children}</AppShell>
    </ProgressProvider>
  );
}
