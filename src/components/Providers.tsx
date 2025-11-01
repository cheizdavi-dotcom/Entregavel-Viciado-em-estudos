"use client";

import type { ReactNode } from "react";
import { app } from "@/lib/firebase";

// This component now ensures that Firebase is initialized before any part of the
// app that might need it is rendered.
export function Providers({ children }: { children: ReactNode }) {
  // By initializing the app here at the root, we ensure it's ready.
  // The 'app' import triggers the initialization in firebase/index.ts
  return <>{children}</>;
}
