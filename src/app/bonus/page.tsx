'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Lock, Unlock, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { bonusContent, bonusCodes } from "@/lib/bonus-codes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const UNLOCKED_CODES_KEY = 'unlockedBonusCodes';

export default function BonusPage() {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const supportEmail = "metodoviciadonosestudos@gmail.com";

  useEffect(() => {
    setIsClient(true);
    try {
      const storedCodes = localStorage.getItem(UNLOCKED_CODES_KEY);
      if (storedCodes) {
        setUnlockedCodes(JSON.parse(storedCodes));
      }
    } catch (error) {
      console.error("Failed to load unlocked codes from localStorage", error);
    }
  }, []);

  const handleUnlock = () => {
    const cleanInput = (str: string) => str.replace(/[\s.-]/g, '').toUpperCase();
    
    const code = cleanInput(inputValue);
    if (!code) return;

    const validCode = bonusCodes.find(c => cleanInput(c.code) === code);

    if (validCode) {
      if (unlockedCodes.includes(validCode.code)) {
        toast({
          title: "Código já utilizado",
          description: "Este conteúdo bônus já foi desbloqueado.",
        });
      } else {
        const newUnlockedCodes = [...unlockedCodes, validCode.code];
        setUnlockedCodes(newUnlockedCodes);
        try {
          localStorage.setItem(UNLOCKED_CODES_KEY, JSON.stringify(newUnlockedCodes));
          toast({
            title: "Conteúdo Desbloqueado!",
            description: `Você liberou: ${validCode.name}.`,
            variant: 'default',
            className: 'bg-primary text-primary-foreground',
          });
        } catch (error) {
           console.error("Failed to save unlocked codes to localStorage", error);
           toast({
             title: "Erro ao salvar",
             description: "Não foi possível salvar seu progresso. Tente novamente.",
             variant: "destructive",
           });
        }
      }
      setInputValue('');
    } else {
      toast({
        title: "Código Inválido",
        description: "Por favor, verifique o código e tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const getBonusStatus = (bonusId: string): { isUnlocked: boolean; isReleased: boolean; releaseDateFormatted: string | null } => {
    if (!isClient) return { isUnlocked: false, isReleased: false, releaseDateFormatted: null };
    
    const bonus = bonusContent.find(b => b.id === bonusId);
    if (!bonus) return { isUnlocked: false, isReleased: false, releaseDateFormatted: null };

    const isUnlocked = bonus.requiredCode ? unlockedCodes.includes(bonus.requiredCode) : false;
    
    let isReleased = true;
    let releaseDateFormatted = null;

    if (bonus.releaseDate) {
      // releaseDate is 'YYYY-MM-DD', needs to be compared at midnight UTC
      const releaseDateTime = new Date(`${bonus.releaseDate}T00:00:00Z`);
      const now = new Date();
      isReleased = now >= releaseDateTime;
      releaseDateFormatted = format(releaseDateTime, "dd 'de' MMMM", { locale: ptBR });
    }

    return { isUnlocked, isReleased, releaseDateFormatted };
  }

  const unlockableContent = bonusContent.filter(item => item.requiredCode);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
          Conteúdos Bônus
        </h1>
        <p className="text-muted-foreground mt-2">
          Desbloqueie aqui os materiais exclusivos que você adquiriu.
        </p>
      </header>

      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Desbloquear Bônus</CardTitle>
          <CardDescription>Insira o código que você recebeu por e-mail para liberar o seu acesso.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              placeholder="Digite seu código de acesso"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleUnlock()}
            />
            <Button onClick={handleUnlock} className="sm:w-auto w-full">
              <Unlock className="mr-2 h-4 w-4" />
              Desbloquear
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
            Comprou e não recebeu o código?{" "}
            <a href={`mailto:${supportEmail}`} className="underline hover:text-foreground">
                Envie um e-mail para nós.
            </a>
          </p>
        </CardContent>
      </Card>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {unlockableContent.map(item => {
            if (!isClient) {
              return (
                <div key={item.id}>
                  <Card className="relative overflow-hidden">
                    <CardContent className="relative flex aspect-[1080/1350] items-center justify-center p-0">
                      <div className="w-full h-full bg-muted animate-pulse" />
                    </CardContent>
                  </Card>
                   <div className="mt-2 h-5 w-3/4 mx-auto bg-muted animate-pulse rounded-md" />
                   <div className="mt-1 h-4 w-1/2 mx-auto bg-muted animate-pulse rounded-md" />
                </div>
              );
            }
            
            const { isUnlocked, isReleased, releaseDateFormatted } = getBonusStatus(item.id);
            const isAccessible = isUnlocked && isReleased;

            // Define o link correto: para o módulo se for um bônus com aulas, ou para o vídeo único
            const href = item.moduleId ? `/module/${item.moduleId}` : `/bonus/${item.id}`;

            const cardContent = (
                <Card className="relative overflow-hidden transition-transform hover:scale-105 group">
                    <CardContent className="relative flex aspect-[1080/1350] items-center justify-center p-0">
                    <Image
                        src={item.coverUrl}
                        alt={item.title}
                        width={1080}
                        height={1350}
                        className={cn(
                        'object-cover w-full h-full',
                        !isUnlocked && 'grayscale'
                        )}
                        data-ai-hint="course bonus"
                    />
                     {isClient && !isUnlocked && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                            <Lock className="h-8 w-8 text-foreground" />
                            <p className="mt-2 font-semibold text-foreground">Bloqueado</p>
                            <p className="text-xs text-muted-foreground mt-2">Insira o código para liberar</p>
                        </div>
                    )}
                    {isClient && isUnlocked && !isReleased && (
                       <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                            <CalendarClock className="h-8 w-8 text-foreground" />
                            <p className="mt-2 font-semibold text-foreground">Em breve</p>
                            {releaseDateFormatted && <p className="text-xs text-muted-foreground">Lançamento em {releaseDateFormatted}</p>}
                        </div>
                    )}
                    </CardContent>
                </Card>
            );

            return (
              <div key={item.id}>
                {isAccessible ? (
                  <Link href={href} aria-disabled={!isAccessible} className={cn(!isAccessible && 'pointer-events-none')}>
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
                <div className="mt-2 text-center">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  );
}
