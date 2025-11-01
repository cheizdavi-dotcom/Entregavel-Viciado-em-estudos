'use client';

import { useState, useCallback, useEffect, createContext, useContext, ReactNode } from 'react';

const PROGRESS_STORAGE_KEY = 'lessonProgress';

export interface LessonProgress {
  watchedSeconds: number;
  completed: boolean;
  updatedAt: Date; 
}

interface ProgressContextType {
    loading: boolean;
    progress: Record<string, LessonProgress>;
    saveProgress: (lessonId: string, seconds: number, completed: boolean) => void;
    getLessonProgress: (lessonId: string) => LessonProgress | null;
    resetAllProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);


export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  // Load progress from localStorage on initial client-side mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        // We need to parse dates back into Date objects
        const parsedProgress = JSON.parse(savedProgress);
        Object.keys(parsedProgress).forEach(key => {
          parsedProgress[key].updatedAt = new Date(parsedProgress[key].updatedAt);
        });
        setProgress(parsedProgress);
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const saveProgress = useCallback((lessonId: string, seconds: number, completed: boolean) => {
    setProgress(prev => {
        const newProgressData = {
            ...prev,
            [lessonId]: {
                watchedSeconds: seconds,
                completed,
                updatedAt: new Date(),
            }
        };
        try {
            localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgressData));
        } catch (error) {
            console.error("Failed to save progress to localStorage:", error);
        }
        return newProgressData;
    });
  }, []);

  const getLessonProgress = useCallback((lessonId: string) => {
    return progress[lessonId] || null;
  }, [progress]);

  const resetAllProgress = useCallback(() => {
    try {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
        setProgress({});
    } catch (error) {
        console.error("Failed to reset progress in localStorage:", error);
    }
  }, []);

  const value = {
      loading,
      progress,
      saveProgress,
      getLessonProgress,
      resetAllProgress
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}


export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
