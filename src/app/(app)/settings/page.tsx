"use client";

import { useAuth } from "@/lib/firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, User as UserIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleResetProgress = async () => {
    if (!user) return;
    setIsResetting(true);
    try {
      const progressQuery = query(collection(db, "userProgress"), where("userId", "==", user.uid));
      const snapshot = await getDocs(progressQuery);
      
      if (snapshot.empty) {
        toast({ title: "Nenhum progresso para resetar." });
        return;
      }

      const batch = writeBatch(db);
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      toast({
        title: "Sucesso!",
        description: "Seu progresso foi resetado.",
      });

    } catch (error) {
      console.error("Error resetting progress:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível resetar seu progresso. Tente novamente.",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight mb-8">
        Ajustes
      </h1>
      <div className="space-y-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Suas informações de conta.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.photoURL ?? undefined} />
              <AvatarFallback>
                {user?.isAnonymous ? <UserIcon /> : user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">
                {user?.isAnonymous ? "Usuário Convidado" : user?.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.isAnonymous ? "Crie uma conta para salvar seu progresso." : "Membro"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Ações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full justify-start gap-2">
                        <Trash2 className="w-4 h-4"/>
                        Resetar Progresso
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Todo o seu progresso de visualização
                        será permanentemente excluído.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetProgress} disabled={isResetting}>
                        {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sim, resetar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button onClick={handleSignOut} variant="outline" className="w-full justify-start gap-2">
                    <LogOut className="w-4 h-4" />
                    Sair
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
