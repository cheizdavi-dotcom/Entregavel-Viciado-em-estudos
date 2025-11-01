'use client';

import { lessons, modules } from '@/lib/seed';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { YouTubePlayer } from '@/components/player/YouTubePlayer';
import { useProgress } from '@/hooks/useProgress.tsx';
import { useState, useMemo, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function ModulePage({ params }: { params: { id: string } }) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { progress, saveProgress, getLessonProgress } = useProgress();

  const module = modules.find((m) => m.id === params.id);
  const moduleLessons = lessons.filter((l) => l.moduleId === params.id).sort((a,b) => a.order - b.order);

  const selectedLesson = useMemo(() => {
    return lessons.find((l) => l.id === selectedLessonId);
  }, [selectedLessonId]);
  
  // Effect to preload progress for lessons in this module
  useEffect(() => {
    moduleLessons.forEach(lesson => {
      getLessonProgress(lesson.id);
    });
  }, [moduleLessons, getLessonProgress]);

  const lastWatchedLesson = useMemo(() => {
    const watchedLessons = moduleLessons
      .map(l => {
          const prog = progress[l.id];
          return prog ? {...l, prog} : null;
      })
      .filter(Boolean)
      .sort((a,b) => b!.prog.updatedAt.getTime() - a!.prog.updatedAt.getTime());
    return watchedLessons.length > 0 ? watchedLessons[0] : null;
  }, [progress, moduleLessons]);

  useEffect(() => {
    if (!selectedLessonId && lastWatchedLesson) {
      setSelectedLessonId(lastWatchedLesson.id);
    } else if (!selectedLessonId && moduleLessons.length > 0) {
      setSelectedLessonId(moduleLessons[0].id);
    }
  }, [lastWatchedLesson, moduleLessons, selectedLessonId]);


  if (!module) {
    notFound();
  }

  const handleProgress = (lessonId: string) => (seconds: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const currentProgress = getLessonProgress(lessonId);
      // Mark as completed if 95% is watched, but only if not already completed
      const isCompleted = currentProgress?.completed || (seconds / lesson.durationSec) >= 0.95;
      saveProgress(lessonId, seconds, isCompleted);
    }
  };

  const handleCompleted = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
        // Ensure we don't overwrite watchedSeconds with full duration if user seeks
        const currentProgress = getLessonProgress(lessonId);
        const watchedSeconds = currentProgress?.watchedSeconds ?? lesson.durationSec;
        saveProgress(lessonId, Math.max(watchedSeconds, lesson.durationSec * 0.95), true);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {selectedLesson ? (
             <div>
                <div className="mb-4">
                    <YouTubePlayer 
                        key={selectedLesson.id}
                        youtubeId={selectedLesson.youtubeId}
                        onProgress={handleProgress(selectedLesson.id)}
                        onCompleted={() => handleCompleted(selectedLesson.id)}
                    />
                </div>
                <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
            </div>
          ) : (
             <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p>Selecione uma aula para começar.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {lastWatchedLesson && !lastWatchedLesson.prog.completed && (
                    <Button onClick={() => setSelectedLessonId(lastWatchedLesson.id)} className='mb-4'>
                        Continuar de onde parei
                    </Button>
                )}
              {moduleLessons.map((lesson) => {
                const lessonProgress = progress[lesson.id];
                const isCompleted = lessonProgress?.completed;
                const progressPercentage = lessonProgress ? (lessonProgress.watchedSeconds / lesson.durationSec) * 100 : 0;

                return (
                  <div key={lesson.id}>
                    <button
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors',
                        selectedLessonId === lesson.id ? 'bg-accent' : 'hover:bg-accent/50'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="flex-1">{lesson.title}</span>
                    </button>
                    {progressPercentage > 0 && progressPercentage < 100 && !isCompleted && (
                        <Progress value={progressPercentage} className="h-1 mt-1 mx-3" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
