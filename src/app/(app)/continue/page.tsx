// This page requires client-side data fetching for user-specific progress.
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import type { UserProgress, Lesson, Module } from "@/lib/types";
import { getAllLessons, getModules } from "@/lib/firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type InProgressLesson = {
  lesson: Lesson;
  progress: UserProgress;
  module: Module | undefined;
};

export default function ContinuePage() {
  const { user } = useAuth();
  const [inProgress, setInProgress] = useState<InProgressLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInProgress() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const progressQuery = query(
          collection(db, "userProgress"),
          where("userId", "==", user.uid),
          where("completed", "==", false),
          orderBy("updatedAt", "desc")
        );
        const progressSnapshot = await getDocs(progressQuery);
        const userProgress = progressSnapshot.docs.map(
          (doc) => doc.data() as UserProgress
        );

        if (userProgress.length > 0) {
          const allLessons = await getAllLessons();
          const allModules = await getModules();

          const lessonsMap = new Map(allLessons.map((l) => [l.id, l]));
          const modulesMap = new Map(allModules.map((m) => [m.id, m]));

          const enrichedProgress = userProgress
            .map((progress) => {
              const lesson = lessonsMap.get(progress.lessonId);
              if (!lesson) return null;
              const module = modulesMap.get(lesson.moduleId);

              return {
                lesson,
                progress,
                module,
              };
            })
            .filter((item): item is InProgressLesson => item !== null);

          setInProgress(enrichedProgress);
        }
      } catch (error) {
        console.error("Error fetching in-progress lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (inProgress.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Film className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Nada para continuar</h1>
        <p className="text-muted-foreground">
          Comece uma aula e ela aparecerá aqui.
        </p>
        <Button asChild className="mt-6">
          <Link href="/home">Explorar módulos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight">
        Continuar Assistindo
      </h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Volte de onde você parou.
      </p>
      <div className="grid gap-6">
        {inProgress.map(({ lesson, progress, module }) => {
          const percentage =
            lesson.durationSec > 0
              ? (progress.watchedSeconds / lesson.durationSec) * 100
              : 0;

          return (
            <Card key={lesson.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                     <Image
                        src={`https://i.ytimg.com/vi/${lesson.youtubeId}/mqdefault.jpg`}
                        alt={lesson.title}
                        width={160}
                        height={90}
                        className="h-24 w-40 object-cover"
                      />
                  </div>
                  <div className="flex-grow p-4">
                    <p className="text-sm text-muted-foreground">{module?.title || 'Módulo'}</p>
                    <h3 className="font-semibold leading-tight">{lesson.title}</h3>
                    <div className="mt-2 flex items-center gap-2">
                       <Progress value={percentage} className="h-2 w-full flex-1" />
                       <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <Button asChild size="sm">
                      <Link href={`/lesson/${lesson.id}`}>Retomar</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
