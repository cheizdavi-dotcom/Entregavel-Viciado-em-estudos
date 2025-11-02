'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Download, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { bonusContent, bonusCodes } from "@/lib/bonus-codes";
import { cn } from "@/lib/utils";

const UNLOCKED_CODES_KEY = 'unlockedBonusCodes';

export default function BonusPage() {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

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
    // Remove spaces, dots, and normalize to uppercase to make the check more robust.
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
  
  const isBonusUnlocked = (bonusId: string | number): boolean => {
    if (!isClient) return false;
    const bonus = bonusContent.find(b => b.id === bonusId);
    if (!bonus?.requiredCode) return false;
    return unlockedCodes.includes(bonus.requiredCode);
  }

  const unlockableContent = bonusContent.filter(item => item.requiredCode);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Conteúdos Bônus
        </h1>
        <p className="text-muted-foreground mt-2">
          Desbloqueie aqui os materiais exclusivos que você adquiriu.
        </p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Desbloquear Bônus</CardTitle>
          <CardDescription>Comprou um produto extra? Insira o código que você recebeu por e-mail para liberá-lo.</CardDescription>
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
        </CardContent>
      </Card>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockableContent.map(item => {
            const isUnlocked = isClient && isBonusUnlocked(item.id);
            return (
              <Card key={item.id} className="relative overflow-hidden">
                <div className={cn(!isUnlocked && 'blur-[2px] pointer-events-none')}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" disabled={!isUnlocked}>
                      <a 
                        href={isUnlocked ? item.href : '#'}
                        target="_blank" 
                        rel="noopener noreferrer" 
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {item.type === 'PDF' ? 'Baixar' : 'Acessar'}
                      </a>
                    </Button>
                  </CardContent>
                </div>
                 {!isUnlocked && isClient && (
                  <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                    <Lock className="h-8 w-8 text-foreground" />
                    <p className="mt-2 font-semibold text-foreground">Bloqueado</p>
                    <p className="text-xs text-muted-foreground">Insira o código para liberar</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
    </div>
  );
}
