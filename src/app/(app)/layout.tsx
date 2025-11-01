import { AuthGuard } from "@/components/auth/AuthGuard";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="relative flex min-h-screen w-full flex-col">
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
