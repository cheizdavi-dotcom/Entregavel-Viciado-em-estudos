'use client';

import { useState, useCallback, useEffect, createContext, useContext, ReactNode, useRef } from 'react';

const PROGRESS_STORAGE_KEY = 'lessonProgress';
const PROGRESS_BROADCAST_CHANNEL = 'progress-channel';

export interface LessonProgress {
  watchedSeconds: number;
  completed: boolean;
  updatedAt: string; // Stored as ISO string
}

interface ProgressContextType {
    loading: boolean;
    progress: Record<string, LessonProgress>;
    saveProgress: (lessonId: string, seconds: number, completed: boolean) => void;
    getLessonProgress: (lessonId: string) => LessonProgress | null;
    resetAllProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Helper to get a singleton broadcast channel
const getBroadcastChannel = (() => {
  let channel: BroadcastChannel | null = null;
  return () => {
    if (typeof window === 'undefined') return null;
    if (channel === null) {
      channel = new BroadcastChannel(PROGRESS_BROADCAST_CHANNEL);
    }
    return channel;
  };
})();

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);
  const writeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const deserializeProgress = (savedProgress: string | null): Record<string, LessonProgress> => {
    if (!savedProgress) return {};
    try {
        return JSON.parse(savedProgress);
    } catch {
        return {};
    }
  }
  
  // Load progress from localStorage on initial client-side mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      let currentProgress = deserializeProgress(savedProgress);
      setProgress(currentProgress);
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
    } finally {
        setLoading(false);
    }

    // Listen for storage events from other tabs
     const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PROGRESS_STORAGE_KEY) {
        setProgress(deserializeProgress(event.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    // Listen for broadcast channel messages
    const channel = getBroadcastChannel();
    const handleChannelMessage = (event: MessageEvent) => {
      setProgress(event.data);
    };
    channel?.addEventListener('message', handleChannelMessage);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      channel?.removeEventListener('message', handleChannelMessage);
    };

  }, []);

  const saveProgress = useCallback((lessonId: string, seconds: number, completed: boolean) => {
    // Update state immediately for local UI responsiveness
    const newProgressData = {
        ...progress,
        [lessonId]: {
            watchedSeconds: seconds,
            completed,
            updatedAt: new Date().toISOString(),
        }
    };
    setProgress(newProgressData);

    // Debounce writing to localStorage and broadcasting
    if (writeTimeoutRef.current) {
        clearTimeout(writeTimeoutRef.current);
    }

    writeTimeoutRef.current = setTimeout(() => {
        try {
            const serializedProgress = JSON.stringify(newProgressData);
            localStorage.setItem(PROGRESS_STORAGE_KEY, serializedProgress);
            
            // Broadcast the change to other tabs
            const channel = getBroadcastChannel();
            channel?.postMessage(newProgressData);

        } catch (error) {
            console.error("Failed to save progress to localStorage:", error);
        }
    }, 500);

  }, [progress]);

  const getLessonProgress = useCallback((lessonId: string) => {
    return progress[lessonId] || null;
  }, [progress]);

  const resetAllProgress = useCallback(() => {
    try {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
        const newProgressData = {};
        setProgress(newProgressData);
        // Broadcast the reset
        const channel = getBroadcastChannel();
        channel?.postMessage(newProgressData);
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
