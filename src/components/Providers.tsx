"use client";

import type { ReactNode } from "react";
import { app } from "@/lib/firebase"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { AuthProvider } from "@/lib/firebase/auth.tsx";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
