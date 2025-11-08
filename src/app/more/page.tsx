'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Download, LifeBuoy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { moreContent } from "@/lib/bonus-codes";
import Link from "next/link";
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
import { useProgress } from "@/hooks/useProgress.tsx";
import { useToast } from "@/hooks/use-toast";


export default function MorePage() {
  const supportEmail = "metodoviciadonosestudos@gmail.com";
  const { resetAllProgress } = useProgress();
  const { toast } = useToast();

  const handleReset = () => {
    resetAllProgress();
    toast({
      title: "Progresso Resetado",
      description: "Todo o seu progresso de aulas foi apagado.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
          Mais Conteúdos
        </h1>
        <p className="text-muted-foreground mt-2">
          Materiais de apoio e suporte para sua jornada.
        </p>
      </header>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground mb-4">Opções e Suporte</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                      <span>Suporte ao Aluno</span>
                  </CardTitle>
                  <CardDescription>Precisa de ajuda ou tem alguma dúvida? Fale com nossa equipe.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full sm:w-auto">
                    <a href={`mailto:${supportEmail}`}>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      Entrar em Contato
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Card className="hover:bg-accent/50 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>Resetar Progresso</span>
                        </CardTitle>
                        <CardDescription>Apagar todo o seu histórico de aulas assistidas e recomeçar do zero.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button variant="destructive">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Resetar
                          </Button>
                      </CardContent>
                    </Card>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá apagar permanentemente
                        todo o seu progresso de aulas assistidas e você terá que recomeçar do Módulo 1.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleReset}>Sim, quero resetar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>

           </div>
        </section>

        {moreContent.length > 0 && (
          <section>
             <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground mb-4">Materiais Gratuitos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {moreContent.map(item => {
                    const isInternalLink = item.href.startsWith('/');
                    return (
                    <Card key={item.id}>
                        <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>{item.title}</span>
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        {isInternalLink ? (
                            <Button asChild className="w-full">
                                <Link href={item.href}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Acessar
                                </Link>
                            </Button>
                        ) : (
                            <Button asChild className="w-full">
                                <a 
                                href={item.href}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                >
                                <Download className="mr-2 h-4 w-4" />
                                {item.type === 'PDF' ? 'Baixar' : 'Acessar'}
                                </a>
                            </Button>
                        )}
                        </CardContent>
                    </Card>
                    )
                })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
