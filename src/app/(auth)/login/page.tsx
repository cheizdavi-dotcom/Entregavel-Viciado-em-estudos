'use client';

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/lib/firebase/auth.tsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/app');
        }
    }, [user, loading, router]);
    
    if(loading || user) {
        return null; // ou um spinner de carregamento
    }

    return <AuthForm />;
}
