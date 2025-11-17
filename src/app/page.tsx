
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { lessons, modules } from '@/lib/seed';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress.tsx';
import { useMemo, useState, useEffect } from 'react';
import { Lock, PlayCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AppPage() {
  const { progress, loading } = useProgress();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalLessons = useMemo(() => lessons.filter(l => !l.moduleId.startsWith('bonus-')).length, []);
  
  const completedLessonsCount = useMemo(() => {
    if (loading) return 0;
    return Object.values(progress).filter(p => p.completed).length;
  }, [progress, loading]);

  const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;
  
  const lastWatchedLessonModuleId = useMemo(() => {
    if (loading || Object.keys(progress).length === 0) return null;
    
    const allProgress = Object.entries(progress)
      .map(([lessonId, prog]) => ({ lessonId, ...prog, updatedAt: new Date(prog.updatedAt) }))
      .filter(({lessonId}) => {
        const lesson = lessons.find(l => l.id === lessonId);
        return lesson && !lesson.moduleId.startsWith('bonus-');
      })
      .sort((a,b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    if (allProgress.length > 0) {
      const lastLessonId = allProgress[0].lessonId;
      const lastLesson = lessons.find(l => l.id === lastLessonId);
      return lastLesson?.moduleId;
    }
    return null;
  }, [progress, loading]);

  const modulesWithProgress = useMemo(() => {
    const regularModules = modules.filter(m => !m.isBonus).sort((a, b) => a.order - b.order);

    if (loading || !isClient) {
      return regularModules.map(module => ({
        ...module,
        isUnlocked: false,
      }));
    }

    let previousModuleCompleted = true; // Module 1 is always unlocked

    return regularModules.map(module => {
      // Módulo 5 está sempre desbloqueado
      if (module.id === '5') {
        return { ...module, isUnlocked: true };
      }

      // Módulo 1 está sempre desbloqueado
      const isUnlocked = module.order === 1 || previousModuleCompleted;

      // Verifica o status de conclusão do módulo ATUAL para a PRÓXIMA iteração
      const moduleLessons = lessons.filter(l => l.moduleId === module.id);
      const completedLessonsInModule = moduleLessons.every(l => progress[l.id]?.completed);
      
      // O PRÓXIMO módulo será desbloqueável se o ATUAL estiver desbloqueado e concluído.
      previousModuleCompleted = isUnlocked && completedLessonsInModule;

      return { ...module, isUnlocked };
    });
  }, [progress, loading, isClient]);


  if (loading) {
    return (
      <div className="container mx-auto p-4 md:px-6 md:py-8">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:px-6 md:py-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
          Boas-vindas à sua jornada!
        </h1>
        <p className="text-muted-foreground mt-2">
          Seu caminho para o fim da procrastinação começa agora.
        </p>
      </header>

      <div className="mb-6 md:mb-8">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Boas-vindas!</AlertTitle>
          <AlertDescription>
            Os módulos são liberados progressivamente. Mergulhe no conteúdo já disponível e prepare-se para as próximas aulas!
          </AlertDescription>
        </Alert>
      </div>

      <Card className="mb-6 md:mb-8">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Progresso Total</p>
                <div className="flex items-center gap-4">
                    <Progress value={overallProgress} className="h-2 w-full flex-1" />
                    <span className="text-sm font-bold text-foreground">{Math.round(overallProgress)}%</span>
                </div>
            </div>
            {lastWatchedLessonModuleId && (
                <Button asChild className="w-full sm:w-auto" size="sm">
                    <Link href={`/module/${lastWatchedLessonModuleId}`}>
                        <PlayCircle />
                        Continuar de onde parou
                    </Link>
                </Button>
            )}
          </div>
        </CardContent>
      </Card>


      <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground mb-4">
        Módulos do Curso
      </h2>

      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          <TooltipProvider>
            {modulesWithProgress.map((module) => (
              <CarouselItem
                key={module.id}
                className={cn(
                  'basis-1/2 pl-2 md:pl-4',
                  'sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
                )}
              >
                <Tooltip>
                  <TooltipTrigger asChild disabled={module.isUnlocked}>
                    <div className={cn(!module.isUnlocked && 'pointer-events-none')}>
                      <Link
                        href={module.isUnlocked ? `/module/${module.id}` : '#'}
                        aria-disabled={!module.isUnlocked}
                      >
                        <div className="p-1">
                          <Card className="overflow-hidden rounded-lg transition-transform hover:scale-105">
                            <CardContent className="relative flex aspect-[1080/1600] items-center justify-center p-0">
                              <Image
                                src={module.coverUrl}
                                alt={module.title}
                                width={1080}
                                height={1600}
                                className={cn(
                                  'object-cover w-full h-full object-center',
                                  !module.isUnlocked && 'grayscale'
                                )}
                                data-ai-hint="course module"
                              />
                              {!module.isUnlocked && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-2">
                                  <Lock className="w-12 h-12 text-white/80" />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                          <div className="mt-2 text-center">
                            <h3 className="font-semibold text-foreground truncate">
                              {module.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {module.subtitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </TooltipTrigger>
                  {!module.isUnlocked && (
                    <TooltipContent>
                       {module.releaseDate && module.id === '5'
                        ? <p>Lançamento em {new Date(`${module.releaseDate}T00:00:00Z`).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}</p>
                        : <p>Complete os módulos anteriores para desbloquear</p>
                       }
                    </TooltipContent>
                  )}
                </Tooltip>
              </CarouselItem>
            ))}
          </TooltipProvider>
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
