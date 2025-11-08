
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
import { useMemo } from 'react';
import { Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function AppPage() {
  const { progress, loading } = useProgress();

  const totalLessons = useMemo(() => lessons.filter(l => !l.moduleId.startsWith('bonus-')).length, []);
  
  const completedLessons = useMemo(() => {
    if (loading) return 0;
    return Object.entries(progress)
      .filter(([lessonId, p]) => {
        const lesson = lessons.find(l => l.id === lessonId);
        return lesson && !lesson.moduleId.startsWith('bonus-') && p.completed;
      })
      .length;
  }, [progress, loading]);

  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  const lastWatchedLessonModuleId = useMemo(() => {
    if (loading || Object.keys(progress).length === 0) return null;
    
    const allProgress = Object.entries(progress)
      .map(([lessonId, prog]) => ({ lessonId, ...prog }))
      // Filtra progresso de bônus para não aparecer no "Continuar de onde parou"
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

    if (loading) {
        return regularModules.map(m => ({ ...m, isUnlocked: m.order === 1 }));
    }

    const moduleCompletionStatus: { [key: string]: boolean } = {};
    for (const module of regularModules) {
        const moduleLessons = lessons.filter(l => l.moduleId === module.id);
        if (moduleLessons.length === 0) {
            // Módulo sem aulas não pode ser "completo" para desbloquear outros.
            moduleCompletionStatus[module.id] = false; 
            continue;
        }
        const completedLessonsCount = moduleLessons.filter(l => progress[l.id]?.completed).length;
        moduleCompletionStatus[module.id] = completedLessonsCount === moduleLessons.length;
    }
    
    return regularModules.map((module) => {
        let isUnlocked = false;
        if (module.order === 1) {
            isUnlocked = true;
        } else {
            const prevModule = regularModules.find(m => m.order === module.order - 1);
            // Só desbloqueia se o módulo anterior existir E estiver completo
            if (prevModule && moduleCompletionStatus[prevModule.id]) {
                isUnlocked = true;
            }
        }
        return {
            ...module,
            isUnlocked,
        };
    });
      
  }, [progress, loading]);


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
                                  'object-cover w-full h-full object-top',
                                  !module.isUnlocked && 'grayscale'
                                )}
                                data-ai-hint="course module"
                              />
                              {!module.isUnlocked && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <Lock className="w-16 h-16 text-white/80" />
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
                      <p>Complete os módulos anteriores para desbloquear</p>
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
