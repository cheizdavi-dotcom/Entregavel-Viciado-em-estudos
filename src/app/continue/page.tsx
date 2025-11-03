'use client';

import { useProgress } from '@/hooks/useProgress.tsx';
import { lessons } from '@/lib/seed';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';
import { useMemo } from 'react';

export default function ContinuePage() {
  const { progress, loading } = useProgress();

  const lessonsInProgress = useMemo(() => {
    if (loading) return [];
    return lessons
      .map(lesson => {
        const lessonProgress = progress[lesson.id];
        if (lessonProgress && !lessonProgress.completed) {
          return {
            ...lesson,
            progress: lessonProgress,
            progressPercentage: (lessonProgress.watchedSeconds / lesson.durationSec) * 100
          };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b!.progress.updatedAt.getTime() - a!.progress.updatedAt.getTime());
  }, [progress, loading]);

  if (loading) {
    return <div className="container mx-auto p-4"><p>Carregando seu progresso...</p></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
          Continuar Assistindo
        </h1>
        <p className="text-muted-foreground mt-2">
          Volte de onde você parou.
        </p>
      </header>

      {lessonsInProgress.length === 0 ? (
        <div className="text-center py-10 sm:py-16">
          <p className="text-muted-foreground">Você ainda não começou nenhuma aula.</p>
          <Button asChild className="mt-4">
            <Link href="/">Ver módulos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {lessonsInProgress.map(lesson => lesson && (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={lesson.progressPercentage} className="w-full h-2 mb-4" />
                <Button asChild className="w-full">
                  <Link href={`/module/${lesson.moduleId}`}>
                    <Play className="mr-2 h-4 w-4" /> Retomar Aula
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
