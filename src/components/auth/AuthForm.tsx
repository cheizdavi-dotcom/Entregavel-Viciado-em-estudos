'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInAnonymously } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAnonymousLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      toast({ title: 'Tudo pronto. Vamos começar!' });
      router.push('/app');
    } catch (e: any) {
      console.error("Firebase Anonymous Auth Error:", e);
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível iniciar sua sessão. Verifique sua conexão ou as configurações do Firebase.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-2xl">O Fim da Procrastinação</CardTitle>
        <CardDescription>
          Sua jornada para vencer a procrastinação começa agora.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
            <Button onClick={handleAnonymousLogin} disabled={loading} size="lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Iniciar Jornada
            </Button>
            <p className="text-xs text-muted-foreground">
                Ao continuar, seu progresso será salvo anonimamente neste navegador.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
