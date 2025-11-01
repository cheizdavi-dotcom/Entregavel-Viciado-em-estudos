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
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AppPage() {
  const { progress, loading } = useProgress();

  const modulesWithProgress = useMemo(() => {
    if (loading) return modules.map(m => ({...m, isUnlocked: false, isModuleCompleted: false})).sort((a,b) => a.order - b.order);
    
    let allPreviousModulesCompleted = true;

    return modules.sort((a,b) => a.order - b.order).map((module) => {
      const moduleLessons = lessons.filter((l) => l.moduleId === module.id);
      const completedLessons = moduleLessons.filter(
        (l) => progress[l.id]?.completed
      );
      const isModuleCompleted = moduleLessons.length > 0 && completedLessons.length === moduleLessons.length;
      
      const isUnlocked = allPreviousModulesCompleted;
      
      // For the next module in line, this module must be complete.
      if (isModuleCompleted === false) {
        allPreviousModulesCompleted = false;
      }

      return {
        ...module,
        isUnlocked,
        isModuleCompleted,
      };
    });
  }, [progress, loading]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><p>Carregando...</p></div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Principal
        </h1>
        <p className="text-muted-foreground mt-2">
          Comece sua jornada para o fim da procrastinação.
        </p>
      </header>

      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          <TooltipProvider>
            {modulesWithProgress.map((module) => (
              <CarouselItem
                key={module.id}
                className={cn(
                  'basis-full pl-2 sm:pl-4',
                  'sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
                )}
              >
                <Tooltip>
                  <TooltipTrigger asChild disabled={module.isUnlocked}>
                    <div className={cn(!module.isUnlocked && "pointer-events-none")}>
                        <Link href={module.isUnlocked ? `/module/${module.id}` : '#'} aria-disabled={!module.isUnlocked}>
                          <div className="p-1">
                            <Card className="overflow-hidden rounded-lg">
                              <CardContent className="relative flex aspect-[1080/1600] items-center justify-center p-0">
                                <Image
                                  src={module.coverUrl}
                                  alt={module.title}
                                  width={1080}
                                  height={1600}
                                  className={cn("object-cover w-full h-full", !module.isUnlocked && "grayscale")}
                                  data-ai-hint="course module"
                                />
                                {!module.isUnlocked && (
                                    <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                                        <Lock className='w-16 h-16 text-white/80'/>
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
                      <p>Complete o módulo anterior para desbloquear</p>
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
