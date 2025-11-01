'use client';

import { useAuth } from '@/hooks/useAuth.tsx';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useCallback, useEffect } from 'react';

export interface LessonProgress {
  watchedSeconds: number;
  completed: boolean;
  updatedAt: Date;
}

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  const getProgressRef = useCallback(
    (lessonId: string) => {
      if (!user) return null;
      return doc(db, 'users', user.uid, 'progress', lessonId);
    },
    [user]
  );

  const saveProgress = useCallback(
    async (lessonId: string, seconds: number, completed: boolean) => {
      const progressRef = getProgressRef(lessonId);
      if (!progressRef) return;

      const newProgress: LessonProgress = {
        watchedSeconds: seconds,
        completed,
        updatedAt: new Date(),
      };

      await setDoc(
        progressRef,
        {
          ...newProgress,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setProgress((prev) => ({ ...prev, [lessonId]: newProgress }));
    },
    [getProgressRef]
  );

  const getLessonProgress = useCallback(
    async (lessonId: string): Promise<LessonProgress | null> => {
      const progressRef = getProgressRef(lessonId);
      if (!progressRef) return null;

      if (progress[lessonId]) {
        return progress[lessonId];
      }

      try {
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          const lessonProgress = {
            ...data,
            updatedAt: data.updatedAt?.toDate(),
          };
          setProgress((prev) => ({ ...prev, [lessonId]: lessonProgress }));
          return lessonProgress;
        }
      } catch (error) {
        console.error("Failed to get lesson progress:", error);
      }
      return null;
    },
    [getProgressRef, progress]
  );

  // This is a simplified fetch, ideally you'd fetch all progress at once.
  useEffect(() => {
    setLoading(false);
  }, [user]);

  const resetAllProgress = async () => {
    if(!user) return;
    // This is a simplified reset. In a real app, you would delete a collection,
    // which should be done from a backend function for security and efficiency.
    setProgress({});
    console.log("User progress reset (simulated).");
  };

  return { loading, progress, saveProgress, getLessonProgress, resetAllProgress };
}
