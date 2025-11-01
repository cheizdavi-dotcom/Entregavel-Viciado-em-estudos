import type { Timestamp } from "firebase/firestore";

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  order: number;
  description: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  youtubeId: string;
  order: number;
  durationSec: number;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  watchedSeconds: number;
  completed: boolean;
  updatedAt: Timestamp;
}
