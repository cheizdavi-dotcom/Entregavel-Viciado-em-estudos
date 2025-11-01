'use client';

import { useAuth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProgress } from '@/hooks/useProgress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function SettingsPage() {
    const { user, signOut } = useAuth();
    const { resetAllProgress } = useProgress();
    const { toast } = useToast();

    const handleSignOut = async () => {
        await signOut();
        toast({ title: "Você saiu da sua conta." });
    };

    const handleResetProgress = async () => {
        await resetAllProgress();
        toast({ title: "Seu progresso foi resetado!", description: "Você pode começar o curso do zero." });
    };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Ajustes
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas preferências e sua conta.
        </p>
      </header>

      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Informações da sua conta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nome</span>
                    <span>{user?.displayName ?? 'Convidado'}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Email</span>
                    <span>{user?.isAnonymous ? 'Não aplicável' : user?.email}</span>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="w-full">
                    Sair da Conta
                </Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Progresso</CardTitle>
                <CardDescription>Gerencie seus dados de progresso no curso.</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                        Resetar Todo o Progresso
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Todo o seu progresso nas aulas será permanentemente apagado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetProgress}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
