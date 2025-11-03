
'use client';

import { lessons, modules } from '@/lib/seed';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, CheckCircle2, Download } from 'lucide-react';
import { YouTubePlayer } from '@/components/player/YouTubePlayer';
import { useProgress } from '@/hooks/useProgress.tsx';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ModulePage({ params }: { params: { id: string } }) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { progress, saveProgress, getLessonProgress } = useProgress();

  const initialModule = useMemo(() => modules.find((m) => m.id === params.id), [params.id]);
  const moduleLessons = useMemo(() => lessons.filter((l) => l.moduleId === params.id).sort((a,b) => a.order - b.order), [params.id]);

  const selectedLesson = useMemo(() => {
    return lessons.find((l) => l.id === selectedLessonId);
  }, [selectedLessonId]);
  
  const currentModule = useMemo(() => {
    if (selectedLesson) {
      return modules.find((m) => m.id === selectedLesson.moduleId);
    }
    return initialModule;
  }, [selectedLesson, initialModule]);

  // Effect to preload progress for lessons in this module
  useEffect(() => {
    moduleLessons.forEach(lesson => {
      getLessonProgress(lesson.id);
    });
  }, [moduleLessons, getLessonProgress]);

  useEffect(() => {
    if (!selectedLessonId && moduleLessons.length > 0) {
      const firstUncompletedLesson = moduleLessons.find(l => !progress[l.id]?.completed);
      if (firstUncompletedLesson) {
        setSelectedLessonId(firstUncompletedLesson.id);
      } else {
         setSelectedLessonId(moduleLessons[0].id);
      }
    }
  }, [moduleLessons, selectedLessonId, progress]);


  if (!initialModule) {
    notFound();
  }

  const handleProgress = useCallback((lessonId: string, durationSec: number) => (seconds: number) => {
      const currentProgress = getLessonProgress(lessonId);
      // Mark as completed if 95% is watched, but only if not already completed
      const isCompleted = currentProgress?.completed || (durationSec > 0 && (seconds / durationSec) >= 0.95);
      saveProgress(lessonId, seconds, isCompleted);
  }, [getLessonProgress, saveProgress]);

  const handleCompleted = useCallback((lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
        const currentProgress = getLessonProgress(lessonId);
        const watchedSeconds = currentProgress?.watchedSeconds ?? lesson.durationSec;
        saveProgress(lessonId, Math.max(watchedSeconds, lesson.durationSec * 0.95), true);
    }
  }, [getLessonProgress, saveProgress]);
  
  const handleSelectNextLesson = () => {
    const currentIndex = moduleLessons.findIndex(l => l.id === selectedLessonId);
    if (currentIndex > -1 && currentIndex < moduleLessons.length - 1) {
      setSelectedLessonId(moduleLessons[currentIndex + 1].id);
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* Main Content: Video Player and Info */}
        <div className="lg:col-span-2 w-full">
          {selectedLesson ? (
             <div className="flex flex-col gap-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <YouTubePlayer 
                        key={selectedLesson.id}
                        youtubeId={selectedLesson.youtubeId}
                        onProgress={handleProgress(selectedLesson.id, selectedLesson.durationSec)}
                        onCompleted={() => {
                          handleCompleted(selectedLesson.id)
                          handleSelectNextLesson();
                        }}
                        startSeconds={progress[selectedLesson.id]?.watchedSeconds || 0}
                    />
                </div>
                <div className="space-y-2">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">{selectedLesson.title}</h1>
                    {currentModule && (
                      <p className="text-sm text-muted-foreground">{currentModule.title}: {currentModule.subtitle}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson && currentModule?.summaryPdfUrl ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={currentModule.summaryPdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Resumo do Módulo (PDF)
                        </a>
                      </Button>
                    ) : (
                       <Button variant="outline" size="sm" disabled>
                          <Download className="mr-2 h-4 w-4" />
                          Resumo do Módulo (PDF)
                        </Button>
                    )}
                  </div>
                </div>
            </div>
          ) : (
             <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p>Selecione uma aula para começar.</p>
            </div>
          )}
        </div>

        {/* Sidebar: Lesson List */}
        <div className="lg:col-span-1 flex flex-col gap-4 mt-8 lg:mt-0">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg">Aulas do Módulo</CardTitle>
              <CardDescription className="text-sm">Selecione uma aula para assistir</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 p-2 sm:p-4">
              {moduleLessons.map((lesson) => {
                const lessonProgress = progress[lesson.id];
                const isCompleted = lessonProgress?.completed;
                const progressPercentage = lessonProgress && lesson.durationSec > 0 ? (lessonProgress.watchedSeconds / lesson.durationSec) * 100 : 0;

                return (
                  <div key={lesson.id}>
                    <button
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors text-sm',
                        selectedLessonId === lesson.id ? 'bg-accent' : 'hover:bg-accent/50'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-muted-foreground shrink-0" />
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
