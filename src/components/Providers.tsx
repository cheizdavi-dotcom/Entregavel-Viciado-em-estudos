"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase/config";

// Inicializa o Firebase de forma segura no lado do cliente
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
